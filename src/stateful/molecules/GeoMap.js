import { Component } from "react";
import { MapContainer, TileLayer, CircleMarker } from "react-leaflet";
import STYLES from "../../Styles.js";
import "./GeoMap.css";

const URL_FORMAT = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

export default class GeoMap extends Component {
  render() {
    const { center, zoom } = this.props;
    return (
      <MapContainer center={center} zoom={zoom} zoomControl={false}>
        <TileLayer url={URL_FORMAT} />
        {this.props.children}
        <CircleMarker
          center={center}
          radius={STYLES.centerCircle.radius}
          pathOptions={STYLES.centerCircle}
        />
      </MapContainer>
    );
  }
}