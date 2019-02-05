import React from 'react';
import PropTypes from 'prop-types';
import collectionShape from '../../helpers/propz/collectionShape';
import authRequests from '../../helpers/data/authRequests';

import './PrintCollectionCard.scss';

class PrintCollectionCard extends React.Component {
  static propTypes = {
    collection: collectionShape.collectionShape,
    deleteSingleCollection: PropTypes.func,
  }

  editEvent = (e) => {
    e.preventDefault();
    const { passCollectionToEdit, collection } = this.props;
    passCollectionToEdit(collection.id);
  }

  deleteEvent = (e) => {
    e.preventDefault();
    const { deleteSingleCollection, collection } = this.props;
    deleteSingleCollection(collection.id);
  }

  collectionClick = () => {
    const { collection, onSelect } = this.props;
    onSelect(collection.id);
  }

  render() {
    const { collection } = this.props;
    const uid = authRequests.getCurrentUid();

    const makeButtons = () => {
      if (collection.uid === uid) {
        return (
          <div>
            <span className="col">
              <button className="btn btn-secondary" onClick={this.editEvent}>
                <i className="fas fa-pencil-alt"></i>
              </button>
            </span>
            <span className="col">
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
      <div className="card4 col-3">
        <h3 className="card-header">{collection.name}</h3>
        <div className="card-body" onClick={this.collectionClick}>
          <img className="card-img-top" src={collection.imageUrl} alt={collection.name} />
          <h4 className="card-text">{collection.style}</h4>
          <h5 className="card-text">{collection.age}</h5>
        </div>
        {makeButtons()}
      </div>
    );
  }
}

export default PrintCollectionCard;
