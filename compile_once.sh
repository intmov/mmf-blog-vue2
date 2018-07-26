#!/bin/bash

echo 'pull from github'
cd /usr/local/src/mmf-blog-api-v2
lines=$(git pull | wc -l)
if [ $lines -gt 1 ]; then
     kill -9 `pgrep -f node`
     sleep 10
     node server.js &
fi

cd /usr/local/src/mmf-blog-vue2
lines2=$(git pull | wc -l)
if [ $lines2 -gt 1 ]; then
	rm -rf node_modules
	yarn
	npm run build
fi


