FROM elasticsearch:7.10.1
ENV discovery.type=single-node
RUN echo "http.cors.enabled : true" >> /usr/share/elasticsearch/config/elasticsearch.yml
RUN echo "http.cors.allow-origin: '*'" >> /usr/share/elasticsearch/config/elasticsearch.yml
EXPOSE 9200
