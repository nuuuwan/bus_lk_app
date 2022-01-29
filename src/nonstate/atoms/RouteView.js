import * as React from "react";
import Typography from "@mui/material/Typography";
import Distance from "../atoms/Distance.js";

function formatDirection(routeDirection) {
  switch (routeDirection) {
    case "N":
      return "Northbound";
    case "S":
      return "Southbound";
    case "E":
      return "Eastbound";
    case "W":
      return "Westbound";
    default:
      return undefined;
  }
}

function getColor(routeNumber) {
  const routeNumberPrefix = parseInt(routeNumber.substring(0, 2));
  switch (routeNumberPrefix) {
    case 12:
      return "red";
    case 13:
      return "orange";
    case 14:
      return "blue";
    case 15:
      return "brown";
    case 16:
      return "purple";
    case 17:
      return "green";
    default:
      return "gray";
  }
}

export default function Route({ route }) {
  const routeID = route.routeID;
  const routeNumber = routeID.substring(0, 3);
  const routeDirection = routeID.substring(4, 5);
  const formattedDirection = formatDirection(routeDirection);

  const color = getColor(routeNumber);

  return (
    <>
      <Typography variant="h6" component="span" sx={{ color }}>
        {routeNumber}
      </Typography>
      <Typography variant="caption" component="span">
        {" " + formattedDirection}
      </Typography>
      <br />
      <Typography variant="subtitle" component="span">
        {route.stopName}
      </Typography>
      <br />
      <Typography variant="subtitle2" component="span">
        <Distance distanceKM={route.distance} />
      </Typography>
    </>
  );
}
