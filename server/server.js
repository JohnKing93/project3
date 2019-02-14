const express = require('express');
const passport = require('passport');
// const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const db = require('./models');

// Server definition
const app = express();
const PORT = process.env.PORT || 3001;
app.use(cookieParser());
require('./config/passport');

// Define middleware here
// app.use(cors);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client', 'build')));
}

// Add routes, both API and view
app.use(routes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'));
});

// Connect to DB
db.sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
    });
  })
  // eslint-disable-next-line no-console
  .catch(err => console.error(`Error connecting to DB ===> ${err}.`));
