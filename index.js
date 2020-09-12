//Initializing DOM element to ne manupulated

const searchbox = document.getElementById('searchbox');

const submitButton = document.getElementById('submitButton');

const ipAddress = document.getElementById('ipAddress');

const mainLocation = document.getElementById('mainLocation');

const mainTimezone = document.getElementById('mainTimezone');

const ispAddress = document.getElementById('ispAddress');

const map = document.getElementById('map');

const apiRequest1 = new XMLHttpRequest();

const key = `at_l1JzwUUPJVsGM0ceVNLEt4yOZPQTH`;

//Initializing the leaflet API Map
const mymap = L.map('map');


//Listening for a click event from the button
submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    if(searchbox.value === ''){
        apiRequest1.open('GET', `https://geo.ipify.org/api/v1?apiKey=${key}`);
        apiRequest1.send();
    }else {
        apiRequest1.open('GET', `https://geo.ipify.org/api/v1?apiKey=${key}&ipAddress=${searchbox.value}&domain=${searchbox.value}&email=${searchbox.value}`);
        apiRequest1.send();
    }
});

//Sending an API request on windows load to get the users default/public IP Address
apiRequest1.open('GET', `https://geo.ipify.org/api/v1?apiKey=${key}`);
apiRequest1.send();


//When the API request is ready
apiRequest1.onreadystatechange = () => {
    if(apiRequest1.readyState === 4){
        if(apiRequest1.status === 404){
            console.log('error');
        }

        const response = JSON.parse(apiRequest1.response);
        console.log(JSON.stringify(response));
        ipAddress.innerHTML = `${response.ip}`;
        mainLocation.innerHTML = `${response.location.city}, ${response.location.country}`;
        mainTimezone.innerHTML = `UTC${response.location.timezone}`;
        ispAddress.innerHTML = `${response.isp}`;
        let lat = response.location.lat;
        let lng = response.location.lng;
        console.log(lng);
        console.log(lat);

        mymap.setView([lat, lng], 13);

        // Adding tiles Image for the Map from MAPbox API
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoidGVlLWJhbXMiLCJhIjoiY2tlemh5ZmVpMDRveTJzcWFqNGhqNndtcyJ9.eI60lKquXEVhVOYplPLT-w'
}).addTo(mymap);

    //Declaring the Marker Image
var locationIcon = L.icon({
    iconUrl: '../images/icon-location.svg',

    // iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    // iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    // shadowAnchor: [4, 62],  // the same for the shadow
    // popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});


//Specifying where the marker image should display
L.marker([lat, lng], {icon: locationIcon}).addTo(mymap);
    }
}




