import { useState, useEffect } from "react";
import { loadModules } from "esri-loader";

export const BermudaTriangle = ({ lat, lng }) => {
  const [graphic, setGraphic] = useState(null);
  useEffect(() => {
    loadModules([
      "esri/Map",
      "esri/views/MapView",
      "esri/Graphic",
      "esri/layers/GraphicsLayer",
    ]).then(([Map, MapView, Graphic, GraphicsLayer]) => {
      const map = new Map({
        basemap: "gray-vector",
      });
      let view = new MapView({
        container: "viewDiv",
        map: map,
        zoom: 13,
        center: [lng, lat], // Long, Lat
      });
      view.when(() => {
        // Marker: start
        const graphicsLayer = new GraphicsLayer();
        map.add(graphicsLayer);
        const point = {
          //Create a point
          type: "point",
          longitude: lng,
          latitude: lat,
        };
        const simpleMarkerSymbol = {
          type: "simple-marker",
          color: [226, 119, 40], // Orange
          outline: {
            color: [255, 255, 255], // White
            width: 1,
          },
        };
        const pointGraphic = new Graphic({
          geometry: point,
          symbol: simpleMarkerSymbol,
        });
        graphicsLayer.add(pointGraphic);
        // Marker: End
      });
    });
  }, []);
  return <></>;
};
