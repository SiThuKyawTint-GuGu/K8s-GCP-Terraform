kubectl delete pvc -l app=mysql   # optional, only if you want fresh storage
eval $(minikube -p minikube docker-env) Tell Minikube to use your local Docker images:
kubectl port-forward svc/ingress-nginx-controller 8000:80 -n ingress-nginx


sudo nano /etc/hosts
