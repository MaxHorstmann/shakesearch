# ShakeSearch

This is a fork of the [Pulley Shakesearch Take-home Challenge](https://github.com/ProlificLabs/shakesearch).

Try it out here: [maxhorstmann.net/shakesearch](http://maxhorstmann.net/shakesearch)

Spotted in this HN post: [Pulley (YC W20) Is Hiring Go Engineers](https://news.ycombinator.com/item?id=25444908)

# Implementation Details

The stated mission of this challenge is to "improve the search backend". Naturally, my first question was: why is there a search backend? Full-text search, for the most part, is a solved problem. For instance, we could throw all of Shakespeare's works into an Elastisearch index and wire up the front-end accordingly - no need to write a single line of back-end code. Right?

Ok, to be fair: this might not exactly be what the makers at [Pulley](https://pulley.com) had in mind here. They're running this challenge for recruiting purposes, and their goal is to learn about a potential candidate's coding skills. 

Still, I was intrigued to tackle this a bit more from a DevOps perspective and see how a minimal solution could look like. This is the result:

* First, we'll need Shakespeare's works in a more structured format. Thankfully, Elastic (the company) already has done this work: [shakespeare_6.0.json](https://download.elastic.co/demos/kibana/gettingstarted/shakespeare_6.0.json)

* Next, let's create a Docker image with Elasticsearch, preloaded with that data: [Dockerfile](Dockerfile)

* We can just host that image on [Docker Hub](https://hub.docker.com/repository/docker/maxhorstmann/shakesearch). In case anyone else needs Elasticsearch preloaded with Shakespeare....

* We'll have to host a running container somewhere. I chose [Azure Container Instances (ACI)](https://azure.microsoft.com/en-us/services/container-instances) - super simple, [just works](http://shakesearch.eastus.azurecontainer.io/shakespeare/_search?q=hamlet).

* Let's add a [GitHub Actions Workflow](.github/workflows/deploy.yml) to automate all those backend deployment steps. 

* Front-end is completely static and can just live on GH Pages.

* Just a little bit of styling (Bootstrap container) makes a big difference.

Tons of things we could do next to further iterate: paging, [highlighting](https://www.elastic.co/guide/en/elasticsearch/reference/current/highlighting.html), advanced searches (filtering/ordering)... basically there's a long list of things that Elastic does out of the box, and we can expose them on the front-end with relatively little effort. Maybe next weekend! :-)

This was fun, thanks Pulley!


