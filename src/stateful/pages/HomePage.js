import { Component } from "react";

import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import AirlineStopsIcon from '@mui/icons-material/AirlineStops';

import Stops from "../../core/Stops.js";
import ClosestStopsView from "../../nonstate/molecules/ClosestStopsView.js";
import GeoMap from "../molecules/GeoMap.js";
import StopCircle from "../../nonstate/molecules/StopCircle.js";

import "./HomePage.css";

const DEFAULT_ZOOM = 18;
const NAVIGATION_PANES = {
  MAP: 0,
  BUSES: 1,
  STOPS: 2,
};

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latLng: undefined,
      closestStops: undefined,
      isDataLoaded: false,
      navigationPaneValue: NAVIGATION_PANES.MAP,
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

    this.setState({ latLng, closestStops, isDataLoaded: true });
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

  renderInner() {
    const { navigationPaneValue } = this.state;

    if (navigationPaneValue === NAVIGATION_PANES.MAP) {
      return this.renderMap();
    }
    return null;
  }

  render() {
    const { latLng, closestStops, isDataLoaded, navigationPaneValue } =
      this.state;
    if (!isDataLoaded) {
      return "Loading...";
    }

    return (
      <div>
        <div className="div-fixed-pane">
          <BottomNavigation
            showLabels
            onChange={this.onChangeBottomNavigation.bind(this)}
            value={navigationPaneValue}
          >
            <BottomNavigationAction label="Map" icon={<LocationOnIcon />} />
            <BottomNavigationAction
              label="Buses"
              icon={<DirectionsBusIcon />}
            />
            <BottomNavigationAction
              label="Stops"
              icon={<AirlineStopsIcon />}
            />

          </BottomNavigation>
        </div>

        {this.renderInner()}
      </div>
    );
  }
}
