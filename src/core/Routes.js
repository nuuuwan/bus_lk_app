import { WWW } from "@nuuuwan/utils-js-dev";

const ROUTE_IDS = [
  "100-S",
  "103-S",
  "120-S",
  "125-S",
  "135-S",
  "138-S",
  "140-S",
  "154-S",
  "155-S",
  "163-S",
  "166-S",
  "168-S",
  "176-S",
  "177-W",
  "193-S",
];

export default class Routes {
  static async getRouteStopIDs() {
    return await Promise.all(
      ROUTE_IDS.map(async function (routeID) {
        const url = `/bus_lk_app/data/routes/${routeID}.json`;
        return await WWW.json(url);
      })
    );
  }

  static async getRoutesIndex() {
    const routeStopIDs = await Routes.getRouteStopIDs();
    return ROUTE_IDS.reduce(function (routeIndex, routeID, iRoute) {
      routeIndex[routeID] = routeStopIDs[iRoute];
      return routeIndex;
    }, {});
  }

  static async getRoutesForStops(searchStops) {
    const routeIndex = await Routes.getRoutesIndex();
    var routeIDSet = new Set();
    return searchStops.reduce(function (routesForStops, searchStop) {
      const searchStopID = searchStop.stop_id;
      for (var [routeID, routeStopIDs] of Object.entries(routeIndex)) {
        if (routeIDSet.has(routeID)) {
          continue;
        }
        if (routeStopIDs.includes(searchStopID)) {
          routesForStops.push({
            routeID,
            stopID: searchStopID,
            stopName: searchStop.name,
            stopLatLng: searchStop.lat_lng,
            distance: searchStop.distance,
          });
          routeIDSet.add(routeID);
        }
      }
      return routesForStops;
    }, []);
  }

  static async getStopIDToRouteIDs(stopID) {
    const routeIndex = await Routes.getRoutesIndex();
    return Object.entries(routeIndex).reduce(function (
      stopIDToRouteIDs,
      [routeID, routeStopIDs]
    ) {
      return routeStopIDs.reduce(function (stopIDToRouteIDs, stopID) {
        if (!stopIDToRouteIDs[stopID]) {
          stopIDToRouteIDs[stopID] = [];
        }
        stopIDToRouteIDs[stopID].push(routeID);
        return stopIDToRouteIDs;
      }, stopIDToRouteIDs);
    },
    {});
  }
}
