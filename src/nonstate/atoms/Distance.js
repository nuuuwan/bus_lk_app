export default function Distance({ distanceKM }) {
  if (distanceKM < 1) {
    const distanceM = Math.round(distanceKM * 1_00, 0) * 10;
    return <span>{distanceM.toFixed(0)}m</span>;
  } else if (distanceKM < 10) {
    return <span>{distanceKM.toFixed(1)}km</span>;
  }
  return <span>{distanceKM.toFixed(0)}km</span>;
}
