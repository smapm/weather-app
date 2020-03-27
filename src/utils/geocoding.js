const request = require('request');

const geocoding = (location, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=pk.eyJ1Ijoic21hcG0iLCJhIjoiY2s4MWFoamxzMDVhbTNmcGdreGdpbnFndCJ9.ggOjrcXDp44-WRkM3Cp-XA&limit=1`;
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('unable to connect to location service');
        }
        else if (response.body.features.length === 0) {
            callback('Incorrect location provided');
        } else {
            const latitude = response.body.features[0].center[1];
            const longitude = response.body.features[0].center[0]
            const location = response.body.features[0].place_name
            callback(undefined,{
                latitude,longitude,location
            });
        }
    });
}

module.exports = geocoding;