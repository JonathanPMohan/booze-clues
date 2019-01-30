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

  editEvent = (e) => {
    e.preventDefault();
    const { passClueToEdit, clue } = this.props;
    passClueToEdit(clue.id);
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
      <div className="card2 col-3">
        <h2 className="card-header">{clue.name}</h2>
        <div className="card-body">
          <img className="card-img-top" src={clue.imageUrl} alt={clue.name} />
          <h3 className="card-text">{clue.location}</h3>
          <h4 className="card-text">{clue.style}</h4>
          <h5 className="card-text">{clue.notes}</h5>
          {makeButtons()}
        </div>
      </div>
    );
  }
}

export default PrintClueCard;
