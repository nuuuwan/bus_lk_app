import { Component } from "react";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { latLng: undefined };
  }

  onGetCurrentPosition(position) {
    const latLng = [position.coords.latitude, position.coords.longitude];
    this.setState({ latLng });
  }

  async componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      this.onGetCurrentPosition.bind(this)
    );
  }
  
  render() {
    const { latLng } = this.state;
    if (!latLng) {
      return "Loading...";
    }
    return (
      <div>
        <h1>Bus App</h1>
        <div>{latLng}</div>
      </div>
    );
  }
}
