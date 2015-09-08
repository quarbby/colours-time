var now;

var timeBox; 
var timeElement;
var timeColElement;
var time;
var timeColour;

var dateBox;
var dateElement;
var dateColElement;
var date;
var dateColour;

var weatherBox;
var weatherElement;
var weatherColElement;
var weather;
var weatherColour;

window.onload = function(e) {
    timeBox = document.getElementById('timeBox');
    timeElement = document.getElementById('time');
    timeColElement = document.getElementById('timeColour');
    
    dateBox = document.getElementById('dateBox');
    dateElement = document.getElementById('date');
    dateColElement = document.getElementById('dateColour');
    
    weatherBox = document.getElementById('weatherBox');
    weatherElement = document.getElementById('weather');
    weatherColElement = document.getElementById('weatherColour');
    
	updateClock();
}

function updateClock() {
    now = new Date();
    
    time = ('0' + now.getHours()).slice(-2) + ':' + ('0' + now.getMinutes()).slice(-2) + ':' + ('0' + now.getSeconds()).slice(-2);
    timeColour = '#' + time.replace(/:/g, '');
    
    timeElement.innerHTML = time;
    timeColElement.innerHTML = timeColour
    timeBox.style.backgroundColor = timeColour;
    
    date = ('0' + now.getDay()).slice(-2) + ' ' + ('0' + now.getMonth()).slice(-2) + ' ' + (''+now.getFullYear()).slice(2);
    dateColour = '#' + date.replace(/\s/g, '');
    
    dateElement.innerHTML = date;
    dateColElement.innerHTML = dateColour;
    dateBox.style.backgroundColor = dateColour;
    
    $.simpleWeather({
        zipcode: '',
        woeid: 1062617,   //Currently Singapore
        location: '',
        unit: 'c',
        success: function (weather) {
            var temp = weather.temp;
            var humidity = weather.humidity;
            var windSpeed = weather.wind.speed;
            
            var weatherString = "Temp: " + temp + "&deg;"+ weather.units.temp +
                                "<br>Humidity: " + humidity +
                                "<br>Wind Speed: " + windSpeed;
            
            weather = weather.currently;
            weatherString += "<br>" + weather;
            weatherElement.innerHTML = weatherString;
            
            weatherColour = '#' + temp + humidity + ('' + windSpeed).slice(-2);
            weatherColElement.innerHTML = weatherColour;

            },
            error: function (error) {
                console.log("Error in getting weather");
            }
    });

    setBackgroundColour();

    setTimeout(updateClock, 1000);
}

function setBackgroundColour() {
    var colors = new Array($.Color(timeColour), $.Color(dateColour), $.Color(weatherColour));

    var result_color = Color_mixer.mix(colors);
    
    document.body.style.backgroundColor = result_color;
}
