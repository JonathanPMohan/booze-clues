import React from 'react';
import PropTypes from 'prop-types';
import cluesData from '../../../helpers/data/cluesData';
import clueBkg from './images/rocks.png';
import authRequests from '../../../helpers/data/authRequests';

import './EditClue.scss';

const defaultClue = {
  name: '',
  imageUrl: '',
  location: '',
  style: '',
  notes: '',
  uid: '',
};

class EditClue extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
  }

  state = {
    clueEdit: defaultClue,
    editId: '-1',
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempClue = { ...this.state.clueEdit };
    tempClue[name] = e.target.value;
    this.setState({ clueEdit: tempClue });
  }

  nameChange = e => this.formFieldStringState('name', e);

  imageChange = e => this.formFieldStringState('imageUrl', e);

  locationChange = e => this.formFieldStringState('location', e);

  styleChange = e => this.formFieldStringState('style', e);

  notesChange = e => this.formFieldStringState('notes', e);

  addClueEdit = (clueEdit) => {
    const { editId } = this.state;
    cluesData.updateClue(clueEdit, editId)
      .then(() => {
        this.props.history.push('/clues');
      });
  }

  formSubmit = (e) => {
    e.preventDefault();
    const myClue = { ...this.state.clueEdit };
    myClue.uid = authRequests.getCurrentUid();
    this.addClueEdit(myClue);
    this.setState({ clueEdit: defaultClue });
  }

  componentDidMount() {
    const firebaseId = this.props.match.params.id;
    cluesData.getSingleClue(firebaseId)
      .then((clueToEdit) => {
        this.setState({ clueEdit: clueToEdit });
        this.setState({ editId: clueToEdit.id });
      });
  }

  render() {
    const { clueEdit } = this.state;

    return (
      <div className='editClue mx-auto animated bounceInLeft'>
        <div className="clue-form mt-5">
          <form onSubmit={this.formSubmit}>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="name-pre">NAME</span>
              </div>
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder="Clue Name"
                aria-describedby="nameHelp"
                value={clueEdit.name}
                onChange={this.nameChange}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="imageUrl-pre">IMAGE URL</span>
              </div>
              <input
                type="text"
                id="imageUrl"
                className="form-control"
                placeholder="Clue Image"
                aria-describedby="imageHelp"
                value={clueEdit.imageUrl}
                onChange={this.imageChange}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="location-pre">LOCATION</span>
              </div>
              <input
                type="text"
                id="location"
                className="form-control"
                placeholder="Clue Location"
                aria-describedby="locationHelp"
                value={clueEdit.location}
                onChange={this.locationChange}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="style-pre">STYLE</span>
              </div>
              <input
                type="text"
                id="style"
                className="form-control"
                placeholder="Clue Style"
                aria-describedby="styleHelp"
                value={clueEdit.style}
                onChange={this.styleChange}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="notes-pre">NOTES</span>
              </div>
              <input
                type="text"
                id="notes"
                className="form-control"
                placeholder="Clue Notes"
                aria-describedby="notesHelp"
                value={clueEdit.notes}
                onChange={this.notesChange}
              />
            </div>
            <div className="svg-wrapper" onClick={this.formSubmit}>
              <svg height="60" width="150" xmlns="http://www.w3.org/2000/svg">
                <rect id="shape" height="30" width="150" />
              </svg>
              <div id="text">
                <span className="spot">SUBMIT EDIT</span>
              </div>
            </div>
            <img src={clueBkg} alt="rocks glasses" />
          </form>
        </div>
      </div>
    );
  }
}

export default EditClue;
