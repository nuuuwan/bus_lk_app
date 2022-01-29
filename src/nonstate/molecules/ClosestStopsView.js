import Distance from "../atoms/Distance.js";
export default function ClosestStopsView({ closestStops }) {
  return (
    <ul>
      {closestStops.map(function (stop, iStop) {
        return (
          <li key={`stop-${iStop}`}>
            {stop.name} (<Distance distanceKM={stop.distance} />)
          </li>
        );
      })}
    </ul>
  );
}
