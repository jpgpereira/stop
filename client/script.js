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
      var local = Session.get('local');
      var zoom = 12;
      return {
        center: new google.maps.LatLng(local.lat, local.lng),
        zoom: zoom,
        disableDefaultUI: true
      };
    }
  }
});

Template.config.events({
  'click .optionsWeb': function () {
    $('.modal-trigger').leanModal({
      dismissible: false,
      opacity: .5,
      complete: function() {
        //update markers
      }
    });
  }
});

Template.navbar.events({
  'click #side-menu': function () {
    $(".button-collapse").sideNav();
  }
});