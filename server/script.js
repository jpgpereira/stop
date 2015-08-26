Meteor.startup(function () {
  console.log("-------------\nInitiating...\n-------------");
});

Meteor.methods({
  'addMarker': function (position, type, time) {
    Markers.insert({
      position: position,
      type: type,
      time: time
    });
  },
  'getMarkers': function () {
    return Markers.find();
  }
});

Meteor.publish('markers', function () {
  Markers.find({}, {
    reactive: true,
  });
});