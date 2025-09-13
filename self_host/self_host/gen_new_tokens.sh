#!/usr/bin/env bash

# NOTE: It is recommended you change these once in a while in the docker-compose.yml
# NOTE: You can also generate a new hmac_key using pwgen
# `pwgen 20 1` and pasting that in the hmac_key section of the docker-compose.yml file.

echo "GENERATING NEW visitor_data AND po_token"
docker run quay.io/invidious/youtube-trusted-session-generator
