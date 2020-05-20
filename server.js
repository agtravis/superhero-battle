'use strict';

const express = require(`express`);
const mongoose = require(`mongoose`);
const morgan = require(`morgan`);
const session = require(`express-session`);
const MongoStore = require(`connect-mongo`)(session);
const dbConnection = require(`./database`);
const passport = require(`./passport`);
const app = express();
const path = require(`path`);
const portNum = 3001;
const PORT = process.env.PORT || portNum;

// Route requires
const routes = require(`./routes`);

// MIDDLEWARE
app.use(morgan(`dev`));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(
  process.env.MONGODB_URI || `mongodb://localhost/superherobattle`,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  }
);

// Sessions
app.use(
  session({
    secret: `qioe234!@%r47yq@%@$%ek9&&*87jadbv`, // pick a random string to make the hash that is generated secure
    store: new MongoStore({ mongooseConnection: dbConnection }),
    resave: false, // required
    saveUninitialized: false, // required
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session()); // calls the deserializeUser

// Routes
app.use(routes);

if (process.env.NODE_ENV === `production`) {
  app.use(express.static(`client/build`));
} else {
  app.use(express.static(`client/public`));
}

app.get(`*`, (req, res) => {
  res.sendFile(path.join(__dirname, `index.html`));
});

// Starting Server
app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
