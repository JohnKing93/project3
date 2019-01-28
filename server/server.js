const express = require('express');
const passport = require('passport');
// const cors = require('cors');
const routes = require('./routes');
const db = require('./models');

// Server definition
const app = express();
const PORT = process.env.PORT || 3001;

require('./config/passport');

// Define middleware here
// app.use(cors);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// Add routes, both API and view
app.use(routes);

// Connect to DB
db.sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  });
}).catch((err) => {
  console.error(`Error connecting to DB ===> ${err}.`);
});
