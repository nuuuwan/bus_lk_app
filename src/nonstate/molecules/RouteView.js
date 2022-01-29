import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MultipleStopIcon from "@mui/icons-material/MultipleStop";

import RouteIDView from "../molecules/RouteIDView.js";
import Distance from "../atoms/Distance.js";
import StopName from "../molecules/StopName.js";

const MAX_WALKING_DISTAICE = 1.1;

export default function RouteView({ route, stopsIndex, onUpdateLatLng }) {
  const onClick = function () {
    onUpdateLatLng(route.closestStopLatLng);
  };

  const opacity = route.distance <= MAX_WALKING_DISTAICE ? 1 : 0.5;

  const nStops = route.routeStopIDs.length;
  const lastStopID = route.routeStopIDs[nStops - 1];
  const lastStopName = stopsIndex[lastStopID].name;

  return (
    <ListItemButton onClick={onClick} sx={{ opacity }}>
      <ListItemIcon>
        <MultipleStopIcon />
      </ListItemIcon>
      <ListItemText>
        <RouteIDView routeID={route.routeID} />
        <StopName stopName={lastStopName} size={12} prefix="to" />
        <StopName stopName={route.closestStopName} size={20} prefix="" />

        <Distance distanceKM={route.distance} />
      </ListItemText>
    </ListItemButton>
  );
}
