#!/bin/bash
#dockerize -timeout 60s -wait tcp://mysql:3306

socat TCP4-LISTEN:3306,fork,reuseaddr TCP4:mysql:3306 &

exec "$@"
