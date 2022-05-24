const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

require('dotenv').config()

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/index.html")
})

app.post("/", (req, res)=>{
    const query = req.body.city
    const apiKey = process.env.API_KEY
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit+""
    https.get(url, (response)=>{
        response.on("data", (data)=>{
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imgUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write("<p>The weather is like " + weatherDescription + "</p>");
            res.write("<h1>The temprature in London is "+ temp + " degrees Celsius</h1>")
            res.write("<img src="+ imgUrl +">")
            res.send()
        })

    })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log("Server started on http://localhost:3000")
})