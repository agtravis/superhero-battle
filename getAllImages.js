"use strict";

const fs = require(`fs`);
const charactersObject = require(`./characters`);

console.log(charactersObject[0].image.url);

const urlImages = [];

for (let i = 0; i < charactersObject.length - 1; ++i) {
    urlImages.push(charactersObject[i].image.url);
}

// console.log(urlImages)


fs.writeFile('originalUrls.txt', JSON.stringify(urlImages), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });


