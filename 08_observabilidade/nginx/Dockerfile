FROM nginx:latest
# Remove os arquivos de log padrão do nginx
RUN rm -f /var/log/nginx/access.log && rm -f /var/log/nginx/error.log

# Copia o arquivo de configuração do nginx para o container
COPY default.conf /etc/nginx/conf.d/default.conf
