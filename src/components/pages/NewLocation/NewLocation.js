import React from 'react';
import authRequests from '../../../helpers/data/authRequests';
import locationsData from '../../../helpers/data/locationsData';
import './NewLocation.scss';
import clueBkg from './images/rocks.png';

const defaultLocation = {
  name: '',
  imageUrl: '',
  address: '',
  phoneNumber: '',
  website: '',
  uid: '',
};

class NewLocation extends React.Component {
  state = {
    newLocation: defaultLocation,
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempLocation = { ...this.state.newLocation };
    tempLocation[name] = e.target.value;
    this.setState({ newLocation: tempLocation });
  }

  nameChange = e => this.formFieldStringState('name', e);

  addressChange = e => this.formFieldStringState('address', e);

  imageChange = e => this.formFieldStringState('imageUrl', e);

  phoneNumberChange = e => this.formFieldStringState('phoneNumber', e);

  websiteChange = e => this.formFieldStringState('website', e);

  formSubmit = (e) => {
    e.preventDefault();
    const myLocation = { ...this.state.newLocation };
    myLocation.uid = authRequests.getCurrentUid();
    this.addLocation(myLocation);
    this.setState({ newLocation: defaultLocation });
  }

  addLocation = (newLocation) => {
    locationsData.createLocation(newLocation)
      .then(() => {
        this.props.history.push('/locations');
      });
  }

  render() {
    const { newLocation } = this.state;

    return (
      <div className='newLocationPage mx-auto animated bounceInLeft'>
        <div className='newClue mx-auto'>
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
                  placeholder="Location Name"
                  aria-describedby="nameHelp"
                  value={newLocation.name}
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
                  placeholder="Location Image"
                  aria-describedby="imageHelp"
                  value={newLocation.imageUrl}
                  onChange={this.imageChange}
                />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="address-pre">ADDRESS</span>
                </div>
                <input
                  type="text"
                  id="address"
                  className="form-control"
                  placeholder="Location Address"
                  aria-describedby="locationHelp"
                  value={newLocation.address}
                  onChange={this.addressChange}
                />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="phone-pre">PHONE</span>
                </div>
                <input
                  type="text"
                  id="phoneNumber"
                  className="form-control"
                  placeholder="Location Phone Number"
                  aria-describedby="styleHelp"
                  value={newLocation.phoneNumber}
                  onChange={this.phoneNumberChange}
                />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="website-pre">WEBSITE</span>
                </div>
                <input
                  type="text"
                  id="website"
                  className="form-control"
                  placeholder="Location Website"
                  aria-describedby="notesHelp"
                  value={newLocation.website}
                  onChange={this.websiteChange}
                />
              </div>
              <div className="svg-wrapper" onClick={this.formSubmit}>
                <svg height="60" width="150" xmlns="http://www.w3.org/2000/svg">
                  <rect id="shape" height="30" width="150" />
                </svg>
                <div id="text">
                  <span className="spot">SUBMIT LOCATION</span>
                </div>
              </div>
              <img src={clueBkg} alt="rocks glasses" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default NewLocation;
