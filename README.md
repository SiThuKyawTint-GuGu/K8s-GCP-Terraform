# Fullstack Application on Google Kubernetes Engine (GKE)
## Project Overview

This project is a fullstack web application deployed on Google Kubernetes Engine (GKE) using containerized microservices. The goal of the project is to demonstrate a real-world cloud-native deployment using Docker, Kubernetes, and Google Cloud Platform.

The system is designed to be scalable, production-ready, and compatible with cloud infrastructure running on different CPU architectures.

## System Architecture

The application follows a service-based architecture consisting of multiple independent components deployed as Kubernetes workloads.

The frontend application provides the user interface and communicates with the backend API. The backend service handles business logic and data access. Persistent data is stored in a MySQL database running as a StatefulSet to ensure data durability. Monitoring is implemented using Prometheus and Grafana to observe system health and performance.

All services are orchestrated by Kubernetes and run inside a GKE cluster.

## Key Technologies

Google Kubernetes Engine (GKE)

Docker and Docker Buildx

Kubernetes Deployments and Services

LoadBalancer-based external access

Node.js backend service

React frontend served via Nginx

MySQL database with persistent storage

Prometheus and Grafana for monitoring

## Cloud & Infrastructure Design

The application is deployed on a standard GKE cluster running in the Singapore region. External access is provided using Kubernetes LoadBalancer services, which automatically provision Google Cloud Load Balancers.

The infrastructure is designed to support horizontal scaling, rolling updates, and fault tolerance through Kubernetes primitives.

## Container Strategy

All application components are containerized using Docker. Since development is performed on Apple Silicon (ARM) machines while GKE nodes run on amd64 architecture, Docker Buildx is used to build cross-platform images compatible with GKE.

This ensures that containers run reliably in cloud environments without architecture-related runtime errors.

## Deployment Strategy

Each service is deployed independently using Kubernetes Deployments or StatefulSets. Configuration and sensitive data are managed using ConfigMaps and Secrets.

The system supports zero-downtime updates through rolling deployments and allows rapid iteration by updating container images and restarting services.

## Monitoring & Observability

Prometheus is used to collect metrics from the cluster and application services. Grafana provides visualization dashboards to monitor system performance, availability, and resource usage.

This setup enables proactive monitoring and easier troubleshooting in a production-like environment.

## Purpose of This Project

The purpose of this project is to:

Practice real-world Kubernetes deployment on GCP

Understand container architecture differences (ARM vs amd64)

Learn GKE networking and LoadBalancer behavior

Build confidence in cloud-native application design

Serve as a reference architecture for future projects

## Target Audience

This project is intended for:

Backend and fullstack developers learning Kubernetes

Cloud and DevOps engineers

Students and professionals building GCP deployment experience

Portfolio demonstration of production-grade cloud deployment

If you want, I can also:

Create a 1-page executive summary

Rewrite this for GitHub portfolio style

Make a company internal documentation version

Just tell me 👍
