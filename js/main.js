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

var locationOfUser = '';
var geolocation = false;

var sel;
var val;
var offset;
var countryLoc;
var now;

var countriesData = [];

window.onload = function(e) {
    //populateCountries("country2");
    
    readData();
    populateCountriesFromJSON("countryList");
    //console.log(countriesData);
    
    // Set default to Singapore 
    sel = document.getElementById("countryList");
    sel.value = "Singapore";
    countryChanged();
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
    
    // Get user's location
    if ("geolocation" in navigator) {
      $('.js-geolocation').show(); 
    } else {
      $('.js-geolocation').hide();
    }
    
    $('.js-geolocation').on('click', function() {
        console.log("Hello!");
      navigator.geolocation.getCurrentPosition(function(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        locationOfUser = latitude + ',' + longitude;
        geolocation = true;
      });
    });

    locationOfUser = countriesData[val].latlong;
    
    navigator.geolocation.getCurrentPosition(function(position) {
        //console.log(position);
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        locationOfUser = latitude + ',' + longitude;
        geolocation = true;
    },
    function(error) {
        geolocation = false;
        console.log("User said no geolocation");
    });

	updateClock();
}

function readData() {
    $.ajax({
      url: 'data/countries.json',
      async: false,
      dataType: 'json',
      success: function (data) {
        countriesData = data.countries;
      }
    });
}

function updateClock() {
    now = new Date();
    var utc = now.getTime() - (now.getTimezoneOffset() * 60000);
    val = sel.selectedIndex; 
    
    var localoffset = -(now.getTimezoneOffset()/60);
    //var destoffset = timezone_arr[val-1];
    //console.log(countriesData[val]);
    var destoffset = countriesData[val-1].timezone_offset;
    
    //offset = destoffset-localoffset-1;
    offset = destoffset - localoffset;
    //console.log("Local Offset: " + localoffset + " Dest Offset: " + destoffset + " offset: " + offset);
    
    now = new Date(utc + (3600000*offset));

    time = ('0' + now.getHours()).slice(-2) + ':' + ('0' + now.getMinutes()).slice(-2) + ':' + ('0' + now.getSeconds()).slice(-2);
    timeColour = '#' + time.replace(/:/g, '');
    
    timeElement.innerHTML = time;
    timeColElement.innerHTML = timeColour
    timeBox.style.backgroundColor = timeColour;
    
    date = ('0' + now.getDate()).slice(-2) + ' ' + ('0' + (now.getMonth()+1)).slice(-2) + ' ' + (''+now.getFullYear()).slice(2);
    dateColour = '#' + date.replace(/\s/g, '');

    dateElement.innerHTML = date;
    dateColElement.innerHTML = dateColour;
    dateBox.style.backgroundColor = dateColour;
    
    //locationOfUser = '' + latitude + ',' + longitude;

    if (geolocation == false && locationOfUser == '') {
        weatherElement.innerHTML = "Whoops, geolocation not allowed! ";
    }
    
    else {
        $.simpleWeather({
            location: locationOfUser,
            woeid: '',   //Singapore woeid: 1062617
            unit: 'c',
            success: function (weather) {
                var temp = weather.temp;
                var humidity = weather.humidity;
                var windSpeed = weather.wind.speed;
                
                var weatherString = "Temp: " + temp + "&deg;"+ weather.units.temp +
                                    "<br>Humidity: " + humidity +
                                    "<br>Wind Speed: " + windSpeed;
                                    
                //var city = weather.city + ", " + weather.region;
                
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
    }

    setBackgroundColour();

    setTimeout(updateClock, 1000);
}

function setBackgroundColour() {
    var colors = new Array($.Color(timeColour), $.Color(dateColour), $.Color(weatherColour));

    var result_color = Color_mixer.mix(colors);
    //console.log(result_color);
    
    document.body.style.backgroundColor = result_color;
}

function countryChanged() {
    val = sel.selectedIndex; 
    countryLoc = sel.options[sel.selectedIndex].text;
    locationOfUser = countriesData[val].latlong;
}

function populateCountriesFromJSON(countryElementId){
	var countryElement = document.getElementById(countryElementId);
	countryElement.length = 0;
	countryElement.selectedIndex = 0;
	for (var i in countriesData) {
		//console.log(countriesData[i]);
		countryElement.options[countryElement.length] = new Option(countriesData[i].name);
	}
}