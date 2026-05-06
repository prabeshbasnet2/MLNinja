output "bucket_name" {
  description = "S3 bucket name"
  value       = aws_s3_bucket.my_bucket.id
}

output "cloudfront_url" {
  description = "CloudFront distribution URL"
  value       = "https://${aws_cloudfront_distribution.my_distribution.domain_name}"
}

output "website_url" {
  description = "S3 website URL"
  value       = "http://${aws_s3_bucket_website_configuration.my_bucket.website_endpoint}"
}

output "api_url" {
  description = "API Gateway URL"
  value       = aws_apigatewayv2_stage.default.invoke_url
}