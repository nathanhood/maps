/* global google:true */
/* jshint unused:false, camelcase:false */

(function(){
  'use strict';

  $(document).ready(init);

  function init(){
    initMap(36, -86, 3);// latitude, longitude and zoom of initial location on map.
    //zoom range = 1 - 20 (low to high).
    $('#add').click(add);
    $('#show').click(show);
  }

  var map;

  function initMap(lat, lng, zoom){
    let mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP};
    //three types of maps: road map, satellite, hybrid.
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }

  function add(){ //appending string to select box
    let place = $('#place').val().trim(); //takes string value from input
    let vacation = `<option>${place}</option>`; //inserts place into var vacation
    $('#vacations').append(vacation); //appending to select box
    $('#place').val(''); //changes the value of input to empty string after 'add' is clicked
    $('#place').focus(); //puts focus/cursor back on the input box after 'add' is clicked
  }


  function show(){ //locates geographic information on vacation spot/location name
    let vacation = $('#vacations').val(); //takes value selected in select box
    let geocoder = new google.maps.Geocoder(); //

    //geocode is essentially a google search in this context for the word selected.
    geocoder.geocode({address: vacation}, function(results, status)/* callback function */{

      let name = results[0].formatted_address; //accessing returned object information
      let lat = location.coordinates = results[0].geometry.location.lat();//accessing latitude and longitude
      let lng = location.coordinates = results[0].geometry.location.lng();//what is .lat() and .lng()?
      addMarker(lat, lng, name);
    });
  }

  function addMarker(lat, lng, name){ //creates pin on map
    let latLng = new google.maps.LatLng(lat, lng); //plugs in lat and lng
    new google.maps.Marker({map: map, position: latLng, title: name}); //title is hove window.
  }


})();
