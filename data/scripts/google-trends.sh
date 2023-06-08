#!/bin/sh

# Google Trends
yarn extract:google:trends
yarn transform:google:trends
yarn load:google:trends
