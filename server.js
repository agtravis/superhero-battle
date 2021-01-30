"use strict";

const express = require(`express`);
const mongoose = require(`mongoose`);
const morgan = require(`morgan`);
const session = require(`express-session`);
const dbConnection = require(`./database`);
const MongoStore = require(`connect-mongo`)(session);
const passport = require(`./passport`);
const app = express();
const path = require(`path`);
const portNum = 3001;
const PORT = process.env.PORT || portNum;

const routes = require(`./routes`);

app.use(morgan(`dev`));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(
  process.env.MONGO_CONNECTION || `mongodb://localhost/superherobattle`,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  }
);

app.use(
  session({
    secret: `shattered-rocks`,
    store: new MongoStore({ mongooseConnection: dbConnection }),
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

if (process.env.NODE_ENV === `production`) {
  app.use(express.static(`client/build`));
} else {
  app.use(express.static(`client/public`));
}

app.get(`*`, (req, res) => {
  res.sendFile(path.join(__dirname, `index.html`));
});

app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
