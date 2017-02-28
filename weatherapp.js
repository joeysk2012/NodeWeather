//this code allow users to run a command line application in which they can check the weather of the city they type in
//typical usage is:

//node weatherapp.js Boston

const https=require('https');
const http=require('http');

function printWeather(city,temp, type){
  const message='it is ' +temp+ ' degrees and ' + type+ ' in ' + city;
  console.log(message);
}

function getWeather(city){
   console.log(city);
   var url= 'http://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=4e44e3428b01d9a6ad76981f8ab8db5a';
  const request = http.get(url,response => {
    if (response.statusCode===200){
    let body = "";
    // Read the data
    response.on('data', data => {
    body += data.toString();
    }); //end of response data
    response.on('end', () => {
    try {
    // Parse the data
    const openWeather = JSON.parse(body);                            
    // Print the data
    temp=openWeather.main.temp;
    type=openWeather.weather[0].description;
    city=openWeather.name;
    temp=temp*(9/5)-459.67;
    printWeather(city,temp,type);
    } catch (error) {
    printError(error);
    }
    });//end of end reponse
    }else{
        const message = `There was an error getting the profile for' + city + ' ' + http.STATUS_CODES[response.statusCode]`;
                                const statusCodeError = new Error(message);}
      
    });//end of api call function

  }//end of get weather function
  
const city = process.argv.slice(2);
getWeather(city);
