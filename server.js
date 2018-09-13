'use strict';

require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

/* courses.json automatically created with "npm run update" */
const courses = require('./courses.json');

const app = express();
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(`${__dirname}/client/build`));
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`listening on ${PORT} in ${process.env.NODE_ENV} mode`),
);

// force HTTPS redirect
if (process.env.NODE_ENV === 'production') {
  app.all('*', (req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      res.redirect(`https://${req.get('host')}${req.url}`);
    } else {
      next();
    }
  });
}

app.get('/test', async (req, res) => {
  res.json({ message: 'API works whoopee :DD' });
});

app.get('/course', async (req, res) => {
  const id = req.query.id;
  const course = courses.find(a => a.id == id);
  if (course) {
    res.json(course);
  } else {
    res.json({ error: `No course found with id ${id}` });
  }
});

// Respond to all requests with index.html and let React Router do the routing.
app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/client/build/index.html`);
});
