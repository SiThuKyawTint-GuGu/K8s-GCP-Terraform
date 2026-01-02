variable "project_id" {
  description = "GCP Project ID"
  type        = string
}

variable "region" {
  description = "GCP Region"
  type        = string
  default     = "asia-southeast1"
}

variable "zone" {
  description = "GCP Zone"
  type        = string
  default     = "asia-southeast1-a"
}

variable "cluster_name" {
  description = "GKE Cluster Name"
  type        = string
  default     = "fullstack-cluster"
}
