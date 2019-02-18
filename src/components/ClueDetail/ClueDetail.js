import React from 'react';
import cluesData from '../../helpers/data/cluesData';
import './ClueDetail.scss';

class ClueDetail extends React.Component {
  state = {
    singleClue: [],
  }

  backToCluesView = (e) => {
    this.props.history.push('/clues');
  }

  componentDidMount() {
    const firebaseId = this.props.match.params.id;
    cluesData.getSingleClue(firebaseId)
      .then((singleClue) => {
        this.setState({ singleClue });
      });
  }

  render() {
    const {
      singleClue,
    } = this.state;

    return (
      <div className="clueDetail mx-auto w-75">
        <div className="col-9 mt-3 mx-auto">
          <h1 className="card-header">{singleClue.name}</h1>
          <div className="card-body">
            <img className="clueImage" src={singleClue.imageUrl} alt={singleClue.name} />
            <h2 className="card-text">{singleClue.location}</h2>
            <h2 className="card-text">{singleClue.style}</h2>
            <h3 className="card-text">{singleClue.notes}</h3>
            <div className="backToClues svg-wrapper" onClick={this.backToCluesView}>
              <svg height="60" width="150" xmlns="http://www.w3.org/2000/svg">
                <rect id="shape" height="30" width="150" />
              </svg>
              <div id="text">
                <span className="spot">BACK TO LIST</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ClueDetail;
