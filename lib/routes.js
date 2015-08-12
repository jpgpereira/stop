Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

Router.route('/', function () {
  this.render('map');
});

Router.onBeforeAction(function () {
  Session.set('local', Geolocation.latLng());
  if (!Session.get('local')) {
    this.render('loading');
  } else {
    this.next();
  }
});