import React from 'react';
import { Button } from 'reactstrap';
import SearchField from 'react-search-field';
import locationsData from '../../../helpers/data/locationsData';
import authRequests from '../../../helpers/data/authRequests';
import PrintLocationCard from '../../PrintLocationCard/PrintLocationCard';

import './Locations.scss';

class Locations extends React.Component {
  state = {
    locations: [],
    filteredLocations: [],
  }

  getLocations = () => {
    const uid = authRequests.getCurrentUid();
    locationsData.getAllLocations(uid)
      .then((locations) => {
        this.setState({ locations });
        this.setState({ filteredLocations: locations });
      })
      .catch((err) => {
        console.error('error with locations GET', err);
      });
  };

  componentDidMount() {
    this.getLocations();
  }

  deleteSingleLocation = (locationId) => {
    locationsData.deleteLocation(locationId)
      .then(() => {
        this.getLocations();
      });
  }

  passLocationToEdit = (locationId) => {
    this.setState({ editId: locationId });
    this.props.history.push(`/locations/${locationId}/edit`);
  }

  onChange = (value, event) => {
    const { locations } = this.state;
    const filteredLocations = [];
    event.preventDefault();
    if (!value) {
      this.setState({ filteredLocations: locations });
    } else {
      locations.forEach((location) => {
        if (location.name.toLowerCase().includes(value.toLowerCase())
          || location.address.toLowerCase().includes(value.toLowerCase())) {
          filteredLocations.push(location);
        }
        this.setState({ filteredLocations });
      });
    }
  }

  newLocationView = () => {
    this.props.history.push('/locations/new');
  }

  onSelect = (locationId) => {
    this.props.history.push(`/locations/${locationId}`);
  }

  render() {
    const { filteredLocations } = this.state;

    const printLocation = filteredLocations.map(location => (
      <PrintLocationCard
        key={location.id}
        location={location}
        deleteSingleLocation={this.deleteSingleLocation}
        passLocationToEdit={this.passLocationToEdit}
        onSelect={this.onSelect}
      />
    ));

    return (
      <div className='locations mx-auto'>
        <h2>Searching For A Location?</h2>
        <SearchField
          placeholder="Search Locations By Name or Address"
          onChange={this.onChange}
          searchText=""
          classNames="test-class w-100"
        />
        <Button className="btn btn-secondary mt-5" id="addLocation" onClick={this.newLocationView}>ADD LOCATION</Button>
        <div className="row justify-content-center">{printLocation}</div>
      </div>
    );
  }
}

export default Locations;
