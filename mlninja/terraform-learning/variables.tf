variable "bucket_name" {
  description = "Name of the S3 bucket"
  type        = string
  default     = "prabesh-terraform-bucket-2024"
}

variable "region" {
  description = "AWS region"
  type        = string
  default     = "ap-southeast-2"
}