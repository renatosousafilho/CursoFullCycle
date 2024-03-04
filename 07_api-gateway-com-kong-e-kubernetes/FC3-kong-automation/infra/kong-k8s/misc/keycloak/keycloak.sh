#!/bin/bash
kubectl create ns iam
helm install keycloak oci://registry-1.docker.io/bitnamicharts/keycloak --set auth.adminUser=keycloak,auth.adminPassword=keycloak --namespace iam
