# see https://github.com/gaving/es-bundled-template
FROM elasticsearch:7.10.1 AS builder
ADD shakespeare_6.0.json /
ENV discovery.type=single-node
RUN /usr/local/bin/docker-entrypoint.sh elasticsearch -d -E path.data=/tmp/data \
    && while [[ "$(curl -s -o /dev/null -w '%{http_code}' localhost:9200)" != "200" ]]; do sleep 1; done \
    && curl -s -X POST "localhost:9200/shakespeare/doc/_bulk" -H 'Content-Type: application/x-ndjson' --data-binary @/shakespeare_6.0.json  


FROM elasticsearch:7.10.1
COPY --from=builder /tmp/data/ /usr/share/elasticsearch/data/
ENV discovery.type=single-node
# Enable CORS so Browsers can talk to it directly.
# Not what you would wanna do in the real world (don't put your db on the internet, there
# would be some API layer in between e.g. Azure Functions) but totally works for this POC:
RUN echo "http.cors.enabled : true" >> /usr/share/elasticsearch/config/elasticsearch.yml
RUN echo "http.cors.allow-origin: '*'" >> /usr/share/elasticsearch/config/elasticsearch.yml
RUN echo "http.port: 9999" >> /usr/share/elasticsearch/config/elasticsearch.yml
EXPOSE 9999
