import { useState } from 'react';

const sections = [
  {
    id: 'what-is-terraform',
    emoji: '🏗️',
    title: 'What is Terraform?',
    summary: 'Infrastructure as Code tool by HashiCorp — describe your AWS setup in files, not clicks.',
    content: (
      <>
        <p>
          Terraform is an <strong>Infrastructure as Code (IaC)</strong> tool by HashiCorp. Instead of
          clicking through the AWS console to create resources, you write <code>.tf</code> files that
          describe exactly what you want — and Terraform builds it automatically.
        </p>
        <div className="tf-analogy">
          <span className="tf-analogy-label">IKEA Analogy</span>
          <p><strong>AWS Console</strong> = Going to IKEA, walking around, picking things manually, carrying them home and assembling everything yourself.</p>
          <p><strong>Terraform</strong> = Sending IKEA a written list. You write down exactly what furniture you want and it gets built and delivered perfectly. Next time you move — hand them the same list and your new place looks identical.</p>
        </div>
        <div className="tf-highlights">
          {[
            { icon: '📄', title: 'Infrastructure as Code', desc: 'Your entire AWS setup lives in .tf files. Commit to Git, review in PRs, roll back if needed.' },
            { icon: '👀', title: 'Plan before you apply', desc: 'Before changing anything real, Terraform shows a preview of exactly what will be created, changed, or destroyed.' },
            { icon: '🧠', title: 'State tracking', desc: 'Terraform remembers what it already created in a state file. Run it again — it only changes what is different.' },
          ].map((h) => (
            <div key={h.title} className="tf-highlight">
              <span className="tf-highlight-icon">{h.icon}</span>
              <div><strong>{h.title}</strong><p>{h.desc}</p></div>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: 'installation',
    emoji: '⚙️',
    title: 'Installation & Setup',
    summary: 'Install Terraform on Windows and set up VS Code for .tf files.',
    content: (
      <>
        <p>Install Terraform on Windows using winget:</p>
        <div className="tf-code">
          <span className="tf-code-label">PowerShell</span>
          <pre>{`winget install HashiCorp.Terraform`}</pre>
        </div>
        <p>After installation, close and reopen PowerShell, then verify:</p>
        <div className="tf-code">
          <pre>{`terraform --version
# Output: Terraform v1.x.x`}</pre>
        </div>
        <div className="tf-tip">
          <span className="tf-tip-icon">💡</span>
          <div>
            <strong>VS Code Extension</strong>
            <p>Install the <strong>HashiCorp Terraform</strong> extension in VS Code. This gives you syntax highlighting, autocomplete, and error detection for <code>.tf</code> files.</p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'project-structure',
    emoji: '📁',
    title: 'Project Structure',
    summary: 'Three files make up a Terraform project: main.tf, variables.tf, outputs.tf.',
    content: (
      <>
        <p>A typical Terraform project has three core files:</p>
        <div className="tf-files">
          {[
            { name: 'main.tf', desc: 'The main configuration file. Contains your provider (AWS) and all the resources you want to create — S3 bucket, CloudFront distribution, Lambda function, etc.' },
            { name: 'variables.tf', desc: 'Defines input variables so values are not hardcoded. Makes your config reusable across environments (dev / staging / prod).' },
            { name: 'outputs.tf', desc: 'Defines what Terraform prints after apply — useful values like your bucket name, CloudFront URL, Lambda ARN, and API Gateway endpoint.' },
          ].map((f) => (
            <div key={f.name} className="tf-file">
              <div className="tf-file-name">{f.name}</div>
              <div className="tf-file-desc">{f.desc}</div>
            </div>
          ))}
        </div>
        <div className="tf-tip">
          <span className="tf-tip-icon">🗂️</span>
          <div>
            <strong>What to commit vs ignore</strong>
            <p>
              Commit: <code>main.tf</code>, <code>variables.tf</code>, <code>outputs.tf</code>, <code>.terraform.lock.hcl</code><br />
              Ignore: <code>terraform.tfstate</code>, <code>.terraform/</code>, <code>*.tfvars</code> (may contain secrets)
            </p>
          </div>
        </div>
        <div className="tf-code">
          <span className="tf-code-label">.gitignore</span>
          <pre>{`.terraform/
terraform.tfstate
terraform.tfstate.backup
*.tfvars`}</pre>
        </div>
      </>
    ),
  },
  {
    id: 'four-commands',
    emoji: '⌨️',
    title: 'The Four Commands',
    summary: 'init → plan → apply → destroy. These four commands are everything.',
    content: (
      <>
        <div className="tf-commands">
          <div className="tf-command">
            <div className="tf-command-header">
              <code className="tf-cmd-name">terraform init</code>
              <span className="tf-cmd-badge">Run once</span>
            </div>
            <p>Downloads the AWS provider plugin. Like <code>npm install</code> — run once when you first set up a project or change providers.</p>
            <p className="tf-cmd-creates">Creates: <code>.terraform/</code> folder and <code>.terraform.lock.hcl</code> (commit this to Git).</p>
          </div>
          <div className="tf-command">
            <div className="tf-command-header">
              <code className="tf-cmd-name">terraform plan</code>
              <span className="tf-cmd-badge">Always first</span>
            </div>
            <p>Previews exactly what Terraform will create, change, or destroy — without touching anything real. Always run before apply.</p>
            <div className="tf-code" style={{ marginTop: 10 }}>
              <pre>{`+ create       — new resource will be created
~ update       — resource will be changed in-place
- destroy      — resource will be deleted

Plan: 5 to add, 0 to change, 0 to destroy`}</pre>
            </div>
          </div>
          <div className="tf-command">
            <div className="tf-command-header">
              <code className="tf-cmd-name">terraform apply</code>
              <span className="tf-cmd-badge">Creates real AWS resources</span>
            </div>
            <p>Creates or updates real AWS resources. Shows the plan again and asks for confirmation — type <strong>yes</strong> to proceed.</p>
            <p className="tf-cmd-creates">After completion it prints your defined outputs.</p>
          </div>
          <div className="tf-command">
            <div className="tf-command-header">
              <code className="tf-cmd-name">terraform destroy</code>
              <span className="tf-cmd-badge danger">Deletes everything</span>
            </div>
            <p>Tears down everything Terraform created — in reverse order. Hugely useful for learning (no wasted AWS costs) and for spinning up/down test environments.</p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'what-you-can-build',
    emoji: '🏛️',
    title: 'What You Can Build — S3 + CloudFront + Lambda',
    summary: 'A full-stack serverless app: React frontend on S3/CloudFront, Node.js API on Lambda.',
    content: (
      <>
        <p>With two <code>terraform apply</code> runs you can provision a complete serverless stack:</p>

        <p style={{ marginTop: 16, marginBottom: 8 }}><strong>Frontend (React app hosting)</strong></p>
        <div className="tf-resources">
          {[
            { name: 'aws_s3_bucket', desc: 'Stores your React build files in ap-southeast-2 (Sydney).' },
            { name: 'aws_s3_bucket_public_access_block', desc: 'Turns off default block-public-access so the bucket can serve files publicly.' },
            { name: 'aws_s3_bucket_website_configuration', desc: 'Enables static website hosting with index.html as default and error document.' },
            { name: 'aws_s3_bucket_policy', desc: 'JSON policy allowing anyone to read files (s3:GetObject).' },
            { name: 'aws_cloudfront_distribution', desc: 'CDN pointing at S3 with HTTPS, served from 400+ global edge locations.' },
          ].map((r) => (
            <div key={r.name} className="tf-resource">
              <code className="tf-resource-name">{r.name}</code>
              <p>{r.desc}</p>
            </div>
          ))}
        </div>

        <p style={{ marginTop: 16, marginBottom: 8 }}><strong>Backend (Lambda API)</strong></p>
        <div className="tf-resources">
          {[
            { name: 'aws_lambda_function', desc: 'Runs your Node.js handler (index.js) — the ML terms API.' },
            { name: 'aws_iam_role', desc: 'Execution role that gives Lambda permission to write CloudWatch logs.' },
            { name: 'aws_apigatewayv2_api', desc: 'HTTP API that gives Lambda a public URL with CORS configured.' },
            { name: 'aws_apigatewayv2_integration', desc: 'Connects API Gateway to the Lambda function.' },
            { name: 'aws_apigatewayv2_route', desc: 'Catch-all route: GET /{proxy+} forwards all requests to Lambda.' },
            { name: 'aws_apigatewayv2_stage', desc: 'Deploys the API with auto-deploy enabled.' },
          ].map((r) => (
            <div key={r.name} className="tf-resource">
              <code className="tf-resource-name">{r.name}</code>
              <p>{r.desc}</p>
            </div>
          ))}
        </div>

        <p style={{ marginTop: 16 }}>After apply, your outputs look like this:</p>
        <div className="tf-code">
          <span className="tf-code-label">terraform output</span>
          <pre>{`bucket_name      = "my-bucket-name"
cloudfront_url   = "https://xxxx.cloudfront.net"
api_endpoint     = "https://xxxx.execute-api.ap-southeast-2.amazonaws.com/prod"
lambda_arn       = "arn:aws:lambda:ap-southeast-2:YOUR_ACCOUNT:function:learning-ninja-api"`}</pre>
        </div>
      </>
    ),
  },
  {
    id: 'hcl-syntax',
    emoji: '📝',
    title: 'HCL Syntax Explained',
    summary: 'The building blocks of Terraform config files: provider, resource, variable, output.',
    content: (
      <>
        <p>Terraform uses <strong>HCL</strong> (HashiCorp Configuration Language). Here are the key building blocks:</p>
        <div className="tf-syntax-blocks">
          <div className="tf-syntax-block">
            <div className="tf-syntax-title">Provider block</div>
            <p>Tells Terraform which cloud and region to connect to.</p>
            <div className="tf-code">
              <pre>{`provider "aws" {
  region = "ap-southeast-2"
}`}</pre>
            </div>
          </div>
          <div className="tf-syntax-block">
            <div className="tf-syntax-title">Resource block</div>
            <p>Defines an AWS resource to create. Format: <code>resource "resource_type" "local_name"</code></p>
            <div className="tf-code">
              <pre>{`resource "aws_s3_bucket" "my_bucket" {
  bucket = "my-unique-bucket-name"
}`}</pre>
            </div>
          </div>
          <div className="tf-syntax-block">
            <div className="tf-syntax-title">Referencing between resources</div>
            <p>Resources reference each other using <code>resource_type.local_name.attribute</code></p>
            <div className="tf-code">
              <pre>{`# Use the bucket ID from another resource
bucket = aws_s3_bucket.my_bucket.id

# Use the ARN
Resource = "\${aws_s3_bucket.my_bucket.arn}/*"`}</pre>
            </div>
          </div>
          <div className="tf-syntax-block">
            <div className="tf-syntax-title">Variable block</div>
            <p>Avoids hardcoding values — makes configs reusable across environments.</p>
            <div className="tf-code">
              <pre>{`variable "bucket_name" {
  description = "Name of the S3 bucket"
  type        = string
  default     = "my-learning-bucket"
}`}</pre>
            </div>
          </div>
          <div className="tf-syntax-block">
            <div className="tf-syntax-title">Output block</div>
            <p>Prints useful values after apply.</p>
            <div className="tf-code">
              <pre>{`output "cloudfront_url" {
  description = "CloudFront URL"
  value = "https://\${aws_cloudfront_distribution.cdn.domain_name}"
}`}</pre>
            </div>
          </div>
          <div className="tf-syntax-block">
            <div className="tf-syntax-title">depends_on</div>
            <p>Forces Terraform to create one resource before another.</p>
            <div className="tf-code">
              <pre>{`depends_on = [aws_s3_bucket_public_access_block.my_bucket]`}</pre>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'lambda-terraform',
    emoji: '⚡',
    title: 'Lambda with Terraform',
    summary: 'Deploy your Node.js Lambda handler using infrastructure as code — no console clicking.',
    content: (
      <>
        <p>
          Instead of manually zipping and uploading your Lambda via the CLI, Terraform can manage the
          entire Lambda deployment — including the IAM role, the zip file, and the API Gateway wiring.
          This is exactly what we built for the Learning Ninja API.
        </p>

        <div className="tf-syntax-blocks">
          <div className="tf-syntax-block">
            <div className="tf-syntax-title">IAM execution role — Lambda needs permission to log</div>
            <div className="tf-code">
              <span className="tf-code-label">main.tf</span>
              <pre>{`resource "aws_iam_role" "lambda_role" {
  name = "learning-ninja-lambda-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action    = "sts:AssumeRole"
      Effect    = "Allow"
      Principal = { Service = "lambda.amazonaws.com" }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_logs" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}`}</pre>
            </div>
          </div>

          <div className="tf-syntax-block">
            <div className="tf-syntax-title">Package and deploy the Lambda function</div>
            <p>Terraform can zip your code automatically using the <code>archive</code> provider:</p>
            <div className="tf-code">
              <pre>{`data "archive_file" "lambda_zip" {
  type        = "zip"
  source_dir  = "\${path.module}/../backend"
  output_path = "\${path.module}/function.zip"
  excludes    = ["node_modules", ".terraform", "*.zip"]
}

resource "aws_lambda_function" "api" {
  function_name    = "learning-ninja-api"
  filename         = data.archive_file.lambda_zip.output_path
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256

  runtime = "nodejs22.x"
  handler = "index.handler"
  role    = aws_iam_role.lambda_role.arn
  timeout = 10

  environment {
    variables = {
      NODE_ENV = "production"
    }
  }
}`}</pre>
            </div>
          </div>

          <div className="tf-syntax-block">
            <div className="tf-syntax-title">API Gateway HTTP API wired to Lambda</div>
            <div className="tf-code">
              <pre>{`resource "aws_apigatewayv2_api" "http_api" {
  name          = "learning-ninja-http-api"
  protocol_type = "HTTP"

  cors_configuration {
    allow_origins = ["*"]
    allow_methods = ["GET", "OPTIONS"]
    allow_headers = ["Content-Type"]
  }
}

resource "aws_apigatewayv2_integration" "lambda" {
  api_id                 = aws_apigatewayv2_api.http_api.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.api.invoke_arn
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "catch_all" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "GET /{proxy+}"
  target    = "integrations/\${aws_apigatewayv2_integration.lambda.id}"
}

resource "aws_apigatewayv2_stage" "prod" {
  api_id      = aws_apigatewayv2_api.http_api.id
  name        = "prod"
  auto_deploy = true
}

resource "aws_lambda_permission" "api_gateway" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.api.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "\${aws_apigatewayv2_api.http_api.execution_arn}/*/*"
}`}</pre>
            </div>
          </div>

          <div className="tf-syntax-block">
            <div className="tf-syntax-title">Output the API URL</div>
            <div className="tf-code">
              <span className="tf-code-label">outputs.tf</span>
              <pre>{`output "api_endpoint" {
  description = "API Gateway endpoint — set this as REACT_APP_API_URL"
  value       = "\${aws_apigatewayv2_stage.prod.invoke_url}"
}

output "lambda_arn" {
  description = "Lambda function ARN"
  value       = aws_lambda_function.api.arn
}`}</pre>
            </div>
          </div>

          <div className="tf-syntax-block">
            <div className="tf-syntax-title">Why source_code_hash matters</div>
            <div className="tf-code">
              <pre>{`source_code_hash = data.archive_file.lambda_zip.output_base64sha256`}</pre>
            </div>
            <p>This tells Terraform to re-deploy the Lambda only when the zip file content actually changes. Without it, <code>terraform apply</code> would skip redeploying even if you changed the code.</p>
          </div>
        </div>

        <div className="tf-tip">
          <span className="tf-tip-icon">🔄</span>
          <div>
            <strong>Update workflow after code changes</strong>
            <div className="tf-code" style={{ marginTop: 8 }}>
              <pre>{`# Edit backend/index.js or backend/data/terms.js
# Then:
terraform plan   # confirms Lambda will be updated
terraform apply  # redeploys the zip automatically`}</pre>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'state',
    emoji: '🗃️',
    title: 'Terraform State',
    summary: 'How Terraform remembers what it already created — and why you should not commit it.',
    content: (
      <>
        <p>After <code>terraform apply</code>, Terraform creates a <code>terraform.tfstate</code> file. This is how it remembers what it already created in AWS.</p>
        <div className="tf-highlights">
          {[
            { icon: '📋', title: 'terraform.tfstate', desc: 'JSON file tracking every resource Terraform manages. Run terraform state list to see all tracked resources.' },
            { icon: '🚫', title: 'Never commit state', desc: 'The state file contains sensitive data including resource IDs and sometimes secret values. Add it to .gitignore and never manually edit it.' },
          ].map((h) => (
            <div key={h.title} className="tf-highlight">
              <span className="tf-highlight-icon">{h.icon}</span>
              <div><strong>{h.title}</strong><p>{h.desc}</p></div>
            </div>
          ))}
        </div>
        <p style={{ marginTop: 16 }}><strong>Remote state</strong> — for team use, store state in an S3 bucket so everyone shares the same state:</p>
        <div className="tf-code">
          <span className="tf-code-label">main.tf</span>
          <pre>{`terraform {
  backend "s3" {
    bucket = "my-terraform-state-bucket"
    key    = "prod/terraform.tfstate"
    region = "ap-southeast-2"
  }
}`}</pre>
        </div>
      </>
    ),
  },
  {
    id: 'whats-next',
    emoji: '🗺️',
    title: "What's Next",
    summary: 'The learning path beyond S3 + CloudFront + Lambda.',
    content: (
      <>
        <div className="tf-next-steps">
          {[
            { num: '01', title: 'Custom domain with Route 53 + ACM', desc: 'Point yourdomain.com to your CloudFront distribution using an ALIAS record and a free ACM SSL certificate. See the AWS tab for the full process.' },
            { num: '02', title: 'Remote State in S3', desc: 'Store terraform.tfstate in an S3 bucket with DynamoDB locking so CI/CD and teammates share the same state.' },
            { num: '03', title: 'Terraform Workspaces', desc: 'Manage dev / staging / prod environments with the same config files. terraform workspace new dev creates an isolated state per environment.' },
            { num: '04', title: 'Terraform Modules', desc: 'Package your S3+CloudFront or Lambda+API Gateway setup as a reusable module so you can stamp out identical infrastructure for multiple projects.' },
            { num: '05', title: 'GitHub Actions + Terraform', desc: 'Run terraform plan in CI on pull requests (so reviewers see infra changes) and terraform apply automatically on merge to main.' },
          ].map((s) => (
            <div key={s.num} className="tf-next-step">
              <span className="tf-next-num">{s.num}</span>
              <div><strong>{s.title}</strong><p>{s.desc}</p></div>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: 'quick-ref',
    emoji: '📌',
    title: 'Quick Reference Card',
    summary: 'All Terraform commands at a glance.',
    content: (
      <>
        <div className="tf-code">
          <span className="tf-code-label">Commands</span>
          <pre>{`terraform init         # download providers (run once)
terraform plan         # preview changes (always run first)
terraform apply        # create/update resources
terraform destroy      # delete everything

terraform state list   # list all managed resources
terraform output       # show output values
terraform fmt          # auto-format .tf files
terraform validate     # check config for errors`}</pre>
        </div>
        <div className="tf-tip" style={{ marginTop: 20 }}>
          <span className="tf-tip-icon">🎤</span>
          <div>
            <strong>How to explain Terraform in an interview</strong>
            <p>"Terraform is an infrastructure as code tool that lets you define cloud resources in configuration files rather than clicking through a console. You write what you want, run <code>terraform plan</code> to preview changes, and <code>terraform apply</code> to provision it. It tracks state so it knows what already exists and only changes what's different. The big benefit is your infrastructure is version controlled, repeatable, and consistent across environments."</p>
          </div>
        </div>
      </>
    ),
  },
];

export default function TerraformPage() {
  const [expanded, setExpanded] = useState(null);

  return (
    <>
      <div className="page-hero">
        <h2 className="page-title">🏗️ Terraform</h2>
        <p className="page-desc">Infrastructure as Code — provision your entire AWS stack from config files.</p>
      </div>

      <div className="tf-sections">
        {sections.map((s) => {
          const isOpen = expanded === s.id;
          return (
            <div
              key={s.id}
              className={`tf-section ${isOpen ? 'open' : ''}`}
              onClick={() => setExpanded(isOpen ? null : s.id)}
            >
              <div className="tf-section-header">
                <div className="tf-section-left">
                  <span className="tf-section-emoji">{s.emoji}</span>
                  <div>
                    <div className="tf-section-title">{s.title}</div>
                    <div className="tf-section-summary">{s.summary}</div>
                  </div>
                </div>
                <span className="chevron">{isOpen ? '▲' : '▼'}</span>
              </div>
              {isOpen && (
                <div className="tf-section-body" onClick={(e) => e.stopPropagation()}>
                  {s.content}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
