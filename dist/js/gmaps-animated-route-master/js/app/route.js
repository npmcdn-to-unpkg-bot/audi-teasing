define([
  'gmaps',
  'underscore',
  './points',
  './filters',
  './styles',
  './animation'],
function(gmaps, _, points, filters, styles, animateRoute){

  function Route(options) {
    this.options = this.extend(this._options, options);
    this.init();
  }

  Route.prototype = {

    // default options
    _options: {
      initializeFilters: true,
      animate: false
    },

    map: {},

    mapTileListener: null,

    coordinates: [],

    line: {},

    enabledFilters: {},

    init: function(){
      this.enabledFilters = (this.options.initializeFilters ? filters : {});
      this.parseJSON(points);
    },

    parseJSON: function(data){

      this.coordinates = data.map(function(item){
        return {
          lat: item.latitude,
          lng: item.longitude,
          timestamp: item.timestamp,
          googLatLng: new gmaps.LatLng(item.latitude, item.longitude)
        }
      });

      this.drawMap();
    },

    drawMap: function() {

      var self = this,
          forEach = Array.prototype.forEach;

      self.map = new gmaps.Map(document.querySelector(".map"), {
        center: new gmaps.LatLng(49, 11.2059485),
        zoom: 5,
        mapTypeId: gmaps.MapTypeId.ROADMAP,
        styles: styles,
        panControl: false,
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl : false,
        scrollwheel: false,
        zoomControlOptions : {
          position: gmaps.ControlPosition.LEFT_BOTTOM,
          style: gmaps.ZoomControlStyle.LARGE
        }
      });

      // Wait map to be fully loaded before set the markers
      self.mapTileListener = gmaps.event.addListener(self.map, 'tilesloaded', function(){
        self.setMarkers();
        gmaps.event.removeListener(self.tileListener);
      });

    },

    setMarkers: function() {

      var self = this,
          Ingolstadt, endMarker, belgique, pin, car, goulette, Hamburg;

      pin       = new gmaps.MarkerImage('dist/img/marker.png', null, null, null, new gmaps.Size(49,70));
      car       = new gmaps.MarkerImage('dist/img/car-map.png', null, null, null, new gmaps.Size(83,60));
      routeLine = new gmaps.MarkerImage('dist/img/line.png', null, null, null, new gmaps.Size(153,96));

      /*Ingolstadt = new gmaps.Marker({
        position: self.coordinates[0].googLatLng,
        icon: pin,
        map: self.map,
        //animation: google.maps.Animation.DROP
      });
      Hamburg = new gmaps.Marker({
        position: self.coordinates[2].googLatLng,
        icon: pin,
        map: self.map,
       // animation: google.maps.Animation.DROP
      });
    
      car = new gmaps.Marker({
        position: self.coordinates[1].googLatLng,
        icon: car,
        map: self.map,
      });

      belgique = new gmaps.Marker({
        position: self.coordinates[3].googLatLng,
        icon: pin,
        map: self.map,
      });

      goulette = new google.maps.Marker({
        position: self.coordinates[5].googLatLng,
        icon: pin,
        map: self.map,
        //animation: google.maps.Animation.DROP
      });

      line = new google.maps.Marker({
        position: self.coordinates[6].googLatLng,
        icon: routeLine,
        map: self.map,
        //animation: google.maps.Animation.DROP
      });
*/

      self.updateRoutes();
    },

    updateRoutes: function() {

      var pathCoordinates = _.pluck(this.normalizeCoordinates(), "googLatLng");

      if(this.options.animate) {
        this.enabledFilters = filters;
        pathCoordinates = _.pluck(this.normalizeCoordinates(), "googLatLng");
        animateRoute(pathCoordinates, this.map);
        return;
      }

      this.line = new gmaps.Polyline({
        path: pathCoordinates,
        geodesic: true,
        strokeColor: '#e21739',
        strokeOpacity: 1,
        strokeWeight: 2
      });

      this.line.setMap(this.map);

    },

    // Remove potentially erroneous points
    normalizeCoordinates: function() {

      var self = this;
      var filtersList = _.keys(self.enabledFilters);

      return _.reduce(filtersList, function(memo, filter) {
        return self.enabledFilters[filter](memo);
      }, self.coordinates);

    },

    playAnimation: function() {

      if (this.line.setMap) {
        this.line.setMap(null);
      }

      this.options.animate = true;
      this.updateRoutes();

    },

    extend: function(a, b) {

      for (var key in b) {
        if (b.hasOwnProperty(key)) {
          a[key] = b[key];
        }
      }
      return a;

    }

  }

  return Route;

});
