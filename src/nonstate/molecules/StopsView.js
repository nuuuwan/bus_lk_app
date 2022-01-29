import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AirlineStopsIcon from "@mui/icons-material/AirlineStops";
import StopView from "../molecules/StopView.js";

function StopsViewItem({ stop, stopIDToRouteIDs }) {
  return (
    <ListItemButton>
      <ListItemIcon>
        <AirlineStopsIcon />
      </ListItemIcon>
      <ListItemText>
        <StopView stop={stop} stopIDToRouteIDs={stopIDToRouteIDs} />
      </ListItemText>
    </ListItemButton>
  );
}

export default function StopsView({ stops, stopIDToRouteIDs }) {
  return (
    <List>
      {stops.map(function (stop, iStop) {
        return (
          <StopsViewItem
            key={`stop-${iStop}`}
            stop={stop}
            stopIDToRouteIDs={stopIDToRouteIDs}
          />
        );
      })}
    </List>
  );
}
