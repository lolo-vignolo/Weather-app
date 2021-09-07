const express = require("express");
const https = require ("https");

// this body-parser  allows me go through the body of the post request and fetch
// the data based on the name of my input, "cityName", grand and use the
// information that the user respond in the input.
const bodyParser = require("body-parser");
const app = express();

// this piece of code is necesary to use body-parser
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", (req, res) =>{

  // // In this way I can read the HTML code, and "__dirname" works to get the path
  // this sendFile allows me pickup the information from the HTML code
res.sendFile(__dirname + "/index.html")
});


// this "post" would be like a callback, when I click the bottom this method
// carry out an operation.
// req.body.cityName is related with body-parser "name of the input"
app.post("/", (req, res) =>{

// using body-parser I can get the text that the user write in the web site, for
//  that I need the method post, body parser, when I can get their texts I can give
//  back an answer.
  const query = (req.body.cityName)
  const apiKey = "xxxxxxxxxxxxxx"
  const units = "metric"

  // after "q" I have to write a parameter that I want following the web
  // indications. Every parameter will be splited by a "&"
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${units}`


  https.get(url,(response)=>{
    console.log(response.statusCode);

    // "response.on" it a method which work to get a specific information from data.
    response.on("data", (data) =>{

      // As the data that I will get doesnt have any format I hace to use JSON.parse
      const weatherData = JSON.parse(data)

      // main.temp are both key words of my JSON OBJECT.
      const temp = weatherData.main.temp
      const description = weatherData.weather[0].description
      const speedWind = weatherData.wind.speed
      const icon = weatherData.weather[0].icon
      const urlIcon = `http://openweathermap.org/img/wn/${icon}@2x.png`
      res.write(`<h1>The temperature in ${query} now is ${temp} degrees Celcius, and ${description}.</h1>`);
      res.write(`<h2> As well as, the speed wind  is ${speedWind}</h2>`);
      res.write(`<img src= ${urlIcon}>`);
      res.send();
      // take into consideration that when I want to write mora than one text I have
      // to use write and at the end write the "send" parameter.

    })
  })

})


app.listen(3000, () => {
  console.log("the server in the port 3000 works properly.")
})
