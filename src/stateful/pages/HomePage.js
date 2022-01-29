import { Component } from "react";

import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import AirlineStopsIcon from "@mui/icons-material/AirlineStops";
import Paper from "@mui/material/Paper";

import Stops from "../../core/Stops.js";
import Routes from "../../core/Routes.js";
import StopsView from "../../nonstate/molecules/StopsView.js";
import RoutesView from "../../nonstate/molecules/RoutesView.js";
import GeoMap from "../molecules/GeoMap.js";
import StopCircle from "../../nonstate/molecules/StopCircle.js";

const DEFAULT_ZOOM = 18;
const NAVIGATION_PANES = {
  MAP: 0,
  ROUTES: 1,
  STOPS: 2,
};
const N_CLOSEST_STOPS_DISPLAY = 10;

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDataLoaded: false,
      navigationPaneValue: NAVIGATION_PANES.STOPS,
    };
  }

  async componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      this.onGetCurrentPosition.bind(this)
    );
  }

  async onGetCurrentPosition(position) {
    const latLng = [position.coords.latitude, position.coords.longitude];
    // const latLng = [6.9172829187372065, 79.86479515647251]
    const closestStops = await Stops.getClosestStops(latLng);
    const closestStopsDisplay = closestStops.slice(0, N_CLOSEST_STOPS_DISPLAY);
    const routesForStops = await Routes.getRoutesForStops(closestStopsDisplay);
    const stopIDToRouteIDs = await Routes.getStopIDToRouteIDs();

    this.setState({
      latLng,
      closestStops,
      closestStopsDisplay,
      routesForStops,
      stopIDToRouteIDs,
      isDataLoaded: true,
    });
  }

  onChangeBottomNavigation(e, navigationPaneValue) {
    this.setState({ navigationPaneValue });
  }

  renderMap() {
    const { latLng, closestStops } = this.state;
    const [lat, lng] = latLng;
    return (
      <GeoMap center={[lat, lng]} zoom={DEFAULT_ZOOM} className="geo-map">
        {closestStops.map(function (stop, iStop) {
          return <StopCircle key={`stop-circle-${iStop}`} stop={stop} />;
        })}
      </GeoMap>
    );
  }

  renderRoutes() {
    const { routesForStops } = this.state;
    return <RoutesView routes={routesForStops} />;
  }

  renderStops() {
    const { closestStopsDisplay, stopIDToRouteIDs } = this.state;
    return (
      <StopsView
        stops={closestStopsDisplay}
        stopIDToRouteIDs={stopIDToRouteIDs}
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
      case NAVIGATION_PANES.STOPS:
        return this.renderStops();
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
        {this.renderInner()}
        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
          elevation={3}
        >
          <BottomNavigation
            showLabels
            onChange={this.onChangeBottomNavigation.bind(this)}
            value={navigationPaneValue}
          >
            <BottomNavigationAction label="Map" icon={<LocationOnIcon />} />
            <BottomNavigationAction
              label="Routes"
              icon={<DirectionsBusIcon />}
            />
            <BottomNavigationAction label="Stops" icon={<AirlineStopsIcon />} />
          </BottomNavigation>
        </Paper>
      </Box>
    );
  }
}
