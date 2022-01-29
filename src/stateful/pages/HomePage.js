import { Component } from "react";

import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MultipleStopIcon from "@mui/icons-material/MultipleStop";
import Paper from "@mui/material/Paper";

import Stops from "../../core/Stops.js";
import Routes from "../../core/Routes.js";
import RoutesView from "../../nonstate/molecules/RoutesView.js";
import GeoMap from "../molecules/GeoMap.js";
import StopCircle from "../../nonstate/molecules/StopCircle.js";

const DEFAULT_ZOOM = 16;
const NAVIGATION_PANES = {
  MAP: 0,
  ROUTES: 1,
};

// function getRandomGeoLocation() {
//   function getRandomQ() {
//     return Math.random() * 2 - 1;
//   }
//
//   const [lat0, lng0] = [6.896756840487376, 79.87675917795639];
//   const [dLat, dLng] = [getRandomQ() * 0.06, getRandomQ() * 0.01];
//   return [lat0 + dLat, lng0 + dLng];
// }

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDataLoaded: false,
      navigationPaneValue: NAVIGATION_PANES.MAP,
    };
  }

  async componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      this.onGetCurrentPosition.bind(this)
    );
  }

  async updateMapPosition(latLng, zoom) {
    const closestStops = await Stops.getClosestStops(latLng);
    const stopsIndex = await Stops.getStopsIndex();
    const routesForStops = await Routes.getRoutesForStops(closestStops);
    const stopIDToRouteIDs = await Routes.getStopIDToRouteIDs();

    this.setState({
      zoom,
      latLng,
      closestStops,
      stopsIndex,
      routesForStops,
      stopIDToRouteIDs,
      isDataLoaded: true,
      navigationPaneValue: NAVIGATION_PANES.MAP,
    });
  }

  async onUpdateLatLng(latLng) {
    await this.updateMapPosition(latLng, DEFAULT_ZOOM);
  }

  async onGetCurrentPosition(position) {
    const latLng = [position.coords.latitude, position.coords.longitude];
    const zoom = DEFAULT_ZOOM;
    await this.updateMapPosition(latLng, zoom);
  }

  async onMoveEnd(e) {
    const latLngObj = e.target.getCenter();
    const latLng = [latLngObj.lat, latLngObj.lng];
    const zoom = e.target.getZoom();
    await this.updateMapPosition(latLng, zoom);
  }

  onChangeBottomNavigation(e, navigationPaneValue) {
    this.setState({ navigationPaneValue });
  }

  renderMap() {
    const { latLng, closestStops } = this.state;
    const [lat, lng] = latLng;
    return (
      <GeoMap
        center={[lat, lng]}
        zoom={DEFAULT_ZOOM}
        onMoveEnd={this.onMoveEnd.bind(this)}
      >
        {closestStops.map(function (stop, iStop) {
          return <StopCircle key={`stop-circle-${iStop}`} stop={stop} />;
        })}
      </GeoMap>
    );
  }

  renderRoutes() {
    const { routesForStops, stopsIndex } = this.state;
    return (
      <RoutesView
        routes={routesForStops}
        stopsIndex={stopsIndex}
        onUpdateLatLng={this.onUpdateLatLng.bind(this)}
      />
    );
  }

  renderInner() {
    const { navigationPaneValue } = this.state;

    switch (navigationPaneValue) {
      case NAVIGATION_PANES.MAP:
        return this.renderMap();
      case NAVIGATION_PANES.ROUTES:
        return this.renderRoutes();
      default:
        return null;
    }
  }

  render() {
    const { isDataLoaded, navigationPaneValue } = this.state;
    if (!isDataLoaded) {
      return "Loading...";
    }

    return (
      <Box>
        <Box sx={{ paddingBottom: 10 }} elevation={2}>
          {this.renderInner()}
        </Box>
        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0, height: 60 }}
          elevation={1}
        >
          <BottomNavigation
            showLabels
            onChange={this.onChangeBottomNavigation.bind(this)}
            value={navigationPaneValue}
          >
            <BottomNavigationAction label="Map" icon={<LocationOnIcon />} />
            <BottomNavigationAction
              label="Routes"
              icon={<MultipleStopIcon />}
            />
          </BottomNavigation>
        </Paper>
      </Box>
    );
  }
}
