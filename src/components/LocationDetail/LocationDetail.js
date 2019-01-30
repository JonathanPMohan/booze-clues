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
      <div className="clueDetail mx-auto">
        <Button className="btn btn-success mt-5" id="backToLocations" onClick={this.backToLocationsView}>Back To Clues</Button>
        <div className="card col-6 mt-3 mx-auto">
          <h5 className="card-header">{singleLocation.name}</h5>
          <div className="card-body">
            <img className="card-img-top" src={singleLocation.imageUrl} alt={singleLocation.name} />
            <p className="card-text">{singleLocation.address}</p>
            <p className="card-text">{singleLocation.phoneNumber}</p>
            <p className="card-text">{singleLocation.website}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default LocationDetail;
