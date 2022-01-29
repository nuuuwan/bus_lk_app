import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import StopView from "../molecules/StopView.js";

function StopsViewItem({ stop }) {
  return (
    <ListItemButton>
      <ListItemIcon>
        <DirectionsBusIcon />
      </ListItemIcon>
      <ListItemText>
        <StopView stop={stop} />
      </ListItemText>
    </ListItemButton>
  );
}

export default function StopsView({ stops }) {
  return (
    <List>
      {stops.map(function (stop, iStop) {
        return <StopsViewItem key={`stop-${iStop}`} stop={stop} />;
      })}
    </List>
  );
}
