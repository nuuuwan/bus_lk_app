const MAX_CLOSEST_STOPS = 10;

function Distance({ distanceKM }) {
  if (distanceKM < 1) {
    const distanceM = distanceKM * 1_000;
    return <span>{distanceM.toFixed(0)}m</span>;
  } else if (distanceKM < 10) {
    return <span>{distanceKM.toFixed(1)}km</span>;
  }
  return <span>{distanceKM.toFixed(0)}km</span>;
}

export default function ClosestStopsView({ closestStops }) {
  return (
    <ul>
      {closestStops.slice(0, MAX_CLOSEST_STOPS).map(function (stop, iStop) {
        return (
          <li key={`stop-${iStop}`}>
            {stop.name} (<Distance distanceKM={stop.distance} />)
          </li>
        );
      })}
    </ul>
  );
}
