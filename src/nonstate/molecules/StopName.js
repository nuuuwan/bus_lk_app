import Typography from "@mui/material/Typography";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";

export default function StopName({ stopName, size, prefix }) {
  stopName = stopName.replace(" Bus Stop", "");
  stopName = stopName.replace(" Bus Station", "");

  return (
    <Typography component="div" sx={{ fontSize: size }}>
      {prefix}
      <DirectionsBusIcon sx={{ height: size }} />
      {stopName}
    </Typography>
  );
}
