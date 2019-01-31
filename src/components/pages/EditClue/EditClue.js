import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import cluesData from '../../../helpers/data/cluesData';
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
      <div className='editClue mx-auto'>
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
                value={clueEdit.name}
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
                value={clueEdit.imageUrl}
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
                value={clueEdit.location}
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
                value={clueEdit.style}
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
                value={clueEdit.notes}
                onChange={this.notesChange}
              />
            </div>
            <Button className="btn btn-secondary mt-3" onSubmit={this.formSubmit}>
              SUBMIT CLUE EDIT
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default EditClue;
