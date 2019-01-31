import React from 'react';
import { Button } from 'reactstrap';
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
      <div className="clueDetail mx-auto">
        <div className="col-9 mt-3 mx-auto">
          <h1 className="card-header">{singleClue.name}</h1>
          <div className="card-body">
            <img className="card-img-top" src={singleClue.imageUrl} alt={singleClue.name} />
            <h3 className="card-text">{singleClue.location}</h3>
            <h3 className="card-text">{singleClue.style}</h3>
            <h4 className="card-text">{singleClue.notes}</h4>
            <Button className="btn btn-light mt-5" id="backToClues" onClick={this.backToCluesView}>BACK TO CLUES</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default ClueDetail;
