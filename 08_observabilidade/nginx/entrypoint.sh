#!/bin/bash

/docker-entrypoint.sh
filebeat modules enable nginx # Enable the Nginx module in Filebeat
filebeat setup # Copia os dashboards, templates e etc para o Elasticsearch
service filebeat start # Inicia o Filebeat
nginx -g 'daemon off;' # Inicia o Nginx em modo background