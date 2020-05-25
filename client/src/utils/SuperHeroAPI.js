import axios from "axios";
// import characters from "./characters";

export default {
  getRandomNewCharacter() {
    return axios.get(`/api/character`);
  },
  getNewOpponent(id) {
    return axios.post(`/api/character/searchcharacter`, { id: id });
  },
  loadContender(id) {
    return axios.get(`/api/character/${id}`);
  },
};

//   const randomNumber = Math.floor(Math.random() * 731) + 1;
//   return new Promise((resolve, reject) => {
//     if (characters[randomNumber]) {
//       resolve(characters[randomNumber]);
//     } else {
//       const errorObject = {
//         msg: "An error occured",
//         error: `character not found`,
//       };
//       reject(errorObject);
//     }
//   });
// },
