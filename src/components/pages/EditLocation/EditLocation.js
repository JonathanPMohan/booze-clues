import React from 'react';
import PropTypes from 'prop-types';
import authRequests from '../../../helpers/data/authRequests';
import locationsData from '../../../helpers/data/locationsData';
import clueBkg from './images/rocks.png';
import './EditLocation.scss';

const defaultLocation = {
  name: '',
  imageUrl: '',
  address: '',
  phoneNumber: '',
  website: '',
  uid: '',
};

class EditLocation extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
  }

  state = {
    locationEdit: defaultLocation,
    editId: '-1',
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempLocation = { ...this.state.locationEdit };
    tempLocation[name] = e.target.value;
    this.setState({ locationEdit: tempLocation });
  }

  nameChange = e => this.formFieldStringState('name', e);

  addressChange = e => this.formFieldStringState('address', e);

  imageChange = e => this.formFieldStringState('imageUrl', e);

  phoneNumberChange = e => this.formFieldStringState('phoneNumber', e);

  websiteChange = e => this.formFieldStringState('website', e);

  addLocationEdit = (locationEdit) => {
    const { editId } = this.state;
    locationsData.updateLocation(locationEdit, editId)
      .then(() => {
        this.props.history.push('/locations');
      });
  }

  formSubmit = (e) => {
    e.preventDefault();
    const myLocation = { ...this.state.locationEdit };
    myLocation.uid = authRequests.getCurrentUid();
    this.addLocationEdit(myLocation);
    this.setState({ locationEdit: defaultLocation });
  }

  componentDidMount() {
    const firebaseId = this.props.match.params.id;
    locationsData.getSingleLocation(firebaseId)
      .then((locationToEdit) => {
        this.setState({ locationEdit: locationToEdit });
        this.setState({ editId: locationToEdit.id });
      });
  }

  render() {
    const { locationEdit } = this.state;

    return (
      <div className='editLocation mx-auto animated bounceInLeft'>
        <h2>EDIT YOUR LOCATION</h2>
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
                value={locationEdit.name}
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
                value={locationEdit.imageUrl}
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
                value={locationEdit.address}
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
                value={locationEdit.phoneNumber}
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
                value={locationEdit.website}
                onChange={this.websiteChange}
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

export default EditLocation;
