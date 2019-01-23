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

const deleteClue = clueId => axios.delete(`${firebaseUrl}/clues/${clueId}.json`);

export default { getAllClues, deleteClue };
