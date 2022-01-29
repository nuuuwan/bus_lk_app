import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import StopView from "../molecules/StopView.js";

function StopsViewItem({ stop, stopIDToRouteIDs, onUpdateLatLng }) {
  const onClickInner = function () {
    onUpdateLatLng(stop.latLng);
  };
  return (
    <ListItemButton onClick={onClickInner}>
      <ListItemIcon>
        <DirectionsBusIcon />
      </ListItemIcon>
      <ListItemText>
        <StopView stop={stop} stopIDToRouteIDs={stopIDToRouteIDs} />
      </ListItemText>
    </ListItemButton>
  );
}

export default function StopsView({ stops, stopIDToRouteIDs, onUpdateLatLng }) {
  return (
    <List>
      {stops.map(function (stop, iStop) {
        return (
          <StopsViewItem
            key={`stop-${iStop}`}
            stop={stop}
            stopIDToRouteIDs={stopIDToRouteIDs}
            onUpdateLatLng={onUpdateLatLng}
          />
        );
      })}
    </List>
  );
}
