"use strict";

/*
This code iterates through each item in the original database, and adds the response object to a document.

Each loop triggers a setTimeout which contains a function that will be called after a certain amount of time.
Essentially the loop finishes right away but creates 731 Time Out functions.

This is to ensure that the responses get added to the document in the correct order, allowing time for the response.
*/

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

/*
This code mocks an API response. It reads the *.js file created in the above code (with some manual editing to turn
it into an array) and returns a promise, if successful a random character.

This would be a front end action exclusively.
*/

import characters from "./characters";

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

/*
This code downloads all the associated images from the database and saves them locally.

First it loops through the characters array previously saved, and creates a new array of just the full URL
and the last part of the file name (the pathname). Then it sorts them by the pathname.

A function (download) takes three parameters, and uses these to access the uri, write a file, and then run a callback.

In order to allow time for the callback functions to finish, the download function is called iteratively on a setTimeout loop.

For each iteration, the uri is set as the full (first index) URL in the sorted array generated before. The output location is always
the same, and the callback function simply logs to the console the details of the success.

As soon as the iterator is greater than the amount of objects in the array, we clearInterval.

NOTE: If the image download is unsuccessful (in theory this should only be if the image doesn't exist), the result is simply a
corrupted image file that won't open. I have chosen to handle this on the front end, and can easily manually locate missing images
from alternative sources at any point, updating them in the front end database with the same filename.
*/

const fs = require(`fs`);
const charactersObject = require(`./characters`);
const request = require("request");

const urlImages = [];

for (let i = 0; i < charactersObject.length; ++i) {
  const filenameSplit = charactersObject[i].image.url.split("/");
  const filename = filenameSplit[filenameSplit.length - 1];
  urlImages.push([charactersObject[i].image.url, filename]);
}

urlImages.sort((a, b) => (a[1] > b[1] ? 1 : -1));

const download = function (uri, filename, callback) {
  request.head(uri, function (err, res, body) {
    request(uri).pipe(fs.createWriteStream(filename)).on("close", callback);
  });
};

let i = 0;
const interval = setInterval(function () {
  download(urlImages[i][0], "picturestest/" + urlImages[i][1], function () {
    console.log("done", urlImages[i][1], `image ${i} of ${urlImages.length}`);
  });
  ++i;
  if (i > urlImages.length - 1) clearInterval(interval);
}, 1000);
