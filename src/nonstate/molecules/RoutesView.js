import Distance from "../atoms/Distance.js";
export default function RoutesView({ routes }) {
  return (
    <ul>
      {routes.map(function (route, iRoute) {
        return (
          <li key={`route-${iRoute}`}>
            {route.routeID} (<Distance distanceKM={route.distance} />)
          </li>
        );
      })}
    </ul>
  );
}
