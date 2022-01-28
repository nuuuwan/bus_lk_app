import { CircleMarker } from "react-leaflet";
const DEFAULT_CIRLE_RADIUS = 10;
export default function StopCircle({ stop }) {
  return (
    <CircleMarker
      center={stop.lat_lng}
      radius={DEFAULT_CIRLE_RADIUS}
      pathOptions={{ color: "red", stroke: null, fillOpacity: 0.5 }}
    />
  );
}
