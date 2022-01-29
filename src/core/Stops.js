import { WWW } from "@nuuuwan/utils-js-dev";
import LatLngUtils from "../base/LatLngUtils.js";

export default class Stops {
  static async getStopsIndex() {
    const url = "/bus_lk_app/data/stops.json";
    const stopsIndexPy = await WWW.json(url);
    return Object.values(stopsIndexPy).reduce(function (stopsIndex, stop) {
      const stopID = stop["stop_id"];
      const name = stop["name"];
      const globalCode = stop["global_code"];
      const latLng = stop["lat_lng"];
      stopsIndex[stopID] = { stopID, name, globalCode, latLng };
      return stopsIndex;
    }, {});
  }

  static async getClosestStops([latOrigin, lngOrigin]) {
    const stopsIndex = await Stops.getStopsIndex();

    function getDistanceToOrigin([lat, lng]) {
      return LatLngUtils.getDistance([latOrigin, lngOrigin], [lat, lng]);
    }

    const stopsWithDistance = Object.values(stopsIndex).map(function (stop) {
      stop.distance = getDistanceToOrigin(stop.latLng);
      return stop;
    });

    return stopsWithDistance.sort(function (a, b) {
      return a.distance - b.distance;
    });
  }
}
