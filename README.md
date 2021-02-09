# Superhero Battle

## UML

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

### Features

Some of the features of the app in action, showing the log in/log out capability with password validation (and updating password), the ability to search for users and characters, how the user's character roster functions and displays, and a table of user stats, ranked and organizable.

![Features](./client/public/screenshots/SuperheroBattleFeatures.gif)

### Battle Mode

Shows the fight flow, focusing on Team mode, shows changing a team member, and a victory followed by defeat.

![Battle Mode](./client/public/screenshots/SuperheroBattleFight.gif)

## Technologies

This app was built with :

- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/)
- [React](https://reactjs.org/)
- [Node](https://nodejs.org/en/)

### Back-end package.json dependencies:

```js
"dependencies": {
    "@agney/react-loading": "^0.1.2",
    "axios": "^0.21.1",
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
    "react-icons": "^4.1.0",
    "react-socks": "^2.1.0",
    "request": "^2.88.2"
  }
```

### Front-end package.json dependecies:

```js
  "dependencies": {
    "@testing-library/jest-dom": "^4.2.4",
    "@testing-library/react": "^9.5.0",
    "@testing-library/user-event": "^7.2.1",
    "axios": "^0.21.1",
    "bootstrap": "^4.4.1",
    "localforage": "^1.7.3",
    "react": "^16.13.1",
    "react-bootstrap": "^1.0.1",
    "react-dom": "^16.13.1",
    "react-router-dom": "^5.1.2",
    "react-scripts": "3.4.1"
  }
```

## Code Examples

### Offline capabilities

This app has the ability to detect whether or not the user has a connection to the internet, however, at present it does nothing with that information besides alerting the user to that fact with a conditionally rendered component indicating as such. It does this via the `NetworkDetector` - there's a big chunk of code, but click [here](https://github.com/agtravis/superhero-battle/blob/master/client/src/Hoc/NetworkDetector.jsx) to see it.

Instead of exporting `App` by itself, we first import that component in app.js, and then when we export app we run it as an argument through the NetworkDetector, like so:

```js
export default NetworkDetector(App);
```

While I am doing nothing with this offline capability, it is primed to do so at a future date, with the addition of JavaScript functions contained within the dependency `localForage`. Please see the repo for another app I have written [Book-It-Yourself](https://github.com/agtravis/book-it-yourself) to see this dependency in action.

### ServiceWorker

React comes with a built in service worker. It is really important for this application to take full advantage of this feature as the intended purpose for this app is to be a downloadable mobile (progressive) web app.

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

### Database Interactions

The main reason for writing this app was to generate reasons for me to learn and write creative front and back end communication. Here are a couple of examples of these `routes` and how they work. I'll start at the very back end, `server.js`:

```js
const app = express();
const routes = require(`./routes`);
app.use(routes);
```

These 3 lines (omitting the other lines in between) first call an instance of an express app into the `app` variable, so that we can do all sorts of things with the app, such as run a load of middleware through it. The first thing we do is import the file that contains the routes and tell the app about those routes via the `use` method.

```js
const router = require(`express`).Router();
const apiRoutes = require(`./api`);
router.use(`/api`, apiRoutes);
```

Inside the `routes` file, there is very little code. I have set the routes up such that they are broken into smaller files and indexed accordingly. This will help to keep the code simple and readable to humans. The basic breakdown of each file follows the same pattern we see in this root index file. The first line calls an instance of the router; the second gets literally the first part of the pathname of the route (and more practically all routes that have been grouped together in an individual file); the third tells that instance of the router about all those other routes, along with how to precede it as a string. This router will then be exported at the end of the file.

### /api/user/team/addmany/:id

This is the route that I will demonstrate. Ultimately we end up with a route that is as above, but due to breaking this up as previously mentioned, I have a file for each `api.js`, `user.js`, and `team.js`, because there are multiple routes that all use those paths before doing independent things. By the time we get to `team.js`, this is what that actual route looks like:

```js
router.route(`/addmany/:id`).put(userController.addManyCharactersToTeam);
```

where `/:id` is a route parameter variable which will be, in this instance, the ID of the user to update via `PUT`. I have all my actual methods being exported from a `controller` file, again due to conventions set to make code more legible to humans. Here is that method as in the controller file:

```js
  addManyCharactersToTeam: (req, res) => {
    User.updateOne(
      { _id: mongoose.Types.ObjectId(req.params.id) },
      { $push: { teams: { $each: req.body.characters } } }
    )
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(errorResponseCode).json(err));
  },
```

The method is being supplied with multiple pieces of data in different ways. The user ID as mentioned as a parameter (accessed via `req.params.id`), and also some data in the `req.body`. I'll detail that data in a moment, but for now suffice it to say that `req.body.characters` is an array.

So the User (which is a model set forth in `database/models/User.js` and imported into the controller) is told to update one user in the database, located by the unique `_id` property that `mongodb` uses, and then `$push`es into that defined user property (teams) `$each` of the items in the array sent in the body of the put request.

That completes the back end part of this route. Now to the front end, inside the `utils` folder as a subdirectory of `React`'s standard `client/src` file structure, and as part of the `API.js` file, we have the following code:

```js
  addManyCharactersToTeam(id, members) {
    return axios.put(`/api/user/team/addmany/${id}`, {
      characters: members,
    });
  }
```

This method takes the 2 pieces of data, again the user id and the array, and structures it to be sent to the back end in the way we have discussed. We can see here that the data `members`, which is an array, is in fact made a value of a property `characters`, so that it can be accessed on the back end. Now we are ready to actually call this method as a part of the app. Here is a segment of code with this in operation:

```js
    const members = [];
    for (const member of this.state.team) {
      members.push(member);
    }
    API.emptyTeam(this.props.currentUser._id)
      .then(
        API.addManyCharactersToTeam(this.props.currentUser._id, members)
          .then(() => {
            // ...
```

It is not necessary to show the full code, but the idea can be communicated. This is a function where the user has selected characters to make a team with which to fight a team battle. The function itself is actually a callback function of another API request which first empties the array property which is to be repopulated.

All the backend routes follow the same pattern, following the MVC (Model, View, Controller) convention.

### CSS Animations

The principle for all CSS animations are the same. Set a starting condition `A`, set a finishing condition `B`, and then set how to get from `A` to `B` with a transition. This is done by applying and removing `classes`. The key factor with my app was getting this to work with `React` components.

Here is the function inside my `Header` component that does the hard work:

```js
translateForm = form => {
  const body = document.getElementsByClassName(`main-body`)[0];
  if (form.classList.contains(`translate`)) {
    this.props.addAndRemoveOneClass(form, `translateBack`, `translate`);
    this.props.addAndRemoveOneClass(body, `translateBodyBack`, `translateBody`);
  } else {
    this.props.addAndRemoveOneClass(form, `translate`, `translateBack`);
    this.props.addAndRemoveOneClass(body, `translateBody`, `translateBodyBack`);
  }
};
```

The classes for the transition look more complicated than they are, essentially they have to account for cross-browser compatibility with multiple lines that all say the same thing - how long the transition takes. Then they set a property value to end up at. The transition will start at either whatever is currently specified in the styling for the target element, or at the default value (usually just zero), and end up at this new value.

```css
.translate {
  -webkit-transition: var(--log-in-speed);
  -moz-transition: var(--log-in-speed);
  -ms-transition: var(--log-in-speed);
  -o-transition: var(--log-in-speed);
  transition: var(--log-in-speed);
  margin-top: 0px;
}
.translateBack {
  -webkit-transition: var(--log-in-speed);
  -moz-transition: var(--log-in-speed);
  -ms-transition: var(--log-in-speed);
  -o-transition: var(--log-in-speed);
  transition: var(--log-in-speed);
  margin-top: var(--log-in-start-point);
}
```

I have defined a lot of variables in the root CSS file in the client subdirectory folder `src` so they can be easily changed if necessary.

Next you basically define a trigger that adds the new class. We do this with an event listener, which in `React` is a prop defined as `onClick` (or whatever relates to the event you are working with). So in my component, I have an element that, when clicked, calls the above function, and passes to it to which element to apply the transition, in this case either the sign up or log in form (defined by the `id` of the form elsewhere).

It then uses a conditional to see what state the form is currently in (`A` or `B`), and then either transitions or reverts the form accordingly. In this example, the animation of the form also requires the animation of the rest of the body (here named body but actually only the body's descendents after this point in the code), so this is applied also.

I use the function `addAndRemoveOneClass` so frequently that I have `DRY`ed out my codebase and prop-drilled it through to wherever is necessary, if I was using functional components, I would be using `context` for this.

## Setup

If the user just wants to use the app, all they have to do is sign up for an account!

If the user has forked the repo and wants to see the code and potentially make changes to it, they should run `npm -i` or `npm install` in the terminal at the server level. This will automatically run the package.json dependencies at both back and front end levels. Then in order to set up the local MongoDB with characters, the user should use the command `npm run seed` to populate the database.

If the user intends to deploy on **Heroku** then in the `package.json` file, locate the following line:

```js
"heroku-postbuild": "npm run build",
```

and replace it with:

```js
"heroku-postbuild": "npm run build && npm run seed"
```

remembering to remove that extra code before the next push to master. This runs the seed file in production, a necessary step if creating your own new database, however if not removed and a user has used any IDs from this database in their account, the new population will all have new autogenerated IDs and the old will be deleted, creating bugs and returning failed or empty requests. This is the main disadvantage of using MongoDB as opposed to SQL, where you can designate IDs. An alternative would be to search the database on a different property when required, but this might take up more processing power depending on the context.

Another alternative would be to provide a central database for any user to access for any purpose, potentially with permission and financial restrictions. This would essentially be an API, and in fact the data I am using is from (as mentioned) `superheroapi`. My reason for copying the freely available information is so that my app, heavily dependent on the third party, would continue to function should that API cease to exist.

## Features

This Progressive Web Application has offline abilities, is responsive and features encrypted user passwords, and has a few css animations thrown in for good measure.

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
app.use(passport.session());
```

These lines of code run on every request. serializeUser stores the user id to req.session.passport.user = {id:’..’}. While deserializeUser will check to see if this user is saved in the database, and if it is found it assigns it to the request as req.user = {user object}.

## Status & Future Development

## Contact

Created by [@agtravis](https://agtravis.github.io/portfolio)
