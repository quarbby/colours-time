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

var sel;
var val;
var offset;
var countryLoc;
var now;

window.onload = function(e) {
    populateCountries("country2");
    sel = document.getElementById("country2");
    sel.value = "Singapore";
    countryLoc = sel.options[sel.selectedIndex].text;
    
    now = new Date();

    timeBox = document.getElementById('timeBox');
    timeElement = document.getElementById('time');
    timeColElement = document.getElementById('timeColour');
    
    dateBox = document.getElementById('dateBox');
    dateElement = document.getElementById('date');
    dateColElement = document.getElementById('dateColour');
    
    weatherBox = document.getElementById('weatherBox');
    weatherElement = document.getElementById('weather');
    weatherColElement = document.getElementById('weatherColour');
    
    //countryChanged();
    
	updateClock();
}

function updateClock() {
    now = new Date();
    var utc = now.getTime() - (now.getTimezoneOffset() * 60000);
    val = sel.selectedIndex; 
    
    var localoffset = -(now.getTimezoneOffset()/60);
    var destoffset = timezone_arr[val-1];
    
    offset = destoffset-localoffset-1;
    console.log("Local Offset: " + localoffset + " Dest Offset: " + destoffset + " offset: " + offset);
    
    now = new Date(utc + (3600000*offset));
    
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
        woeid: '',   //Singapore woeid: 1062617
        location: countryLoc,
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
            
            weatherColour = '#' + temp + humidity + ('' + windSpeed.replace('.', '')).slice(0,2);
            weatherColElement.innerHTML = weatherColour;

            },
            error: function (error) {
                console.log("Error in getting weather");
                weatherElement.innerHTML = "Whoops, error getting weather information!";
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

function countryChanged() {
    val = sel.selectedIndex; 
    countryLoc = sel.options[sel.selectedIndex].text;
    
}

var timezone_arr = new Array(4.30, 1.00, -11,
1.0, -4.00, 0, -4, -3, 4,
-4, 5, 5, 1, 4, -5,
-3, 6, -4, 3, 1, -6, 1, -4,
6, -4, 1, 2, -5, -4,
8, 2, 0, 6.30, 2, 7, 1, -8,
-1, -5, 1, 1, -5, 8, 7,
-8, 6.30, -5, 3, 1,
1, -10, -6, 0, 1, -5, 2,
1, 1, 3, -4, -4, -6, 2,
-6, 1, 3, 2, 3, 3,
-3, 0, 12, 2, -10, -3, 
-10, 3, 1, 0, 3,
3, 1, 0, 1, 4, 2, -4, -4,
-4, 10, -6, 0, 0, 0, -4, -5,
5, 1, -6, 8, -12,
1, 0, 5.30, 7, 3.30, 3, 0, 0, 2, 1,
-5, 1, 9, -11, 0, -10, 2, 3, 
+5, 3, 12, 8.30, 9, 3, 6, 7, 2,
2, 2, 0, 2, 1, 2, 1, 8, 
1, 3, 2, 8, 5, 0, 1,
0, 4, -4, 0, 4, 3, -8,
10, -11, 2, 1, 7, -4, 
0, 2, 1, 12, 5.45, -4, -4, 11,
12, -6, 1, 1, -11, 11.30, 10, 1,
4, 5, 9, -5, 10, -4, -5, 8, -8, 
1, -1, -4, 3, 4, 2, 2, 2, 0,
-4, -4, -4, 0, 13,
1, 0, 1, 1, 0, 4, 0,
8, 1, 1, 11, 3, 3,
-1, 0, 0, 5.30, 3, -3,
1, 2, 1, 1, -2, 8, 5, 3, 7,
-4, 0, 13, 13, -4, 1, 2, 5, 12, 3, 
3, 4, 0, 0, 10, 5, 11, -4.30,
3, -4, 4, 4, 0, 0, 3, 0, 
2, 2, 2);