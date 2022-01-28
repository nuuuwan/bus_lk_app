import { Component } from "react";
import Stops from "../../core/Stops.js";
import ClosestStopsView from "../../nonstate/molecules/ClosestStopsView.js";
import GeoMap from "../molecules/GeoMap.js";

import "./HomePage.css";

const DEFAULT_ZOOM = 18;

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latLng: undefined,
      closestStops: undefined,
      isDataLoaded: false,
    };
  }

  async onGetCurrentPosition(position) {
    const latLng = [position.coords.latitude, position.coords.longitude];

    const closestStops = await Stops.getClosestStops(latLng);

    this.setState({ latLng, closestStops, isDataLoaded: true });
  }

  async componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      this.onGetCurrentPosition.bind(this)
    );
  }

  render() {
    const { latLng, closestStops, isDataLoaded } = this.state;
    if (!isDataLoaded) {
      return "Loading...";
    }
    const [lat, lng] = latLng;
    const [latDisplay, lngDisplay] = [lat, lng].map((x) => x.toFixed(6));
    return (
      <div>
        <div className="div-main-pane">
          <h1>Bus App</h1>
          <div>
            Location: ({latDisplay}N, {lngDisplay}E)
          </div>
          <ClosestStopsView closestStops={closestStops} />
        </div>

        <GeoMap center={[lat, lng]} zoom={DEFAULT_ZOOM} />
      </div>
    );
  }
}
