import React from 'react';
import { Button } from 'reactstrap';
import authRequests from '../../../helpers/data/authRequests';
import collectionsData from '../../../helpers/data/collectionsData';
import clueBkg from './images/rocks.png';
import './NewCollection.scss';

const defaultCollection = {
  name: '',
  imageUrl: '',
  style: '',
  age: '',
  uid: '',
};

class NewCollection extends React.Component {
  state = {
    newCollection: defaultCollection,
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempCollection = { ...this.state.newCollection };
    tempCollection[name] = e.target.value;
    this.setState({ newCollection: tempCollection });
  }

  nameChange = e => this.formFieldStringState('name', e);

  imageChange = e => this.formFieldStringState('imageUrl', e);

  styleChange = e => this.formFieldStringState('style', e);

  ageChange = e => this.formFieldStringState('age', e);

  formSubmit = (e) => {
    e.preventDefault();
    const myCollection = { ...this.state.newCollection };
    myCollection.uid = authRequests.getCurrentUid();
    this.addCollection(myCollection);
    this.setState({ newCollection: defaultCollection });
  }

  addCollection = (newCollection) => {
    collectionsData.createCollection(newCollection)
      .then(() => {
        this.props.history.push('/collections');
      });
  }

  render() {
    const { newCollection } = this.state;

    return (
      <div className='newCollectionPage mx-auto'>
        <div className='newCollection mx-auto'>
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
                  value={newCollection.name}
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
                  value={newCollection.imageUrl}
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
                  value={newCollection.style}
                  onChange={this.styleChange}
                />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="notes-pre">AGE</span>
                </div>
                <input
                  type="text"
                  id="age"
                  className="form-control"
                  placeholder="Collection Item Age"
                  aria-describedby="ageHelp"
                  value={newCollection.age}
                  onChange={this.ageChange}
                />
              </div>
              <Button className="collectionSubmit btn btn-secondary mt-3" onSubmit={this.formSubmit}>
                SUBMIT NEW ITEM
            </Button>
              <div>
                <img src={clueBkg} alt="rocks glasses" />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default NewCollection;
