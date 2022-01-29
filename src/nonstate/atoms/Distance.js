import Typography from "@mui/material/Typography";
const WALKING_SPEED_KMPH = 4.5;
const MIN_IN_HOUR = 60;

function getDistanceText(distanceKM) {
  if (distanceKM < 1) {
    const distanceM = Math.round(distanceKM * 1_00, 0) * 10;
    return `${distanceM.toFixed(0)} m`;
  } else if (distanceKM < 10) {
    return `${distanceKM.toFixed(1)} km`;
  }
  return `${distanceKM.toFixed(0)} km`;
}

function DistanceOnly({ distanceKM }) {
  const distanceText = getDistanceText(distanceKM);
  return (
    <Typography variant="subtitle2" component="span" sx={{ color: "gray" }}>
      {distanceText}
    </Typography>
  );
}

function WalkingTimeOnly({ distanceKM }) {
  const walkingTimeMin = Math.ceil(
    (distanceKM * MIN_IN_HOUR) / WALKING_SPEED_KMPH
  );
  return (
    <Typography variant="subtitle2" component="span">
      {walkingTimeMin} min walk
    </Typography>
  );
}

export default function Distance({ distanceKM }) {
  return (
    <>
      <DistanceOnly distanceKM={distanceKM} />
      {" · "}
      <WalkingTimeOnly distanceKM={distanceKM} />
    </>
  );
}
