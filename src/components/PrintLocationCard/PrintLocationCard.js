import React from 'react';
import locationShape from '../../helpers/propz/locationShape';
import authRequests from '../../helpers/data/authRequests';

import './PrintLocationCard.scss';

class PrintLocationCard extends React.Component {
  static propTypes = {
    location: locationShape.locationShape,
  }

  render() {
    const { location } = this.props;
    const uid = authRequests.getCurrentUid();

    const makeButtons = () => {
      if (location.uid === uid) {
        return (
          <div>
            <span className="col">
              <button className="btn btn-secondary">
                <i className="fas fa-pencil-alt"></i>
              </button>
            </span>
            <span className="col">
              <button className="btn btn-secondary">
                <i className="fas fa-trash-alt"></i>
              </button>
            </span>
          </div>
        );
      }
      return <span className="col-2"></span>;
    };
    return (
      <div className="card col-3 mt-3 mr-1">
        <h3 className="card-header">{location.name}</h3>
        <div className="card-body">
          <img className="card-img-top" src={location.imageUrl} alt={location.name} />
          <p className="card-text">{location.address}</p>
          <p className="card-text">{location.phoneNumber}</p>
          <p className="card-text">{location.website}</p>
          {makeButtons()}
        </div>
      </div>
    );
  }
}

export default PrintLocationCard;
