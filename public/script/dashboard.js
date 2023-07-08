
var data_socket  = new WebSocket('ws://127.0.0.1:8081');
var video_socket = new WebSocket('ws://127.0.0.1:8080');

var map;
var marker;

var API_KEY;

var script = document.createElement('script');
script.src = "https://maps.googleapis.com/maps/api/js?key=" + API_KEY + "&callback=initMap";
document.head.appendChild(script);

fetch('/api_key')
.then(response => response.text())
.then(data => {
  API_KEY = data;
})
.catch(error => {
  console.log(error);
});

data_socket.onopen = function (e) {
    console.log("data bridge connected");
};

video_socket.onopen = function (e) {
    console.log("video bridge connected");
};


data_socket.onmessage = function(message){
    console.log(message.data)
    var data_obj = JSON.parse(message.data);
    document.getElementById('Altitude').innerHTML = data_obj.altitude; 
    document.getElementById('Battery').innerHTML  = data_obj.battery; 
    document.getElementById('Signal').innerHTML   = data_obj.signal; 
    document.getElementById('Latitude').innerHTML = data_obj.latitude;
    document.getElementById('Longitude').innerHTML= data_obj.longitude;

    updateMarkerPosition(data_obj.latitude,data_obj.longitude);

};


data_socket.onerror = function(error) {
    console.error("error",error);
};

video_socket.onmessage = function (e) {
  let ctx =video.getContext("2d");
  let image = new Image();
  image.src = URL.createObjectURL(e.data);
  image.addEventListener("load", (e) => {
      ctx.drawImage(image, 0, 0, video.width, video.height);
  });
};

video_socket.onerror = function (error) {
    console.error('error',error);
}


function initMap() {
  
   map = new google.maps.Map(document.getElementById('map'), {
    center: {lat:26.246673 , lng: 78.223662}, 
    zoom: 100 
  });
}

  function updateMarkerPosition(latitude, longitude) {
    var position = new google.maps.LatLng(latitude, longitude);

    if (!marker) {
      marker = new google.maps.Marker({
        position: position,
        map: map,
        title: 'Marker Title' 
      });
    } else {
      
      marker.setPosition(position);
    }

    
    map.setCenter(position);
  }
