#!/bin/sh

# one-to-one
yarn load:countries
yarn load:cities
yarn load:currencies
yarn load:google-trends
yarn load:languages
yarn load:organizations
yarn load:passports
yarn load:timezones
# many-to-many
yarn load:countries:organizations
yarn load:countries:passports
yarn load:currencies:countries
yarn load:languages:countries
