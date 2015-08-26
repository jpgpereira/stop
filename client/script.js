var latlng, time, type;

Template.map.onCreated(function() {
  GoogleMaps.ready('map', function(map) {
    google.maps.event.addListener(map.instance, 'click', function(event) {
      latlng = event.latLng;
      time = moment().format();
      $('#markerModal').openModal();
    });
  });
});

function insertMarker () {
  var marker = new google.maps.Marker({
    position: latlng,
    draggable: true,
    type: type,
    time: time,
    map: GoogleMaps.maps.map.instance
  });
  marker.addListener('click', function() {
    console.log(marker.type+" "+marker.position);
  });
  Meteor.call('addMarker', latlng, type, time);
}

function loadData () {
  var markers = Meteor.call('getMarkers');
  console.log(markers);
}

Template.map.created = function () {
  this.autorun(function () {
    this.subscription = Meteor.subscribe('markers');
  }.bind(this));
};

Template.map.rendered = function () {
  this.autorun(function () {
    if (this.subscription.ready()) {
      loadData(); 
    }
  }.bind(this));
};

Meteor.startup(function() {
  GoogleMaps.load();
});

Template.map.helpers({  
  options: function() {
    if (GoogleMaps.loaded()) {
      var local = Session.get('local');
      var zoom = 15;
      return {
        center: new google.maps.LatLng(local.lat, local.lng),
        zoom: zoom,
        disableDefaultUI: true
      };
    }
  }
});

Template.config.events({
  'click .configMap': function () {
    $('#config').openModal();
  },
  'click #saveConfig': function () {
    var options = $("form").serializeArray();
  }
});

Template.map.events({
  'click #addMarker': function () {
    type = $('input[name=tipo]:checked').val();
    insertMarker();
  }
});