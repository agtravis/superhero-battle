"use strict";

const fs = require(`fs`);
const charactersObject = require(`./characters`);
const request = require('request');

const urlImages = [];

for (let i = 0; i < charactersObject.length; ++i) {
  const filenameSplit = charactersObject[i].image.url.split('/');
  const filename = filenameSplit[filenameSplit.length - 1]
  urlImages.push([charactersObject[i].image.url, filename]);
}

urlImages.sort((a, b) => a[1] > b[1] ? 1 : -1);

const download = function (uri, filename, callback) {
  request.head(uri, function (err, res, body) {
    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

let i = 0;
const interval = setInterval(function () {
  download(urlImages[i][0], 'picturestest/' + urlImages[i][1], function () {
    console.log('done', urlImages[i][1], `image ${i} of ${urlImages.length}`);
  });
  ++i;
  if (i > urlImages.length - 1) clearInterval(interval);
}, 1000);




