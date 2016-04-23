var sel;
var offset = null; 
var now;

window.onload = function(e) {
	populateCountries("country2");
	sel = document.getElementById("country2");
	sel.value = "Singapore";

	updateClock();
}

function updateClock() {
    now = new Date();
    
    countryChanged();
    
    console.log(now);
    
    time = ('0' + now.getHours()).slice(-2) + ':' + ('0' + now.getMinutes()).slice(-2) + ':' + ('0' + now.getSeconds()).slice(-2);
    timeColour = '#' + time.replace(/:/g, '');
    
    document.getElementById('time').innerHTML = time;
    document.getElementById('colour').innerHTML = timeColour
    
    document.body.style.backgroundColor = timeColour;

    setTimeout(updateClock, 1000);
}

function countryChanged() {
    var val = sel.selectedIndex; 
    //console.log(sel.selectedIndex);
    
    try {
        var localoffset = -(now.getTimezoneOffset()/60);
        var destoffset = timezone_arr[val-1];
        
        if (destoffset == undefined) {
            now = new Date();
        }
        
        else {
            var utc = now.getTime() - (now.getTimezoneOffset() * 60000);
    
            offset = destoffset-localoffset-1;
            console.log("Local Offset: " + localoffset + " Dest Offset: " + destoffset + " offset: " + offset);
            now = new Date(utc + (3600000*offset));
            //console.log(date);
            //date = new Date( now + offset * 3600 * 1000);
      
            //console.log(date);            
        }

    }
    catch (err) {
        now = new Date();
    }
}
