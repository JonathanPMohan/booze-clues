import React from 'react';
import PropTypes from 'prop-types';
import locationShape from '../../helpers/propz/locationShape';
import authRequests from '../../helpers/data/authRequests';

import './PrintLocationCard.scss';

class PrintLocationCard extends React.Component {
  static propTypes = {
    location: locationShape.locationShape,
    deleteSingleLocation: PropTypes.func,
  }

  deleteEvent = (e) => {
    e.preventDefault();
    const { deleteSingleLocation, location } = this.props;
    deleteSingleLocation(location.id);
  }

  locationClick = () => {
    const { location, onSelect } = this.props;
    onSelect(location.id);
  }

  editEvent = (e) => {
    e.preventDefault();
    const { passLocationToEdit, location } = this.props;
    passLocationToEdit(location.id);
  }

  render() {
    const { location } = this.props;
    const uid = authRequests.getCurrentUid();

    const makeButtons = () => {
      if (location.uid === uid) {
        return (
          <div>
            <span className="col-1">
              <button className="btn btn-secondary" onClick={this.editEvent}>
                <i className="fas fa-pencil-alt"></i>
              </button>
            </span>
            <span className="col-1">
              <button className="btn btn-secondary" onClick={this.deleteEvent}>
                <i className="fas fa-trash-alt"></i>
              </button>
            </span>
          </div>
        );
      }
      return <span className="col-2"></span>;
    };
    return (
      <div className="card3 col-3">
        <h2 className="card-header">{location.name}</h2>
        <div className="card-body" onClick={this.locationClick}>
          <img className="card-img-top" src={location.imageUrl} alt={location.name} />
          <h4 className="card-text" >{location.address}</h4>
          <h5 className="card-text"><i class="fas fa-phone"></i>
            {location.phoneNumber}</h5>
          <h5><i class="fas fa-globe-americas"></i>
            <a href={location.website} target="_blank nonopener noreferrer" >Visit Website</a></h5>
        </div>
        {makeButtons()}
      </div>
    );
  }
}

export default PrintLocationCard;
