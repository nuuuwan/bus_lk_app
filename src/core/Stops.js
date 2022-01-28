import { WWW } from "@nuuuwan/utils-js-dev";
import LatLngUtils from "../base/LatLngUtils.js";

export default class Stops {
  static async getStopsIndex() {
    const url = "/bus_lk_app/data/stops.json";
    const stopsIndex = await WWW.json(url);
    return stopsIndex;
  }

  static async getClosestStops([latOrigin, lngOrigin]) {
    const stopsIndex = await Stops.getStopsIndex();

    function getDistanceToOrigin([lat, lng]) {
      return LatLngUtils.getDistance([latOrigin, lngOrigin], [lat, lng]);
    }

    const stopsWithDistance = Object.values(stopsIndex).map(function (stop) {
      stop.distance = getDistanceToOrigin(stop["lat_lng"]);
      return stop;
    });

    return stopsWithDistance.sort(function (a, b) {
      return a.distance - b.distance;
    });
  }
}
