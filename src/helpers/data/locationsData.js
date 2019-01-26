import axios from 'axios';
import apiKeys from '../apiKeys';

const firebaseUrl = apiKeys.firebaseConfig.databaseUrl;

const getAllLocations = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/locations.json?orderBy="uid"&equalTo="${uid}"`)
    .then((results) => {
      const locationsObject = results.data;
      const locationsArray = [];
      if (locationsObject !== null) {
        Object.keys(locationsObject).forEach((locationId) => {
          locationsObject[locationId].id = locationId;
          locationsArray.push(locationsObject[locationId]);
        });
      }
      resolve(locationsArray);
    })
    .catch((error) => {
      reject(error);
    });
});

const getSingleLocation = locationId => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/locations/${locationId}.json`)
    .then((result) => {
      const singleLocation = result.data;
      singleLocation.id = locationId;
      resolve(singleLocation);
    })
    .catch((error) => {
      reject(error);
    });
});

const deleteLocation = locationId => axios.delete(`${firebaseUrl}/locations/${locationId}.json`);
const createLocation = locationObject => axios.post(`${firebaseUrl}/locations.json`, JSON.stringify(locationObject));
const updateLocation = (locationObject, locationId) => axios.put(`${firebaseUrl}/locations/${locationId}.json`, JSON.stringify(locationObject));

export default {
  getAllLocations,
  getSingleLocation,
  deleteLocation,
  createLocation,
  updateLocation,
};
