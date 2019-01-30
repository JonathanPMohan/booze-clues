import React from 'react';
import { Button } from 'reactstrap';
import cluesData from '../../../helpers/data/cluesData';
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
      <div className="clueDetail mx-auto">
        <Button className="btn btn-success mt-5" id="backToClues" onClick={this.backToCluesView}>Back To Clues</Button>
        <div className="card col-6 mt-3 mx-auto">
          <h5 className="card-header">{singleClue.name}</h5>
          <div className="card-body">
            <img className="card-img-top" src={singleClue.imageUrl} alt={singleClue.name} />
            <p className="card-text">{singleClue.location}</p>
            <p className="card-text">{singleClue.style}</p>
            <p className="card-text">{singleClue.notes}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ClueDetail;
