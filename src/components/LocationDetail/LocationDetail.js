import React from 'react';
import locationsData from '../../helpers/data/locationsData';
import './LocationDetail.scss';

class LocationDetail extends React.Component {
  state = {
    singleLocation: [],
  }

  backToLocationsView = (e) => {
    this.props.history.push('/locations');
  }

  componentDidMount() {
    const firebaseId = this.props.match.params.id;
    locationsData.getSingleLocation(firebaseId)
      .then((singleLocation) => {
        this.setState({ singleLocation });
      });
  }

  render() {
    const {
      singleLocation,
    } = this.state;

    return (
      <div className="locationDetail mx-auto w-75">
        <div className="col-9 mt-3 mx-auto">
          <h1 className="card-header">{singleLocation.name}</h1>
          <div className="card-body">
            <img className="locationImage" src={singleLocation.imageUrl} alt={singleLocation.name} />
            <h5 className="card-text">{singleLocation.address}</h5>
            <h3 className="card-text">{singleLocation.phoneNumber}</h3>
            <h5><a href={singleLocation.website} target="_blank nonopener noreferrer" >Visit Website</a></h5>
            <div className="backToLocations svg-wrapper" onClick={this.backToLocationsView}>
              <svg height="60" width="150" xmlns="http://www.w3.org/2000/svg">
                <rect id="shape" height="30" width="150" />
              </svg>
              <div id="text">
                <span className="spot">BACK TO LIST</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LocationDetail;
