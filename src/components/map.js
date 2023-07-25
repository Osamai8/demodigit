import React, { useEffect,useState } from "react";
import ReactDOM from "react-dom";
import { compose, withProps } from "recompose";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
} from "react-google-maps";
export const MyMapComponent = ({ lat, lng }) => {
    const MyMap = compose(
        withProps({
            googleMapURL:
                "https://maps.googleapis.com/maps/api/js?key=AIzaSyDS5u-QxPn0Ak3zQqJLAStbb6fdjjygo2Y&v=3.exp&libraries=geometry,drawing,places",
            loadingElement: <div style={{ height: `100%` }} />,
            containerElement: <div style={{ height: `400px` }} />,
            mapElement: <div style={{ height: `100%` }} />
        }),
        withScriptjs,
        withGoogleMap
    )(props => {
        return (
            <GoogleMap defaultZoom={8} defaultCenter={{ lat: parseFloat(lat), lng: parseFloat(lng) }}>
                <Marker position={{ lat: parseFloat(lat), lng: parseFloat(lng) }} />
            </GoogleMap>
        )
    });
    return (<MyMap />)
}
export default MyMapComponent;


