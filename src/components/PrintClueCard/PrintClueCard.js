import React from 'react';
import clueShape from '../../helpers/propz/clueShape';

import './PrintClueCard.scss';

class PrintClueCard extends React.Component {
  static propTypes = {
    clue: clueShape.clueShape,
  }

  render() {
    const { clue } = this.props;
    return (
      <div className="card col-3 mt-3 mr-1">
        <h3 className="card-header">{clue.name}</h3>
        <div className="card-body">
          <img className="card-img-top" src={clue.imageUrl} alt={clue.name} />
          <p className="card-text">{clue.location}</p>
          <p className="card-text">{clue.style}</p>
          <p className="card-text">{clue.notes}</p>
        </div>
      </div>
    );
  }
}

export default PrintClueCard;
