#provider details first
provider "aws" {
    region = "ap-southeast-2"
}

#create s3 bucket
resource "aws_s3_bucket" "my_bucket" {
  bucket = "prabesh-learning-2024"
}

# Turn off the default block public access settings
resource "aws_s3_bucket_public_access_block" "my_bucket" {
  bucket = aws_s3_bucket.my_bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

# Enable static website hosting
resource "aws_s3_bucket_website_configuration" "my_bucket" {
  bucket = aws_s3_bucket.my_bucket.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}

# Make bucket publicly readable
resource "aws_s3_bucket_policy" "my_bucket" {
  bucket = aws_s3_bucket.my_bucket.id

  depends_on = [aws_s3_bucket_public_access_block.my_bucket]

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.my_bucket.arn}/*"
      }
    ]
  })
}

# CloudFront distribution in front of S3
resource "aws_cloudfront_distribution" "my_distribution" {
  enabled             = true
  default_root_object = "index.html"
  comment             = "learning platform"
  is_ipv6_enabled     = true

  tags = {
    Name = "Learning Ninja"
  }

  origin {
    domain_name = aws_s3_bucket_website_configuration.my_bucket.website_endpoint
    origin_id   = "prabesh-learning-2024.s3.ap-southeast-2.amazonaws.com-mondo0eokqy"

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["SSLv3", "TLSv1", "TLSv1.1", "TLSv1.2"]
    }
  }

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = "prabesh-learning-2024.s3.ap-southeast-2.amazonaws.com-mondo0eokqy"
    viewer_protocol_policy = "redirect-to-https"
    compress               = true

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}

# Automatically zips your backend folder every terraform apply
data "archive_file" "backend_zip" {
  type        = "zip"
  output_path = "${path.module}/../../backend.zip"
  
  source {
    content  = file("${path.module}/../../backend/index.js")
    filename = "index.js"
  }
  
  source {
    content  = file("${path.module}/../../backend/package.json")
    filename = "package.json"
  }
  
  source {
    content  = file("${path.module}/../../backend/data/terms.js")
    filename = "data/terms.js"
  }
}

resource "aws_iam_role" "lambda_role" {
  name = "learningninja-lambda-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "lambda.amazonaws.com"
      }
    }]
  })
}

# Attach basic execution policy — allows Lambda to write logs to CloudWatch
resource "aws_iam_role_policy_attachment" "lambda_logs" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_lambda_function" "api" {
  filename         = data.archive_file.backend_zip.output_path
  function_name    = "learningninja-api"
  role             = aws_iam_role.lambda_role.arn
  handler          = "index.handler"
  runtime          = "nodejs22.x"
  source_code_hash = data.archive_file.backend_zip.output_base64sha256

  environment {
    variables = {
      NODE_ENV = "production"
    }
  }
}


# Create HTTP API
resource "aws_apigatewayv2_api" "api" {
  name          = "learningninja-api"
  protocol_type = "HTTP"

  cors_configuration {
    allow_origins = ["*"]
    allow_methods = ["GET", "OPTIONS"]
    allow_headers = ["Content-Type"]
  }
}

# Lambda integration
resource "aws_apigatewayv2_integration" "lambda" {
  api_id                 = aws_apigatewayv2_api.api.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.api.invoke_arn
  payload_format_version = "2.0"
}

# Catch-all route — forwards everything to Lambda
resource "aws_apigatewayv2_route" "default" {
  api_id    = aws_apigatewayv2_api.api.id
  route_key = "ANY /{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.lambda.id}"
}

# Also catch root path
resource "aws_apigatewayv2_route" "root" {
  api_id    = aws_apigatewayv2_api.api.id
  route_key = "ANY /"
  target    = "integrations/${aws_apigatewayv2_integration.lambda.id}"
}

# Auto-deploy stage
resource "aws_apigatewayv2_stage" "default" {
  api_id      = aws_apigatewayv2_api.api.id
  name        = "$default"
  auto_deploy = true
}

# Allow API Gateway to invoke Lambda
resource "aws_lambda_permission" "api_gw" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.api.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.api.execution_arn}/*/*"
}