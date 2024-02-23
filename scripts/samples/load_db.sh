#!/bin/bash

# Create a new SQLite database
sqlite3 states.db <<EOF
CREATE TABLE states (
    name TEXT,
    date_admitted TEXT,
    capital TEXT,
    largest_city TEXT,
    govenor TEXT,
    senators TEXT,
    house_delegation TEXT,
    area_total TEXT,
    area_land TEXT,
    area_water TEXT,
    elevation TEXT,
    population_total TEXT,
    population_density TEXT,
    time_zone TEXT,
    latitude TEXT,
    longitude TEXT,
    url TEXT,
    flag_url TEXT,
    insignia_url TEXT
);
EOF

# Import data from JSON file into the database
cat states_alabama.json | jq -c '.[]' | while read row; do
  name="$(echo "$row" | jq -r '.name')"
  date_admitted="$(echo "$row" | jq -r '.date_admitted')"
  capital="$(echo "$row" | jq -r '.capital')"
  largest_city="$(echo "$row" | jq -r '.largest_city')"
  govenor="$(echo "$row" | jq -r '.govenor')"
  senators="$(echo "$row" | jq -r '.senators[]')"
  house_delegation="$(echo "$row" | jq -r '.house_delegation[]')"
  area_total="$(echo "$row" | jq -r '.area.total')"
  area_land="$(echo "$row" | jq -r '.area.land')"
  area_water="$(echo "$row" | jq -r '.area.water')"
  elevation="$(echo "$row" | jq -r '.elevation')"
  population_total="$(echo "$row" | jq -r '.population.total')"
  population_density="$(echo "$row" | jq -r '.population.density')"
  time_zone="$(echo "$row" | jq -r '.time_zone')"
  latitude="$(echo "$row" | jq -r '.latitude')"
  longitude="$(echo "$row" | jq -r '.longitude')"
  url="$(echo "$row" | jq -r '.url')"
  flag_url="$(echo "$row" | jq -r '.flag_url')"
  insignia_url="$(echo "$row" | jq -r '.insignia_url')"
  sqlite3 states.db <<EOF
  INSERT INTO states (name, date_admitted, capital, largest_city, govenor, senators, house_delegation, area_total, area_land, area_water, elevation, population_total, population_density, time_zone, latitude, longitude, url, flag_url, insignia_url)
  VALUES ("$name", "$date_admitted", "$capital", "$largest_city", "$govenor", "$senators", "$house_delegation", "$area_total", "$area_land", "$area_water", "$elevation", "$population_total", "$population_density", "$time_zone", "$latitude", "$longitude", "$url", "$flag_url", "$insignia_url");
EOF
done
