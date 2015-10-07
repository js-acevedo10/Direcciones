var directionDisplay;
var directionsService = new google.maps.DirectionsService();
function initialize() {
  var latlng = new google.maps.LatLng(4.609841, -74.086834);
  // set direction render options
  var rendererOptions = { draggable: true };
  directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
  var myOptions = {
    zoom: 14,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: false
  };
  // add the map to the map placeholder
  var map = new google.maps.Map(document.getElementById("map_canvas"),myOptions);
  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById("directionsPanel"));
  // Add a marker to the map for the end-point of the directions.
}
function calcRoute() {
  // get the travelmode, startpoint and via point from the form   
  var travelMode = "DRIVING";
  var start = $("#routeStart").val();
  var via = $("#routeVia").val();
  var via2 = $("#routeVia2").val();
  var via3 = $("#routeVia3").val();

  var end = "4.655628, -74.062558"; // endpoint is a geolocation
  var waypoints = []; // init an empty waypoints array
  if (via != '') {
    waypoints.push({
      location: via,
      stopover: true
    });
  }
    if(via2 != '') {
        waypoints.push({
            location: via2,
            stopover: true
        });
    }
    if(via3 != '') {
        waypoints.push({
            location: via3,
            stopover: true
        });
    }
  var request = {
    origin: start,
    destination: end,
    waypoints: waypoints,
    optimizeWaypoints: true,
    unitSystem: google.maps.UnitSystem.IMPERIAL,
    travelMode: google.maps.DirectionsTravelMode[travelMode]
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      $('#directionsPanel').empty(); // clear the directions panel before adding new directions
      directionsDisplay.setDirections(response);
    } else {
      // alert an error message when the route could nog be calculated.
      if (status == 'ZERO_RESULTS') {
        alert('No route could be found between the origin and destination.');
      } else if (status == 'UNKNOWN_ERROR') {
        alert('A directions request could not be processed due to a server error. The request may succeed if you try again.');
      } else if (status == 'REQUEST_DENIED') {
        alert('This webpage is not allowed to use the directions service.');
      } else if (status == 'OVER_QUERY_LIMIT') {
        alert('The webpage has gone over the requests limit in too short a period of time.');
      } else if (status == 'NOT_FOUND') {
        alert('At least one of the origin, destination, or waypoints could not be geocoded.');
      } else if (status == 'INVALID_REQUEST') {
        alert('The DirectionsRequest provided was invalid.');         
      } else {
        alert("There was an unknown error in your request. Requeststatus: nn"+status);
      }
    }
  });
}