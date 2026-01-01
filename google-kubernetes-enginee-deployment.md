# Fullstack Kubernetes Deployment on GKE

This project demonstrates how to build, containerize, and deploy a fullstack application (Frontend + Backend + MySQL + Monitoring) on **Google Kubernetes Engine (GKE)** using **Docker, Docker Buildx, and Kubernetes**.

---

## 📦 Project Structure

```text
.
├── backend/
│   ├── Dockerfile
│   └── src/
├── frontend/
│   ├── Dockerfile
│   └── src/
├── k8s/
│   ├── backend-deployment.yaml
│   ├── backend-service.yaml
│   ├── frontend-deployment.yaml
│   ├── frontend-service.yaml
│   ├── mysql-statefulset.yaml
│   ├── mysql-service.yaml
│   ├── configmap.yaml
│   ├── secret.yaml
│   └── monitoring/
│       ├── prometheus.yaml
│       └── grafana.yaml
└── README.md


🐳 Docker Build & Push
Backend Image
docker build -t gugu123/backend:v1 ./backend
docker push gugu123/backend:v1

Frontend Image
docker build -t gugu123/frontend:v1 ./frontend
docker push gugu123/frontend:v1

Tag for Docker Hub
docker tag gugu123/backend:v1 guguskyler/backend:v1
docker tag gugu123/frontend:v1 guguskyler/frontend:v1

docker push guguskyler/backend:v1
docker push guguskyler/frontend:v1

☁️ Google Cloud Setup
Set Active Project
gcloud config set project norse-botany-480203-i6


Verify:

gcloud config list

Enable Required APIs
gcloud services enable \
  container.googleapis.com \
  compute.googleapis.com


Verify:

gcloud services list --enabled | grep container

Configure Region & Zone (Singapore)
gcloud config set compute/region asia-southeast1
gcloud config set compute/zone asia-southeast1-a

🔐 GKE Authentication Plugin
Install Plugin
gcloud components install gke-gcloud-auth-plugin

Enable Plugin
export USE_GKE_GCLOUD_AUTH_PLUGIN=True


Persist setting:

echo 'export USE_GKE_GCLOUD_AUTH_PLUGIN=True' >> ~/.zshrc
source ~/.zshrc

🚀 Create GKE Cluster

⚠️ This will incur cost.

gcloud container clusters create fullstack-cluster \
  --num-nodes=2 \
  --machine-type=e2-medium \
  --disk-size=50 \
  --enable-ip-alias

🔗 Connect kubectl to GKE
gcloud container clusters get-credentials fullstack-cluster


Verify:

kubectl get nodes

🛠️ Build Images for GKE (Mac M1/M2 Fix)

GKE nodes use linux/amd64, so images must be rebuilt using Docker Buildx.

Enable Buildx
docker buildx create --use

Rebuild Backend
docker buildx build \
  --platform=linux/amd64 \
  --no-cache \
  --provenance=false \
  --sbom=false \
  -t guguskyler/backend:v1 \
  --push backend

Rebuild Frontend
docker buildx build \
  --platform=linux/amd64 \
  -t guguskyler/frontend:v2 \
  --push frontend


⚠️ --push is required when using buildx.

☸️ Kubernetes Deployment

Apply all manifests:

kubectl apply -f k8s/
kubectl apply -f k8s/monitoring/


Restart deployments if needed:

kubectl rollout restart deployment frontend
kubectl rollout restart deployment backend

🌐 Access Services

Check external IPs:

kubectl get svc

Service	Type	Access
Frontend	LoadBalancer	Browser
Backend	LoadBalancer	API
MySQL	ClusterIP	Internal
Grafana	ClusterIP	Internal
Prometheus	ClusterIP	Internal
⚠️ Image Pull Policy

To always pull the latest image:

imagePullPolicy: Always


Recommended when reusing the same image tag.

✅ Best Practices

Use immutable image tags (v1, v2, v3)

Prefer Ingress over multiple LoadBalancers

Do not expose MySQL publicly

Use imagePullPolicy: Always during development

📌 Notes

GKE nodes run on amd64

Apple Silicon Macs require docker buildx

--provenance=false avoids unknown/unknown manifest issues


kubectl delete pvc -l app=mysql   ## optional, only if you want fresh storage
eval $(minikube -p minikube docker-env) ## Tell Minikube to use your local Docker images
kubectl port-forward svc/ingress-nginx-controller 8000:80 -n ingress-nginx ## port forward command for ingress-nginx-controller
sudo nano /etc/hosts ## Fro Fake ip domain in your host system
