Markers = new Mongo.Collection('markers');

if (Meteor.isClient) {
  Template.map.onCreated(function() {
    GoogleMaps.ready('map', function(map) {
      console.log("Mapa pronto!");
    });
  });

  Meteor.startup(function() {
    GoogleMaps.load();
  });

  Template.map.helpers({  
    options: function() {
      if (GoogleMaps.loaded()) {
        return {
          center: new google.maps.LatLng(38.722252, -9.139337),
          zoom: 9,
          disableDefaultUI: true
        };
      }
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    console.log("-------------\nInitiating...\n-------------");
  });
}
