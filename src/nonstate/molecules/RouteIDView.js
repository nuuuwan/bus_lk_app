import Typography from "@mui/material/Typography";

function getColor(routeNumber) {
  const routeNumberPrefix = parseInt(routeNumber.substring(0, 2));
  switch (routeNumberPrefix) {
    case 12:
      return "red";
    case 13:
      return "orange";
    case 14:
      return "blue";
    case 15:
      return "brown";
    case 16:
      return "purple";
    case 17:
      return "green";
    default:
      return "gray";
  }
}

export default function RouteIDView({ routeID, shortFormat }) {
  const routeNumber = routeID.substring(0, 3);
  const color = getColor(routeNumber);

  return (
    <>
      <Typography variant="h6" component="span" sx={{ color }}>
        {routeNumber}
      </Typography>
    </>
  );
}
