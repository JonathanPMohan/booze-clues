import React from 'react';
import { Button } from 'reactstrap';
import locationsData from '../../../helpers/data/locationsData';
import authRequests from '../../../helpers/data/authRequests';
import PrintLocationCard from '../../PrintLocationCard/PrintLocationCard';

import './Locations.scss';

class Locations extends React.Component {
  state = {
    locations: [],
  }

  getLocations = () => {
    const uid = authRequests.getCurrentUid();
    locationsData.getAllLocations(uid)
      .then((locations) => {
        this.setState({ locations });
      })
      .catch((err) => {
        console.error('error with locations GET', err);
      });
  };

  componentDidMount() {
    this.getLocations();
  }

  newLocationView = () => {
    this.props.history.push('/locations/new');
  }

  render() {
    const printLocation = this.state.locations.map(location => (
      <PrintLocationCard
        key={location.id}
        location={location}
      />
    ));

    return (
      <div className='locations mx-auto'>
        <h2>Searching For A Location?</h2>
        <Button className="btn btn-info mt-5" id="addLocation" onClick={this.newLocationView}>Add Location</Button>
        <div className="row justify-content-center">{printLocation}</div>
      </div>
    );
  }
}

export default Locations;
