"use strict";

const axios = require(`axios`);
const fs = require(`fs`);

for (var i = 1; i <= 731; i++) {
  (function (i) {
    setTimeout(function () {
      axios
        .get(`https://superheroapi.com/api/10157765250545339/${i}`)
        .then(data => {
          const text = JSON.stringify(data.data);
          fs.appendFile(`test.js`, `${text},`, err => {
            if (err) throw err;
            console.log(`file saved`);
          });
        })
        .catch(err => console.error(err));
    }, 1000 * i);
  })(i);
}
