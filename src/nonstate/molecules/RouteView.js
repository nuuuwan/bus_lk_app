import * as React from "react";
import Typography from "@mui/material/Typography";
import Distance from "../atoms/Distance.js";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MultipleStopIcon from "@mui/icons-material/MultipleStop";
import RouteIDView from "../molecules/RouteIDView.js";

const MAX_WALKING_DISTAICE = 1.1;

export default function RouteView({ route, onUpdateLatLng }) {
  const onClick = function () {
    onUpdateLatLng(route.stopLatLng);
  };

  const opacity = (route.distance <= MAX_WALKING_DISTAICE) ? 1 : 0.5;

  return (
    <ListItemButton onClick={onClick} sx={{opacity}}>
      <ListItemIcon>
        <MultipleStopIcon />
      </ListItemIcon>
      <ListItemText>
        <RouteIDView routeID={route.routeID} />
        <br />
        <Typography variant="subtitle" component="span">
          {route.stopName}
        </Typography>
        <br />
        <Distance distanceKM={route.distance} />
      </ListItemText>
    </ListItemButton>
  );
}
