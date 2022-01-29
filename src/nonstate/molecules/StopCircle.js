import { CircleMarker } from "react-leaflet";
import STYLES from "../../Styles.js";

export default function StopCircle({ stop }) {
  return (
    <CircleMarker
      center={stop.latLng}
      radius={STYLES.stopCircle.radius}
      pathOptions={STYLES.stopCircle}
    />
  );
}
