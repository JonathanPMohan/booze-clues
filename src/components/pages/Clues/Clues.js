import React from 'react';
import { Button } from 'reactstrap';
import cluesData from '../../../helpers/data/cluesData';
import authRequests from '../../../helpers/data/authRequests';
import PrintClueCard from '../../PrintClueCard/PrintClueCard';

import './Clues.scss';

class Clues extends React.Component {
  state = {
    clues: [],
  }

  getClues = () => {
    const uid = authRequests.getCurrentUid();
    cluesData.getAllClues(uid)
      .then((clues) => {
        this.setState({ clues });
      })
      .catch((err) => {
        console.error('error with clues GET', err);
      });
  };

  componentDidMount() {
    this.getClues();
  }

  render() {
    const printClue = this.state.clues.map(clue => (
      <PrintClueCard
        key={clue.id}
        clue={clue}
      />
    ));
    return (
      <div className='clues mx-auto'>
        <h2>Searching For A Clue?</h2>
        <div className="row justify-content-center">{printClue}</div>
        <Button className="btn btn-info mt-5" id="editClue">Edit Clue</Button>
      </div>
    );
  }
}

export default Clues;
