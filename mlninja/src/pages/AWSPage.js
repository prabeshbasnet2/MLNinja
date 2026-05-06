import { useState } from 'react';

const sections = [
  {
    id: 'what-is-aws',
    emoji: '☁️',
    title: 'What is AWS?',
    summary: 'Amazon Web Services — the cloud platform behind most of the internet.',
    content: (
      <>
        <p>
          AWS (Amazon Web Services) is the world's largest cloud platform. Instead of buying and
          managing physical servers, you rent computing resources on-demand and pay only for what
          you use.
        </p>
        <div className="tf-highlights">
          {[
            { icon: '🌏', title: 'Regions & Availability Zones', desc: 'AWS has data centres called Regions (e.g. ap-southeast-2 = Sydney). Each region has multiple Availability Zones (AZs) — isolated data centres that protect against single points of failure.' },
            { icon: '💰', title: 'Pay as you go', desc: 'No upfront cost. S3 charges per GB stored. Lambda charges per million requests. CloudFront charges per GB transferred. Idle resources cost near zero.' },
            { icon: '🔑', title: 'IAM — Identity and Access Management', desc: 'IAM controls who can do what in your AWS account. Every action requires a permission. The AWS CLI and GitHub Actions use IAM credentials to deploy on your behalf.' },
          ].map((h) => (
            <div key={h.title} className="tf-highlight">
              <span className="tf-highlight-icon">{h.icon}</span>
              <div><strong>{h.title}</strong><p>{h.desc}</p></div>
            </div>
          ))}
        </div>
        <div className="tf-tip">
          <span className="tf-tip-icon">🎤</span>
          <div>
            <strong>How to explain AWS in an interview</strong>
            <p>"AWS is a cloud platform that provides on-demand computing resources — storage, compute, networking, databases — so you don't have to manage physical hardware. You pay for what you use, scale automatically, and deploy globally in minutes."</p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'cli-setup',
    emoji: '⚙️',
    title: 'AWS CLI Setup',
    summary: 'Install and configure the AWS CLI to manage resources from your terminal.',
    content: (
      <>
        <p>Install the AWS CLI on Windows:</p>
        <div className="tf-code">
          <span className="tf-code-label">PowerShell</span>
          <pre>{`winget install Amazon.AWSCLI`}</pre>
        </div>
        <p>Verify the installation:</p>
        <div className="tf-code">
          <pre>{`aws --version
# Output: aws-cli/2.x.x Python/3.x.x`}</pre>
        </div>
        <p>Configure your credentials — this stores them in <code>~/.aws/credentials</code>:</p>
        <div className="tf-code">
          <span className="tf-code-label">Configure</span>
          <pre>{`aws configure

AWS Access Key ID:     YOUR_ACCESS_KEY_ID
AWS Secret Access Key: YOUR_SECRET_ACCESS_KEY
Default region name:   ap-southeast-2
Default output format: json`}</pre>
        </div>
        <div className="tf-tip">
          <span className="tf-tip-icon">🔐</span>
          <div>
            <strong>Where to get credentials</strong>
            <p>AWS Console → your username (top right) → Security Credentials → Access Keys → Create access key. Never commit these to Git — they give full access to your account.</p>
          </div>
        </div>
        <p>Test that it works:</p>
        <div className="tf-code">
          <pre>{`aws sts get-caller-identity
# Returns your AWS account ID and IAM user`}</pre>
        </div>
      </>
    ),
  },
  {
    id: 's3',
    emoji: '🪣',
    title: 'S3 — Simple Storage Service',
    summary: 'Store files, host static websites, and serve React build output.',
    content: (
      <>
        <p>S3 stores files as objects inside buckets. Bucket names must be globally unique across all AWS accounts.</p>

        <div className="tf-syntax-blocks">
          <div className="tf-syntax-block">
            <div className="tf-syntax-title">Create a bucket</div>
            <div className="tf-code">
              <pre>{`aws s3 mb s3://your-bucket-name --region ap-southeast-2`}</pre>
            </div>
          </div>

          <div className="tf-syntax-block">
            <div className="tf-syntax-title">Upload a single file</div>
            <div className="tf-code">
              <pre>{`aws s3 cp ./index.html s3://your-bucket-name/index.html`}</pre>
            </div>
          </div>

          <div className="tf-syntax-block">
            <div className="tf-syntax-title">Sync your React build to S3</div>
            <p>The <code>--delete</code> flag removes old files in S3 that no longer exist in your build — keeps it clean.</p>
            <div className="tf-code">
              <pre>{`npm run build
aws s3 sync build/ s3://your-bucket-name --delete`}</pre>
            </div>
          </div>

          <div className="tf-syntax-block">
            <div className="tf-syntax-title">Enable static website hosting</div>
            <p>Both index and error point to <code>index.html</code> — React handles its own routing, so all 404s return the app and React Router matches the path client-side.</p>
            <div className="tf-code">
              <pre>{`aws s3 website s3://your-bucket-name \\
  --index-document index.html \\
  --error-document index.html`}</pre>
            </div>
          </div>

          <div className="tf-syntax-block">
            <div className="tf-syntax-title">Bucket policy — allow public read</div>
            <p>Save this as <code>policy.json</code>, then apply it:</p>
            <div className="tf-code">
              <span className="tf-code-label">policy.json</span>
              <pre>{`{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::your-bucket-name/*"
  }]
}`}</pre>
            </div>
            <div className="tf-code">
              <pre>{`aws s3api put-bucket-policy \\
  --bucket your-bucket-name \\
  --policy file://policy.json`}</pre>
            </div>
          </div>

          <div className="tf-syntax-block">
            <div className="tf-syntax-title">Common S3 commands</div>
            <div className="tf-code">
              <pre>{`aws s3 ls s3://your-bucket-name        # list contents
aws s3 rm s3://your-bucket-name/file.txt  # delete a file
aws s3 rb s3://your-bucket-name --force   # delete bucket + all files`}</pre>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'cloudfront',
    emoji: '🌐',
    title: 'CloudFront — Global CDN',
    summary: 'Serve your S3 site over HTTPS from 400+ edge locations worldwide.',
    content: (
      <>
        <p>
          CloudFront is AWS's Content Delivery Network. It caches your S3 files at edge locations
          around the world so users get fast load times regardless of where they are, and it adds
          HTTPS to your site automatically.
        </p>

        <div className="tf-highlights">
          {[
            { icon: '⚡', title: 'Edge caching', desc: 'When a user in London requests your site, CloudFront serves it from a London edge location — not from Sydney where your S3 bucket lives.' },
            { icon: '🔒', title: 'Free HTTPS', desc: 'CloudFront provides a free SSL certificate via AWS Certificate Manager (ACM). Your S3 URL is HTTP only — CloudFront makes it HTTPS.' },
            { icon: '💸', title: 'Cost', desc: 'First 1TB/month of data transfer is $0.085/GB. For a learning site, costs are effectively zero.' },
          ].map((h) => (
            <div key={h.title} className="tf-highlight">
              <span className="tf-highlight-icon">{h.icon}</span>
              <div><strong>{h.title}</strong><p>{h.desc}</p></div>
            </div>
          ))}
        </div>

        <div className="tf-syntax-blocks">
          <div className="tf-syntax-block">
            <div className="tf-syntax-title">Invalidate the cache after deploying</div>
            <p>After syncing new files to S3, CloudFront still serves the old cached version until the cache expires (default 24h). Force an immediate refresh with an invalidation:</p>
            <div className="tf-code">
              <pre>{`aws cloudfront create-invalidation \\
  --distribution-id YOUR_DISTRIBUTION_ID \\
  --paths "/*"`}</pre>
            </div>
          </div>

          <div className="tf-syntax-block">
            <div className="tf-syntax-title">Get your distribution ID</div>
            <div className="tf-code">
              <pre>{`aws cloudfront list-distributions \\
  --query "DistributionList.Items[*].{ID:Id,Domain:DomainName}"`}</pre>
            </div>
          </div>

          <div className="tf-syntax-block">
            <div className="tf-syntax-title">Full deploy sequence</div>
            <p>Build, sync to S3, then bust the cache — three commands every deployment:</p>
            <div className="tf-code">
              <pre>{`npm run build
aws s3 sync build/ s3://your-bucket-name --delete
aws cloudfront create-invalidation \\
  --distribution-id YOUR_DISTRIBUTION_ID \\
  --paths "/*"`}</pre>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'lambda',
    emoji: '⚡',
    title: 'Lambda — Serverless Functions',
    summary: 'Run backend code without managing servers. Pay per request, scale automatically.',
    content: (
      <>
        <p>
          Lambda runs your code in response to events (HTTP requests, S3 uploads, scheduled timers)
          without you provisioning or managing any servers. You upload a zip of your code and AWS
          handles the rest.
        </p>

        <div className="tf-highlights">
          {[
            { icon: '💰', title: 'Pricing', desc: 'First 1 million requests/month are free. After that, $0.20 per million requests. For a personal project, Lambda is essentially free.' },
            { icon: '📦', title: 'Cold starts', desc: 'If your function hasn\'t been called recently, AWS spins up a new container — this takes ~200ms extra. Node.js has faster cold starts than Python or Java.' },
            { icon: '⏱️', title: 'Timeout limit', desc: 'Max execution time is 15 minutes. For API use cases, keep functions fast — aim for under 1 second.' },
          ].map((h) => (
            <div key={h.title} className="tf-highlight">
              <span className="tf-highlight-icon">{h.icon}</span>
              <div><strong>{h.title}</strong><p>{h.desc}</p></div>
            </div>
          ))}
        </div>

        <div className="tf-syntax-blocks">
          <div className="tf-syntax-block">
            <div className="tf-syntax-title">The Lambda handler pattern</div>
            <p>Lambda calls your exported <code>handler</code> function with an <code>event</code> object. For API Gateway, the event contains the HTTP method, path, and query params. Your function returns a response object with statusCode, headers, and body.</p>
            <div className="tf-code">
              <span className="tf-code-label">index.js (ES Module)</span>
              <pre>{`import { terms, badgeColors } from './data/terms.js';

const CORS_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET,OPTIONS',
};

function respond(statusCode, body) {
  return { statusCode, headers: CORS_HEADERS, body: JSON.stringify(body) };
}

export const handler = async (event) => {
  // Supports both API Gateway v1 and v2 event formats
  const path = event.rawPath || event.path || '/';
  const method = (
    event.requestContext?.http?.method || event.httpMethod || 'GET'
  ).toUpperCase();
  const query = event.queryStringParameters || {};

  if (method === 'OPTIONS') return { statusCode: 200, headers: CORS_HEADERS, body: '' };
  if (method !== 'GET')    return respond(405, { error: 'Method not allowed' });

  if (path === '/api/health')            return respond(200, { status: 'ok' });
  if (path === '/api/terms/categories')  return respond(200, { categories: [...], badgeColors });
  if (path === '/api/terms')             return respond(200, filteredTerms);

  return respond(404, { error: 'Not found' });
};`}</pre>
            </div>
          </div>

          <div className="tf-syntax-block">
            <div className="tf-syntax-title">Deploy via zip (manual)</div>
            <div className="tf-code">
              <pre>{`# Zip your function code (no node_modules needed for this project)
Compress-Archive -Path index.js, data/ -DestinationPath function.zip

# Create the Lambda function
aws lambda create-function \\
  --function-name learning-ninja-api \\
  --runtime nodejs22.x \\
  --role arn:aws:iam::YOUR_ACCOUNT_ID:role/lambda-execution-role \\
  --handler index.handler \\
  --zip-file fileb://function.zip

# Update code after changes
aws lambda update-function-code \\
  --function-name learning-ninja-api \\
  --zip-file fileb://function.zip`}</pre>
            </div>
          </div>

          <div className="tf-syntax-block">
            <div className="tf-syntax-title">Set environment variables</div>
            <div className="tf-code">
              <pre>{`aws lambda update-function-configuration \\
  --function-name learning-ninja-api \\
  --environment "Variables={NODE_ENV=production}"`}</pre>
            </div>
          </div>

          <div className="tf-syntax-block">
            <div className="tf-syntax-title">Test your function locally</div>
            <p>You can invoke the handler directly in Node without deploying:</p>
            <div className="tf-code">
              <pre>{`node -e "
import('./index.js').then(m => {
  const mockEvent = {
    rawPath: '/api/terms',
    httpMethod: 'GET',
    queryStringParameters: { cat: 'Algorithms' }
  };
  m.handler(mockEvent).then(r => console.log(r.statusCode, JSON.parse(r.body).length));
});
"`}</pre>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'api-gateway',
    emoji: '🚪',
    title: 'API Gateway — HTTP Endpoints for Lambda',
    summary: 'Give your Lambda function a public URL. HTTP API is simpler and cheaper than REST API.',
    content: (
      <>
        <p>
          Lambda functions have no public URL by default. API Gateway sits in front and routes HTTP
          requests to your Lambda — it's the front door.
        </p>

        <div className="tf-highlights">
          {[
            { icon: '🆕', title: 'HTTP API (v2) — use this', desc: 'Simpler, cheaper ($1/million vs $3.50/million), supports Lambda proxy integration and CORS configuration out of the box. Use this for new projects.' },
            { icon: '🏛️', title: 'REST API (v1)', desc: 'More features (request/response transformation, API keys, usage plans) but more complex and more expensive. Use when you need advanced features.' },
          ].map((h) => (
            <div key={h.title} className="tf-highlight">
              <span className="tf-highlight-icon">{h.icon}</span>
              <div><strong>{h.title}</strong><p>{h.desc}</p></div>
            </div>
          ))}
        </div>

        <div className="tf-syntax-blocks">
          <div className="tf-syntax-block">
            <div className="tf-syntax-title">Create an HTTP API and connect it to Lambda</div>
            <div className="tf-code">
              <pre>{`# Create the HTTP API
aws apigatewayv2 create-api \\
  --name learning-ninja-api \\
  --protocol-type HTTP \\
  --cors-configuration AllowOrigins="*",AllowMethods="GET,OPTIONS",AllowHeaders="Content-Type"

# Create Lambda integration
aws apigatewayv2 create-integration \\
  --api-id YOUR_API_ID \\
  --integration-type AWS_PROXY \\
  --integration-uri arn:aws:lambda:ap-southeast-2:YOUR_ACCOUNT_ID:function:learning-ninja-api \\
  --payload-format-version 2.0

# Create a catch-all route
aws apigatewayv2 create-route \\
  --api-id YOUR_API_ID \\
  --route-key "GET /{proxy+}" \\
  --target integrations/YOUR_INTEGRATION_ID

# Deploy a stage
aws apigatewayv2 create-stage \\
  --api-id YOUR_API_ID \\
  --stage-name prod \\
  --auto-deploy`}</pre>
            </div>
          </div>

          <div className="tf-syntax-block">
            <div className="tf-syntax-title">Give API Gateway permission to invoke Lambda</div>
            <div className="tf-code">
              <pre>{`aws lambda add-permission \\
  --function-name learning-ninja-api \\
  --statement-id api-gateway-invoke \\
  --action lambda:InvokeFunction \\
  --principal apigateway.amazonaws.com \\
  --source-arn "arn:aws:execute-api:ap-southeast-2:YOUR_ACCOUNT_ID:YOUR_API_ID/*/*"`}</pre>
            </div>
          </div>

          <div className="tf-syntax-block">
            <div className="tf-syntax-title">Your API URL format</div>
            <div className="tf-code">
              <pre>{`https://YOUR_API_ID.execute-api.ap-southeast-2.amazonaws.com/prod/api/terms
https://YOUR_API_ID.execute-api.ap-southeast-2.amazonaws.com/prod/api/terms/categories
https://YOUR_API_ID.execute-api.ap-southeast-2.amazonaws.com/prod/api/health`}</pre>
            </div>
          </div>
        </div>

        <div className="tf-tip">
          <span className="tf-tip-icon">💡</span>
          <div>
            <strong>Update your React .env.production</strong>
            <p>Once you have your API Gateway URL, set it in your frontend:</p>
            <div className="tf-code" style={{ marginTop: 8 }}>
              <pre>{`# .env.production
REACT_APP_API_URL=https://YOUR_API_ID.execute-api.ap-southeast-2.amazonaws.com/prod`}</pre>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'route53',
    emoji: '🌍',
    title: 'Route 53 — DNS Management',
    summary: 'Register and manage domain names. Point your custom domain to CloudFront.',
    content: (
      <>
        <p>
          Route 53 is AWS's DNS service. DNS translates human-readable domain names
          (e.g. <code>learningninja.com</code>) into IP addresses. You use Route 53 to register
          domains and create DNS records that point to your AWS resources.
        </p>

        <div className="tf-syntax-blocks">
          <div className="tf-syntax-block">
            <div className="tf-syntax-title">Key DNS record types</div>
            <div className="tf-resources">
              {[
                { name: 'A record', desc: 'Maps a domain to an IPv4 address.' },
                { name: 'CNAME record', desc: 'Maps a domain to another domain name. Cannot be used at the root (apex) domain.' },
                { name: 'ALIAS record', desc: 'AWS-specific. Like CNAME but works at the root domain. Use this to point yourdomain.com directly to a CloudFront distribution.' },
                { name: 'NS record', desc: 'Name Server — tells the internet which DNS servers are authoritative for your domain. Set automatically when you create a hosted zone.' },
              ].map((r) => (
                <div key={r.name} className="tf-resource">
                  <code className="tf-resource-name">{r.name}</code>
                  <p>{r.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="tf-syntax-block">
            <div className="tf-syntax-title">Create a hosted zone</div>
            <p>A hosted zone holds all DNS records for your domain.</p>
            <div className="tf-code">
              <pre>{`aws route53 create-hosted-zone \\
  --name yourdomain.com \\
  --caller-reference "$(date +%s)"`}</pre>
            </div>
            <p>After creating, AWS gives you 4 NS records. Add these to your domain registrar so Route 53 becomes authoritative for your domain.</p>
          </div>

          <div className="tf-syntax-block">
            <div className="tf-syntax-title">Point your domain to CloudFront (ALIAS record)</div>
            <p>Save this as <code>record.json</code>, then apply it:</p>
            <div className="tf-code">
              <span className="tf-code-label">record.json</span>
              <pre>{`{
  "Changes": [{
    "Action": "CREATE",
    "ResourceRecordSet": {
      "Name": "yourdomain.com",
      "Type": "A",
      "AliasTarget": {
        "HostedZoneId": "Z2FDTNDATAQYW2",
        "DNSName": "xxxx.cloudfront.net",
        "EvaluateTargetHealth": false
      }
    }
  }]
}`}</pre>
            </div>
            <div className="tf-code">
              <pre>{`aws route53 change-resource-record-sets \\
  --hosted-zone-id YOUR_ZONE_ID \\
  --change-batch file://record.json`}</pre>
            </div>
          </div>

          <div className="tf-syntax-block">
            <div className="tf-syntax-title">Free SSL cert via ACM (required for CloudFront custom domains)</div>
            <div className="tf-code">
              <pre>{`# Certificate MUST be requested in us-east-1 for CloudFront
aws acm request-certificate \\
  --domain-name yourdomain.com \\
  --subject-alternative-names "*.yourdomain.com" \\
  --validation-method DNS \\
  --region us-east-1`}</pre>
            </div>
            <p>After requesting, AWS gives you a CNAME record to add to Route 53 to prove you own the domain. Add it, wait ~5 minutes, and the cert is issued.</p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'github-actions',
    emoji: '🤖',
    title: 'GitHub Actions — CI/CD Pipeline',
    summary: 'Automatically build and deploy your React app to S3 + CloudFront on every push to main.',
    content: (
      <>
        <p>
          GitHub Actions runs automated workflows on GitHub's servers when you push code. Your
          deploy workflow builds the React app and syncs it to S3 and invalidates CloudFront —
          all automatically, every time you push to main.
        </p>

        <div className="tf-syntax-blocks">
          <div className="tf-syntax-block">
            <div className="tf-syntax-title">The deploy workflow — explained line by line</div>
            <div className="tf-code">
              <span className="tf-code-label">.github/workflows/deploy.yml</span>
              <pre>{`name: Deploy to AWS

on:
  push:
    branches:
      - main          # only runs when you push to main

jobs:
  deploy:
    runs-on: ubuntu-latest   # GitHub provides a fresh Ubuntu VM

    steps:
      - name: Checkout code
        uses: actions/checkout@v4   # pulls your repo into the VM

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'              # caches node_modules between runs

      - name: Install dependencies
        run: npm ci                 # clean install from package-lock.json

      - name: Build React app
        run: npm run build          # creates the build/ folder

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id:     \${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ap-southeast-2

      - name: Deploy to S3
        run: aws s3 sync build s3://your-bucket-name --delete

      - name: Invalidate CloudFront cache
        run: |
          aws cloudfront create-invalidation \\
            --distribution-id \${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} \\
            --paths "/*"`}</pre>
            </div>
          </div>

          <div className="tf-syntax-block">
            <div className="tf-syntax-title">Setting up GitHub Secrets</div>
            <p>Secrets are encrypted environment variables stored in GitHub — never exposed in logs.</p>
            <p>Go to: <strong>GitHub repo → Settings → Secrets and variables → Actions → New repository secret</strong></p>
            <div className="tf-resources">
              {[
                { name: 'AWS_ACCESS_KEY_ID', desc: 'The Access Key ID from your IAM user\'s security credentials.' },
                { name: 'AWS_SECRET_ACCESS_KEY', desc: 'The Secret Access Key — only shown once when you create it. Store it immediately.' },
                { name: 'CLOUDFRONT_DISTRIBUTION_ID', desc: 'Your CloudFront distribution ID (from Terraform outputs or the AWS console).' },
              ].map((r) => (
                <div key={r.name} className="tf-resource">
                  <code className="tf-resource-name">{r.name}</code>
                  <p>{r.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="tf-syntax-block">
            <div className="tf-syntax-title">IAM permissions the deploy user needs</div>
            <p>Create a dedicated IAM user for GitHub Actions with only the permissions it needs — never use your root account:</p>
            <div className="tf-code">
              <span className="tf-code-label">IAM policy (minimum permissions)</span>
              <pre>{`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:DeleteObject", "s3:ListBucket"],
      "Resource": [
        "arn:aws:s3:::your-bucket-name",
        "arn:aws:s3:::your-bucket-name/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": "cloudfront:CreateInvalidation",
      "Resource": "arn:aws:cloudfront::YOUR_ACCOUNT_ID:distribution/YOUR_DIST_ID"
    }
  ]
}`}</pre>
            </div>
          </div>

          <div className="tf-syntax-block">
            <div className="tf-syntax-title">Triggering and monitoring</div>
            <div className="tf-code">
              <pre>{`# Push to main triggers the workflow automatically
git push origin main

# Check status
# GitHub repo → Actions tab → click the latest run`}</pre>
            </div>
          </div>
        </div>

        <div className="tf-tip">
          <span className="tf-tip-icon">🎤</span>
          <div>
            <strong>How to explain CI/CD in an interview</strong>
            <p>"CI/CD automates the build, test, and deployment pipeline. In our setup, every push to main triggers GitHub Actions: it installs dependencies, builds the React app, syncs the output to S3, then invalidates CloudFront cache — all without manual steps. If any step fails, the deploy stops and you get notified."</p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'aws-quick-ref',
    emoji: '📌',
    title: 'Quick Reference — AWS CLI',
    summary: 'The most-used AWS CLI commands across S3, CloudFront, Lambda, and Route 53.',
    content: (
      <>
        <div className="tf-syntax-blocks">
          <div className="tf-syntax-block">
            <div className="tf-syntax-title">S3</div>
            <div className="tf-code">
              <pre>{`aws s3 mb s3://bucket-name --region ap-southeast-2  # create bucket
aws s3 ls s3://bucket-name                           # list contents
aws s3 sync build/ s3://bucket-name --delete         # deploy React app
aws s3 cp file.txt s3://bucket-name/                 # upload file
aws s3 rm s3://bucket-name/file.txt                  # delete file
aws s3 rb s3://bucket-name --force                   # delete bucket`}</pre>
            </div>
          </div>
          <div className="tf-syntax-block">
            <div className="tf-syntax-title">CloudFront</div>
            <div className="tf-code">
              <pre>{`# List distributions
aws cloudfront list-distributions \\
  --query "DistributionList.Items[*].{ID:Id,Domain:DomainName}"

# Invalidate cache (run after every deploy)
aws cloudfront create-invalidation \\
  --distribution-id YOUR_DIST_ID \\
  --paths "/*"`}</pre>
            </div>
          </div>
          <div className="tf-syntax-block">
            <div className="tf-syntax-title">Lambda</div>
            <div className="tf-code">
              <pre>{`aws lambda list-functions                            # list all functions
aws lambda update-function-code \\
  --function-name my-function \\
  --zip-file fileb://function.zip                    # redeploy code
aws lambda invoke --function-name my-function \\
  --payload '{}' response.json                       # test invoke`}</pre>
            </div>
          </div>
          <div className="tf-syntax-block">
            <div className="tf-syntax-title">IAM / Account</div>
            <div className="tf-code">
              <pre>{`aws sts get-caller-identity     # who am I?
aws iam list-users              # list IAM users
aws iam create-user --user-name deploy-bot  # create deploy user`}</pre>
            </div>
          </div>
        </div>
      </>
    ),
  },
];

export default function AWSPage() {
  const [expanded, setExpanded] = useState(null);

  return (
    <>
      <div className="page-hero">
        <h2 className="page-title">☁️ AWS</h2>
        <p className="page-desc">S3 · CloudFront · Lambda · API Gateway · Route 53 · GitHub Actions — everything you've built, explained.</p>
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
