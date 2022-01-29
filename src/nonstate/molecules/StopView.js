import * as React from "react";
import Typography from "@mui/material/Typography";
import Distance from "../atoms/Distance.js";

export default function StopView({ stop }) {
  return (
    <>
      <Typography variant="h6" component="span">
        {stop.name}
      </Typography>
      <br />
      <Typography variant="subtitle2" component="span">
        <Distance distanceKM={stop.distance} />
      </Typography>
    </>
  );
}
