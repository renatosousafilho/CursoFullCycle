FROM nginx:latest
# Remove os arquivos de log padrão do nginx
RUN rm -f /var/log/nginx/access.log && rm -f /var/log/nginx/error.log

# Copia o arquivo de configuração do nginx para o container
COPY default.conf /etc/nginx/conf.d/default.conf

# Baixa e instala o filebeat
RUN curl -L -O https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-7.13.0-arm64.deb && \
    dpkg -i filebeat-7.13.0-arm64.deb

# Copia o arquivo de configuração do filebeat para o container
COPY filebeat.yml /etc/filebeat/filebeat.yml

# Copia o entrypoint.sh customizado para usar o filebeat para o container
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x entrypoint.sh
ENTRYPOINT [ "/entrypoint.sh" ]