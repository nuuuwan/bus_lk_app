DIR_REMOTE_DATA=/Users/nuwan.senaratna/Dropbox/_CODING/py/bus_lk/data
DIR_DATA=public/data

rm -rf $DIR_DATA/*
mkdir $DIR_DATA/routes

cp $DIR_REMOTE_DATA/stops.json $DIR_DATA/stops.json
cp -r $DIR_REMOTE_DATA/routes/*.json $DIR_DATA/routes/
