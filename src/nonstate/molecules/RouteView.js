import * as React from "react";
import Typography from "@mui/material/Typography";
import Distance from "../atoms/Distance.js";
import RouteIDView from "../molecules/RouteIDView.js";

export default function RouteView({ route }) {
  return (
    <>
      <RouteIDView routeID={route.routeID} />
      <br />
      <Typography variant="subtitle" component="span">
        {route.stopName}
      </Typography>
      <br />
      <Distance distanceKM={route.distance} />
    </>
  );
}
