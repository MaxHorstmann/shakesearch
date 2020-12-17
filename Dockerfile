FROM elasticsearch:7.10.1 #test
ENV discovery.type=single-node
EXPOSE 9200
