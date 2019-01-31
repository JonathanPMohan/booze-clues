import React from 'react';
import { Button } from 'reactstrap';
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
      <div className="locationDetail mx-auto">
        <div className="card4 col-6 mt-3 mx-auto">
          <h1 className="card-header">{singleLocation.name}</h1>
          <div className="card-body">
            <img className="card-img-top" src={singleLocation.imageUrl} alt={singleLocation.name} />
            <h5 className="card-text">{singleLocation.address}</h5>
            <h3 className="card-text">{singleLocation.phoneNumber}</h3>
            <h5><a href={singleLocation.website} target="_blank nonopener noreferrer" >Visit Website</a></h5>
            <Button className="btn btn-light mt-5" id="backToLocations" onClick={this.backToLocationsView}>BACK TO LOCATIONS</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default LocationDetail;
