const request = require('request');

const forecast = (latitude, longitude, callback) =>{
    const url = `https://api.darksky.net/forecast/ef60cff5b82d5745cf8902d20b88d6e9/${latitude},${longitude}?units=si`;
    request({url , json:true}, (error, response) =>{
        if(error){
            callback('unable to connect to weather service')
        }
        else if(response.body.error){
            callback('Unable to find location');
        }else{
            const data = response.body.currently;
            callback(undefined,`it is currently ${data.temperature} degree and ${data.precipProbability}% chance of rain`);
        }   
    });
};

module.exports = forecast;