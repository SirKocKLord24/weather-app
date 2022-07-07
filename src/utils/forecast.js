const request = require('request')

const forecast = (latitude,longitude,callback)=>{

    const url =
    `http://api.weatherstack.com/current?access_key=5bde59f8d5614dcc7dc7d457809924da&query=${latitude},${longitude}`;

    request({url,json: true},(error,{body})=>{
        if(error){
            callback('Unable to connect to services',undefined)
        } else if(body.error){
            callback('Unable to find location. Please provide valid latitude and longitude',undefined)
        } else {
            callback(undefined,{
                currentTemp: body.current.temperature,
                currentFeels: body.current.feelslike,
                description: body.current.weather_descriptions[0],
                isDay: body.current.is_day
            })
        }
    })
}

module.exports = forecast