#/bin/bash
# Remove todas os containers docker
docker rm -f $(docker ps -qa)

# Criar o cluster Kubernetes
cd /Users/renato/Projects/FullCycle/07_api-gateway-com-kong-e-kubernetes/FC3-kong-automation/infra/kong-k8s/kind
./kind.sh
# Instalar o Kong
cd /Users/renato/Projects/FullCycle/07_api-gateway-com-kong-e-kubernetes/FC3-kong-automation/infra/kong-k8s/kong
./kong.sh
# Instalar o Prometheus
cd /Users/renato/Projects/FullCycle/07_api-gateway-com-kong-e-kubernetes/FC3-kong-automation/infra/kong-k8s/misc/prometheus
./prometheus.sh
# Instalar o Keycloack
cd /Users/renato/Projects/FullCycle/07_api-gateway-com-kong-e-kubernetes/FC3-kong-automation/infra/kong-k8s/misc/keycloak
./keycloak.sh
# Instalar o argocd
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml