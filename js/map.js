$(function() {
  // Initialize map
  var map = L.map('map');

  // Define markers style
  var marker = {
    icon: L.icon({
      iconUrl: 'img/icon.png',
      iconSize: [50, 50]
    })
  };

  // Create GeoJSON layer
  var featuresLayer = L.geoJson(null, {
    pointToLayer: function (feature, latlng) {
      return L.marker(latlng, marker);
    },
    onEachFeature: onEachFeature
  }).addTo(map);

  // Create info control
  var info = L.control();
  info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info-control');
    return this._div;
  };
  info.update = function (feature) {
    if (feature) {
      var value = feature.properties.done + feature.properties.validated;
      $(this._div).empty();
      $(this._div).append(
        $('<p></p>')
          .append('#' + feature.id + ' - ' + feature.properties.name)
      );
      $(this._div).append(
        $('<div class="progress"></div>')
          .append(
            $('<div class="progress-bar" role="progressbar"></div>')
              .attr('aria-valuenow', value)
              .css('width', value + '%')
              .append(value + '%')
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
    }
  };
  info.addTo(map);

  // Create base layer
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Update info control
  function updateInfo(e) {
    info.update(e.target.feature);
    $(info._container).show();
  }
  function onEachFeature(feature, layer) {
    layer.on({
      mouseover: updateInfo,
      click: updateInfo
    });
  }

  // Add projects to features layer
  function addProjects (data) {
    $.each(data.features, function (key, project) {
      $.getJSON("http://tasks.hotosm.org/project/" + project.id + ".json", function (projectData) {
        project.properties = projectData.properties;
        featuresLayer.addData(project);
        map.fitBounds(featuresLayer.getBounds(), {padding: [5, 5]});
      });
    });
  }
  $.getJSON("tasks.geojson", addProjects);

  // Hide zoom control
  $(".leaflet-control-zoom").css("visibility", "hidden");
});
