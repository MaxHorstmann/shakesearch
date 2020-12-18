#!/bin/sh
curl -X PUT "localhost:9200/completeworks"
curl -X POST "localhost:9200/completeworks/_doc?pretty=true" -H "Content-Type: application/json" -d @/completeworks.json
