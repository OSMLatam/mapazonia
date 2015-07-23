$(function() {
  // Initialize map
  var map = L.map('map');

  // Create info control
  var info = L.control();
  info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info-control');
    return this._div;
  };
  info.update = function (feature) {
    if (feature) {
      $(this._div).empty();
      $(this._div).append(
        $('<p></p>')
          .append('#' + feature.id + ' - ' + feature.properties.name)
      );
      $(this._div).append(
        $('<div class="progress"></div>')
          .append(
            $('<div class="progress-bar" role="progressbar"></div>')
              .attr('aria-valuenow', feature.properties.status)
              .css('width', feature.properties.status + '%')
              .append(feature.properties.status + '%')
          )
      );
      $(this._div).append(
        $('<div></div>')
          .append($('<a target="_blank"></a>')
            .attr('href', 'http://tasks.hotosm.org/project/' +  feature.id)
            .append($.t("tasks.details"))
            .append(' <i class="fa fa-share"></i>')
          )
          .css('text-align', 'right')
      );
    };
  };
  info.addTo(map);

  // Define markers style
  var marker = {
    icon: L.icon({
      iconUrl: 'img/icon.png',
      iconSize: [50, 50]
    })
  };

  // Create base layer
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);


  // Update info control
  function updateInfo(e) {
    info.update(e.target.feature);
    $(info._container).show();
  };
  function onEachFeature(feature, layer) {
    layer.on({
      mouseover: updateInfo,
      click: updateInfo
    });
  }

  // Create features layer
  function createFeaturesLayer (data) {
    featuresLayer = L.geoJson(data, {
      pointToLayer: function (feature, latlng) {
        return L.marker(latlng, marker);
      },
      onEachFeature: onEachFeature
    }).addTo(map);
    map.fitBounds(featuresLayer.getBounds(), {padding: [5, 5]});
  };
  $.getJSON("tasks.geojson", createFeaturesLayer);

  // Hide zoom control
  $(".leaflet-control-zoom").css("visibility", "hidden");
});
