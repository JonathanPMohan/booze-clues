import axios from 'axios';
import apiKeys from '../apiKeys';

const firebaseUrl = apiKeys.firebaseConfig.databaseUrl;

const getAllClues = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/clues.json?orderBy="uid"&equalTo="${uid}"`)
    .then((results) => {
      const cluesObject = results.data;
      const cluesArray = [];
      if (cluesObject !== null) {
        Object.keys(cluesObject).forEach((clueId) => {
          cluesObject[clueId].id = clueId;
          cluesArray.push(cluesObject[clueId]);
        });
      }
      resolve(cluesArray);
    })
    .catch((error) => {
      reject(error);
    });
});

const getSingleClue = clueId => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/clues/${clueId}.json`)
    .then((result) => {
      const singleClue = result.data;
      singleClue.id = clueId;
      resolve(singleClue);
    })
    .catch((error) => {
      reject(error);
    });
});

const deleteClue = clueId => axios.delete(`${firebaseUrl}/clues/${clueId}.json`);
const createClue = clueObject => axios.post(`${firebaseUrl}/clues.json`, JSON.stringify(clueObject));
const updateClue = (clueObject, clueId) => axios.put(`${firebaseUrl}/clues/${clueId}.json`, JSON.stringify(clueObject));

export default {
  getAllClues,
  deleteClue,
  createClue,
  updateClue,
  getSingleClue,
};
