import axios from 'axios';
import apiKeys from '../apiKeys';

const firebaseUrl = apiKeys.firebaseConfig.databaseUrl;

const getAllCollections = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/collections.json?orderBy="uid"&equalTo="${uid}"`)
    .then((results) => {
      const collectionsObject = results.data;
      const collectionsArray = [];
      if (collectionsObject !== null) {
        Object.keys(collectionsObject).forEach((collectionId) => {
          collectionsObject[collectionId].id = collectionId;
          collectionsArray.push(collectionsObject[collectionId]);
        });
      }
      resolve(collectionsArray);
    })
    .catch((error) => {
      reject(error);
    });
});

const getSingleCollection = collectionId => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/collections/${collectionId}.json`)
    .then((result) => {
      const singleCollection = result.data;
      singleCollection.id = collectionId;
      resolve(singleCollection);
    })
    .catch((error) => {
      reject(error);
    });
});

const deleteCollection = collectionId => axios.delete(`${firebaseUrl}/collections/${collectionId}.json`);
const createCollection = collectionObject => axios.post(`${firebaseUrl}/collections.json`, JSON.stringify(collectionObject));
const updateCollection = (collectionObject, collectionId) => axios.put(`${firebaseUrl}/collections/${collectionId}.json`, JSON.stringify(collectionObject));

export default {
  getAllCollections,
  getSingleCollection,
  deleteCollection,
  createCollection,
  updateCollection,
};
