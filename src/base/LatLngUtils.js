var EARTH_RADIUS_KM = 6371;

export default class LatLngUtils {
  static toRadians(valueDegrees) {
    return (valueDegrees * Math.PI) / 180;
  }

  static getDistance([latDeg1, lngDeg1], [latDeg2, lngDeg2]) {
    const [dLat, dLng] = [
      LatLngUtils.toRadians(latDeg2 - latDeg1),
      LatLngUtils.toRadians(lngDeg2 - lngDeg1),
    ];
    const [lat1, lat2] = [
      LatLngUtils.toRadians(latDeg1),
      LatLngUtils.toRadians(latDeg2),
    ];

    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = EARTH_RADIUS_KM * c;
    return d;
  }
}
