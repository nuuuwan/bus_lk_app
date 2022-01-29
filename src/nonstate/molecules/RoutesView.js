import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MultipleStopIcon from "@mui/icons-material/MultipleStop";
import RouteView from "../molecules/RouteView.js";

function RoutesViewItem({ route, onUpdateLatLng }) {
  const onClickInner = function () {
    onUpdateLatLng(route.stopLatLng);
  };

  return (
    <ListItemButton onClick={onClickInner}>
      <ListItemIcon>
        <MultipleStopIcon />
      </ListItemIcon>
      <ListItemText>
        <RouteView route={route} />
      </ListItemText>
    </ListItemButton>
  );
}

export default function RoutesView({ routes, onUpdateLatLng }) {
  return (
    <List>
      {routes.map(function (route, iRoute) {
        return (
          <RoutesViewItem
            key={`route-${iRoute}`}
            route={route}
            onUpdateLatLng={onUpdateLatLng}
          />
        );
      })}
    </List>
  );
}
