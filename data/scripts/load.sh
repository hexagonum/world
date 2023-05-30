#!/bin/sh

# one-to-one
yarn load:countries
yarn load:currencies
yarn load:languages
yarn load:organizations
yarn load:timezones
# many-to-many
yarn load:countries:organizations
yarn load:currencies:countries
yarn load:languages:countries
