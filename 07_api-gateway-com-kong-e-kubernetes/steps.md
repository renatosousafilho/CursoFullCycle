# API Gateway com Kong e Kubernetes

## Resetar o Docker

```bash
sudo docker rm -f $(docker ps -a -q)

sudo docker rmi -f $(docker images -q)

sudo docker system prune -af

sudo docker volume prune -f
```

## Setup da aplicação

```bash
./kind.sh

./kong.sh

./prometheus.sh

./keycloak.sh

kubectl create ns bets

kubectl apply -f apps --recursive -n bets

kubectl apply -f misc/apis/kratelimit.yaml -n bets

kubectl apply -f misc/apis/kprometheus.yaml -n bets 

kubectl apply -f misc/apis/bets-api.yaml -n bets   # comenta a linha 8

kubectl apply -f misc/apis/king.yaml -n bets 
```