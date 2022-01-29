import * as React from "react";
import Typography from "@mui/material/Typography";
import Distance from "../atoms/Distance.js";
import RouteIDView from "../molecules/RouteIDView.js";

export default function StopView({ stop, stopIDToRouteIDs }) {
  const stopID = stop.stop_id;
  const routeIDs = stopIDToRouteIDs[stopID] || [];

  return (
    <>
      <Typography variant="h6" component="span">
        {stop.name}
      </Typography>
      <br />
      <Typography variant="subtitle2" component="span">
        {routeIDs.map(function (routeID) {
          const key = `route-id-view-${stopID}-${routeID}`;
          return <RouteIDView key={key} routeID={routeID} shortFormat />;
        })}
      </Typography>
      <br />
      <Distance distanceKM={stop.distance} />
    </>
  );
}
