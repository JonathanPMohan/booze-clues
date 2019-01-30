import React from 'react';
import { Button } from 'reactstrap';
import SearchField from 'react-search-field';
import cluesData from '../../../helpers/data/cluesData';
import authRequests from '../../../helpers/data/authRequests';
import PrintClueCard from '../../PrintClueCard/PrintClueCard';

import './Clues.scss';

class Clues extends React.Component {
  state = {
    clues: [],
    filteredClues: [],
  }

  getClues = () => {
    const uid = authRequests.getCurrentUid();
    cluesData.getAllClues(uid)
      .then((clues) => {
        this.setState({ clues });
        this.setState({ filteredClues: clues });
      })
      .catch((err) => {
        console.error('error with clues GET', err);
      });
  };

  componentDidMount() {
    this.getClues();
  }

  deleteSingleClue = (clueId) => {
    cluesData.deleteClue(clueId)
      .then(() => {
        this.getClues();
      });
  }


  newClueView = () => {
    this.props.history.push('/clues/new');
  }

  onSelect = (clueId) => {
    this.props.history.push(`/clues/${clueId}`);
  }

  passClueToEdit = (clueId) => {
    this.setState({ editId: clueId });
    this.props.history.push(`/clues/${clueId}/edit`);
  }

  onChange = (value, event) => {
    const { clues } = this.state;
    const filteredClues = [];
    event.preventDefault();
    if (!value) {
      this.setState({ filteredClues: clues });
    } else {
      clues.forEach((clue) => {
        if (clue.name.toLowerCase().includes(value.toLowerCase())
          || clue.style.toLowerCase().includes(value.toLowerCase())
          || clue.location.toLowerCase().includes(value.toLowerCase())) {
          filteredClues.push(clue);
        }
        this.setState({ filteredClues });
      });
    }
  }

  render() {
    const {
      filteredClues,
    } = this.state;

    const printClue = filteredClues.map(clue => (
      <PrintClueCard
        key={clue.id}
        clue={clue}
        deleteSingleClue={this.deleteSingleClue}
        passClueToEdit={this.passClueToEdit}
        onSelect={this.onSelect}
      />
    ));

    return (
      <div className='clues mx-auto'>
        <h2>Searching For A Clue?</h2>
        <SearchField
          placeholder="Search Clues By Name or Style"
          onChange={this.onChange}
          searchText=""
          classNames="test-class w-100"
        />
        <Button className="btn btn-info mt-5" id="addClue" onClick={this.newClueView}>Add Clue</Button>
        <div className="row justify-content-center">{printClue}</div>
      </div>
    );
  }
}

export default Clues;
