import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import collectionsData from '../../../helpers/data/collectionsData';
import authRequests from '../../../helpers/data/authRequests';
import './EditCollection.scss';

const defaultCollection = {
  name: '',
  imageUrl: '',
  style: '',
  age: '',
  uid: '',
};

class EditCollection extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
  }

  state = {
    collectionEdit: defaultCollection,
    editId: '-1',
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempCollection = { ...this.state.collectionEdit };
    tempCollection[name] = e.target.value;
    this.setState({ collectionEdit: tempCollection });
  }

  nameChange = e => this.formFieldStringState('name', e);

  imageChange = e => this.formFieldStringState('imageUrl', e);

  ageChange = e => this.formFieldStringState('age', e);

  styleChange = e => this.formFieldStringState('style', e);

  addCollectionEdit = (collectionEdit) => {
    const { editId } = this.state;
    collectionsData.updateCollection(collectionEdit, editId)
      .then(() => {
        this.props.history.push('/collections');
      });
  }

  formSubmit = (e) => {
    e.preventDefault();
    const myCollection = { ...this.state.collectionEdit };
    myCollection.uid = authRequests.getCurrentUid();
    this.addCollectionEdit(myCollection);
    this.setState({ collectionEdit: defaultCollection });
  }

  componentDidMount() {
    const firebaseId = this.props.match.params.id;
    collectionsData.getSingleCollection(firebaseId)
      .then((collectionToEdit) => {
        this.setState({ collectionEdit: collectionToEdit });
        this.setState({ editId: collectionToEdit.id });
      });
  }

  render() {
    const { collectionEdit } = this.state;

    return (
      <div className='editCollection mx-auto'>
        <div className="collection-form mt-5">
          <form onSubmit={this.formSubmit}>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="name-pre">NAME</span>
              </div>
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder="Collection Item Name"
                aria-describedby="nameHelp"
                value={collectionEdit.name}
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
                placeholder="Collection Item Image"
                aria-describedby="imageHelp"
                value={collectionEdit.imageUrl}
                onChange={this.imageChange}
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
                placeholder="Collection Item Style"
                aria-describedby="styleHelp"
                value={collectionEdit.style}
                onChange={this.styleChange}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="age-pre">AGE</span>
              </div>
              <input
                type="text"
                id="age"
                className="form-control"
                placeholder="Collection Item Age"
                aria-describedby="ageHelp"
                value={collectionEdit.age}
                onChange={this.ageChange}
              />
            </div>
            <Button className="btn btn-secondary mt-3" onSubmit={this.formSubmit}>
              SUBMIT ITEM EDIT
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default EditCollection;
