import React from 'react';
import PropTypes from 'prop-types';
import clueShape from '../../helpers/propz/clueShape';
import authRequests from '../../helpers/data/authRequests';

import './PrintClueCard.scss';

class PrintClueCard extends React.Component {
  static propTypes = {
    clue: clueShape.clueShape,
    deleteSingleClue: PropTypes.func,
  }

  deleteEvent = (e) => {
    e.preventDefault();
    const { deleteSingleClue, clue } = this.props;
    deleteSingleClue(clue.id);
  }

  render() {
    const { clue } = this.props;
    const uid = authRequests.getCurrentUid();

    const makeButtons = () => {
      if (clue.uid === uid) {
        return (
          <div>
            <span className="col">
              <button className="btn btn-secondary">
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
      <div className="card col-3 mt-3 mr-1">
        <h3 className="card-header">{clue.name}</h3>
        <div className="card-body">
          <img className="card-img-top" src={clue.imageUrl} alt={clue.name} />
          <p className="card-text">{clue.location}</p>
          <p className="card-text">{clue.style}</p>
          <p className="card-text">{clue.notes}</p>
          {makeButtons()}
        </div>
      </div>
    );
  }
}

export default PrintClueCard;
