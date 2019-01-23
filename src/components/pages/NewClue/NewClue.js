import React from 'react';
import { Button } from 'reactstrap';
import authRequests from '../../../helpers/data/authRequests';
import cluesData from '../../../helpers/data/cluesData';
import './NewClue.scss';

const defaultClue = {
  name: '',
  imageUrl: '',
  location: '',
  style: '',
  notes: '',
  uid: '',
};

class NewClue extends React.Component {
  state = {
    newClue: defaultClue,
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempClue = { ...this.state.newClue };
    tempClue[name] = e.target.value;
    this.setState({ newClue: tempClue });
  }

  nameChange = e => this.formFieldStringState('name', e);

  locationChange = e => this.formFieldStringState('location', e);

  imageChange = e => this.formFieldStringState('imageUrl', e);

  styleChange = e => this.formFieldStringState('style', e);

  notesChange = e => this.formFieldStringState('notes', e);

  formSubmit = (e) => {
    e.preventDefault();
    const myClue = { ...this.state.newClue };
    myClue.uid = authRequests.getCurrentUid();
    this.addClue(myClue);
    this.setState({ newClue: defaultClue });
  }

  addClue = (newClue) => {
    cluesData.createClue(newClue)
      .then(() => {
        this.props.history.push('/clues');
      });
  }

  render() {
    const { newClue } = this.state;

    return (
      <div className='newClue mx-auto'>
        <div className="clue-form mt-5">
          <form onSubmit={this.formSubmit}>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="name-pre">Name</span>
              </div>
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder="Clue Name"
                aria-describedby="nameHelp"
                value={newClue.name}
                onChange={this.nameChange}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="imageUrl-pre">Image URL</span>
              </div>
              <input
                type="text"
                id="imageUrl"
                className="form-control"
                placeholder="Clue Image"
                aria-describedby="imageHelp"
                value={newClue.imageUrl}
                onChange={this.imageChange}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="location-pre">Location</span>
              </div>
              <input
                type="text"
                id="location"
                className="form-control"
                placeholder="Clue Location"
                aria-describedby="locationHelp"
                value={newClue.location}
                onChange={this.locationChange}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="style-pre">Style</span>
              </div>
              <input
                type="text"
                id="style"
                className="form-control"
                placeholder="Clue Style"
                aria-describedby="styleHelp"
                value={newClue.style}
                onChange={this.styleChange}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="notes-pre">Notes</span>
              </div>
              <input
                type="text"
                id="notes"
                className="form-control"
                placeholder="Clue Notes"
                aria-describedby="notesHelp"
                value={newClue.notes}
                onChange={this.notesChange}
              />
            </div>
            <Button className="btn btn-secondary mt-3" onSubmit={this.formSubmit}>
              Submit New Clue
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default NewClue;
