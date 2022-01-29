import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import RouteView from "../atoms/RouteView.js";

function RoutesViewItem({ route }) {
  return (
    <ListItemButton>
      <ListItemIcon>
        <DirectionsBusIcon />
      </ListItemIcon>
      <ListItemText>
        <RouteView route={route} />
      </ListItemText>
    </ListItemButton>
  );
}

export default function RoutesView({ routes }) {
  return (
    <List>
      {routes.map(function (route, iRoute) {
        return <RoutesViewItem key={`route-${iRoute}`} route={route} />;
      })}
    </List>
  );
}
