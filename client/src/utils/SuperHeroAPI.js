// import axios from "axios";
import characters from "./characters";

// const baseURL = `https://superheroapi.com/api/`;
// const APIkey = `10157765250545339`;
// const config = {
//   headers: {
//     ["Access-Control-Allow-Origin"]: `*`,
//   },
// };

export default {
  getRandomCharacter() {
    const randomNumber = Math.floor(Math.random() * 731) + 1;
    return new Promise((resolve, reject) => {
      if (characters[randomNumber]) {
        resolve(characters[randomNumber]);
      } else {
        const errorObject = {
          msg: "An error occured",
          error: `character not found`,
        };
        reject(errorObject);
      }
    });
  },
};
