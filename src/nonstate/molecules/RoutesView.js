import * as React from "react";
import List from "@mui/material/List";
import RouteView from "../molecules/RouteView.js";

export default function RoutesView({ routes, stopsIndex, onUpdateLatLng }) {
  return (
    <List>
      {routes.map(function (route, iRoute) {
        return (
          <RouteView
            key={`route-${iRoute}`}
            route={route}
            stopsIndex={stopsIndex}
            onUpdateLatLng={onUpdateLatLng}
          />
        );
      })}
    </List>
  );
}
