# Superhero Battle

### UML

![SuperHeroBattleUML](https://docs.google.com/drawings/d/e/2PACX-1vSn7Ae5_DEMKfFeBasGRrjnMF-4EigTO_C89iPNr5PXpUJg5JpzvzRZV3M_GiquUE6Y3PVLLvYAI_H1/pub?w=1512&h=722)

Check out the repo [here](https://github.com/agtravis/superhero-battle), and see the app in operation [here](https://agtravis-superhero-battle.herokuapp.com/).

This app runs in the browser - see [Setup](#setup) below for instructions on how to use.

## Table of contents

- [About](#about)
- [Screenshots](#screenshots)
- [Technologies](#technologies)
- [Code Examples](#code-examples)
- [Setup](#setup)
- [Features](#features)
- [Status](#status)
- [Contact](#contact)

## About

Superhero Battle is a full MERN stack progressive web application (pwa), featuring user authentication, css animations, off-line detection and capabilities, and was written using ReactJS and class components.

Superhero Battle is a game in which you can face off all your favorite heroes and villains against eachother!

There are 731 characters from all sides, and all franchises. You can fight solo, or you can form a team and go all in: the greater the risk, the greater the reward. Recruit allies and defeat foes, and try to get everyone on your side!

Superhero Battle was written and developed in entirety by myself. That said, there are various elements without which I could not have created this game:

- Any and all intellectual property featured (i.e. the characters) is owned by its respective copyright holder. I do not pretend to own any rights to the characters I am using. There is no advertising on my page, and I do not profit from the characters' usage in any way.
- The information and images for the characters are supplied by superheroapi.com.
- The game play is very similar to the style of play of Top Trumps, which is the inspiration for this game.
- Get in touch with me through my website.

## Screenshots

![Features](./client/public/screenshots/SuperheroBattleFeatures.gif)  
Some of the features of the app in action, showing the log in/log out capability with password validation (and updating password), the ability to search for users and characters, how the user's character roster functions and displays, and a table of user stats, ranked and organizable.

![Battle Mode](./client/public/screenshots/SuperheroBattleFight.gif)  
Shows the fight flow, focusing on Team mode, shows changing a team member, and a victory followed by defeat.

## Technologies

This app was built with :

- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/)
- [React](https://reactjs.org/)
- [Node](https://nodejs.org/en/)

### Back-end package.json dependencies:

```js
"dependencies": {
    "axios": "^0.19.2",
    "bcryptjs": "^2.4.3",
    "connect-mongo": "^3.2.0",
    "express": "^4.17.1",
    "express-session": "^1.17.1",
    "if-env": "^1.0.4",
    "localforage": "^1.7.3",
    "mongoose": "^5.9.7",
    "morgan": "^1.10.0",
    "passport": "^0.4.1",
    "passport-local": "^1.0.0",
    "react-calendar": "^3.0.1"
  }
```

### Front-end package.json dependecies:

```js
  "dependencies": {
    "@testing-library/jest-dom": "^4.2.4",
    "@testing-library/react": "^9.5.0",
    "@testing-library/user-event": "^7.2.1",
    "axios": "^0.19.2",
    "bootstrap": "^4.4.1",
    "localforage": "^1.7.3",
    "react": "^16.13.1",
    "react-bootstrap": "^1.0.1",
    "react-dom": "^16.13.1",
    "react-router-dom": "^5.1.2",
    "react-scripts": "3.4.1"
  },
```

## Code Examples

### localForage

`localForage` is a library for IndexedDB. It makes utilizing this feature of the browser much easier to enable offline functionality. This runs in parallel with the fact that the app is a Progressive Web App (specifically installable).

This app uses localForage for two main parts of its UI - keeping the user in session, and allowing the user to make posts while offline, and it does this by effectively using the local storage feature.

When a user makes a post, the code first checks to see if the browser is online:

```js
 if (navigator.onLine) {
```

If it is, it will perform a regular database `POST` using `mongoose` through the model schema for our `MongoDB` database. Once the post is confirmed, the user ID is then used to `PUT` the user collection and `$push` the post `._id` to the array of posts stored in the user collection (to enable a `population` when called upon). Similarly, when the user deletes their post, an equivalent `$pull` - `PUT` is made to remove it, but leave the other posts intact.

If the browser is offline, an object is created to be `POST`ed later, and then here's how the code looks:

```js
localForage
  .getItem("postKey")
  .then(value => {
    postArr.push(postObj);
    if (value && value.length > 0) {
      for (const post of value) {
        postArr.push(post);
      }
    }
    localForage
      .setItem(`postKey`, postArr)
      .then(value => {
        console.log(`localForage success - post stored offline!`);
        this.setState({ offlineSuccess: true });
        console.log(value);
      })
      .catch(err => console.error(err));
  })
  .catch(err => console.error(err));
```

The code first gets the key from the local storage. It will be an array, if it is not already, so this first block checks to see if it exists and if it has a length, and if so takes each post already there and pushes them to a new array (`postArr`). If there is nothing there in storage, it doesn't attempt to retrieve anything.

Next it then uses `setItem` to write a new object to the storage, and using the same key name ensure the old data is overwritten. Finally, when the new key exists, the state of the component is adjusted (in this case so a success message appears to the user).

The really interesting part is how the app knows when to try to post the stored data. We have a component called `NetworkDetector`, there's too much code to paste in here, but click [here](https://github.com/agtravis/book-it-yourself/blob/master/client/src/Hoc/NetworkDetector.jsx) to see it.

Now instead of exporting `App` by itself, we first import that component in app.js, and then when we export app we run it as an argument through the NetworkDetector, like so:

```js
export default NetworkDetector(App);
```

This file will check to see with event listeners and by pinging google.com to see if the app is online. If it finds that it is online, a function called `backOnline` is called. Again, the code is long, so click on the link to view it, but the interesting parts are:

```js
localForage
    .iterate((value, key, iterationNumber) => {
        if (key === `postKey`) {
            for (const post of value) {
                API.addPost(post.post).then(postDb => {
                    API.updateUserNewPost(post.user, { id: postDb.data._id })
```

which ensures first we are looking at the right key, then loops through the array and for each post makes the `POST` request and subsequent `PUT` push, and then:

```js
localForage.removeItem(`postKey`);
```

Ensures there are no lingering posts to get duplicated.

### ServiceWorker

React comes with a built in service worker. It was really important for our application to take full advantage of this as the intended purpose for this app is to be a downloadable mobile web app.

```js
function checkValidServiceWorker(swUrl, config) {
  fetch(swUrl, {
    headers: { 'Service-Worker': 'script' },
  })
    .then(response => {
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        registerValidSW(swUrl, config);
      }
    })
```

First the service worker checks to see if it is registered or unregistered. If it is registered it will continue, otherwise it will end with an reload of the page.

```js
function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === "installed") {
            if (navigator.serviceWorker.controller) {
              console.log(
                "New content is available and will be used when all " +
                  "tabs for this page are closed. See https://bit.ly/CRA-PWA."
              );
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              console.log("Content is cached for offline use.");
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch(error => {
      console.error("Error during service worker registration:", error);
    });
}
```

Now we have registered the service worker which has updated the precached content. The previous service worker will continue to run until all tabs are close. When all content has been precached the app has the ability to work for offline use.

## Setup

If the user just wants to use the app, all they have to do is sign up for an account!

If the user has forked the repo and wants to see the code and potentially make changes to it, they should run `npm -i` or `npm install` in the terminal at the server level. This will automatically run the package.json dependencies at both back and front end levels. Then if the user wants they can run `npm run seed` to populate the database with a few users and posts.

## Features

This Progressive Web Application has offline abilities, is responsive and features encrypted user passwords.

### Passport

Before mongoose saves a document in the database, we want to hash the password with bcrypt, using the hashPassword method defined below in userSchema.methods.

```js
const bcrypt = require(`bcryptjs`);

userSchema.methods = {
  checkPassword: function (inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password);
  },
  hashPassword: plainTextPassword => {
    return bcrypt.hashSync(plainTextPassword, 10);
  },
};
```

The first argument is the password to hash, and the second parameter is the salt length to generate. Next, we use a pre-hook on the ‘save’ method for the user schema.

```js
userSchema.pre(`save`, function (next) {
  if (!this.password) {
    console.log(`=======NO PASSWORD PROVIDED=======`);
    next();
  } else {
    console.log(`hashPassword in pre save`);

    this.password = this.hashPassword(this.password);
    next();
  }
});
```

This is serial middleware, so the next() function is needed to move on to the next middleware method.

When a user logs in, passport will put the user object into req.session.passport.user. Then on future requests, the user won't need to log in again for the life of the session. The passport session is initialized in the server just as so.

```js
const passport = require("./passport");

app.use(passport.initialize());
app.use(passport.session()); // calls serializeUser and deserializeUser
```

These lines of code run on every request. serializeUser stores the user id to req.session.passport.user = {id:’..’}. While deserializeUser will check to see if this user is saved in the database, and if it is found it assigns it to the request as req.user = {user object}.

## Status & Future Development

Maps.......

Chat.......

## Contact

Created by [@agtravis](https://agtravis.github.io/portfolio) | [@ddhoang21](https://ddhoang21.github.io/My-Portfolio/) | [@FrantzCFelix](https://github.com/FrantzCFelix) | [@Issouf03](https:///) | [@remyguts](https:///)| [@resousa](https://github.com/resousa/)
