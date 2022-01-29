import { Component } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  useMapEvents,
} from "react-leaflet";
import STYLES from "../../Styles.js";
import "./GeoMap.css";

const URL_FORMAT = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

function EventComponent(props) {
  useMapEvents({
    moveend: (e) => {
      props.onMoveEnd(e);
    },
  });
  return null;
}

export default class GeoMap extends Component {
  render() {
    const { center, zoom, onMoveEnd } = this.props;
    return (
      <MapContainer center={center} zoom={zoom} zoomControl={false}>
        <TileLayer url={URL_FORMAT} />
        <EventComponent onMoveEnd={onMoveEnd} />

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
