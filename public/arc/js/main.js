require([
  'esri/Map',
  'esri/layers/FeatureLayer',
  'esri/views/MapView',
], function(Map, FeatureLayer, MapView) {
  const map = new Map({
    basemap: 'gray-vector',
  });
  view = new MapView({
    container: 'viewDiv',
    map: map,
    zoom: 10,
    center: [25.850677, 84.87324], // Long, Lat
  });
  let stateLayer = new FeatureLayer({
    url:
      'https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space_styled/FeatureServer/0',
  });
  view.when(() => {
    map.add(stateLayer);
  });
  function addLayer(url) {
    map.add(
      new FeatureLayer({
        url: url,
      }),
    );
  }
});
