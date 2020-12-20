# ShakeSearch

This is a fork of the [Pulley Shakesearch Take-home Challenge](https://github.com/ProlificLabs/shakesearch).

Try it out here: [maxhorstmann.net/shakesearch](http://maxhorstmann.net/shakesearch)


# Implementation Details


Front-end is completely static and can just live on GH Pages: http://maxhorstmann.net/shakesearch

Back-end screams for an Elasticsearch instance with a prepopulated index:

[Dockerfile](Dockerfile) => [Docker Hub](https://hub.docker.com/repository/docker/maxhorstmann/shakesearch) => [ACI](http://shakesearch.eastus.azurecontainer.io:9200):

