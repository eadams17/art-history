const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const envConfigure = require('dotenv').config();
const fetch = require('node-fetch');
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const getRandomKey = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

app.post('/getArtwork', (req, res) => {
  const year = req.body.year;
  const params = `apikey=${
    process.env.KEY
  }&yearmade=${year}&hasimage=1&size=100`;
  const URL = `https://api.harvardartmuseums.org/object?${params}`;
  fetch(URL)
    .then(res => res.json())
    .then(data => {
      let artObjects = {};
      let i = 0;
      data.records.forEach(record => {
        console.log('lalala');
      });
      data.records.forEach(record => {
        const yearCheck = record.datebegin === year || record.dateend === year;
        // check that image url exists and artwork was started the same year as search query
        if (record.primaryimageurl && yearCheck) {
          artObjects[i] = record;
          i += 1;
        }
      });
      const key = getRandomKey(0, i);
      const artwork = artObjects[key];

      const responseObject = {
        title: artwork.title,
        description: artwork.medium ? artwork.medium : artwork.technique,
        artist: artwork.people,
        year: `began or completed in ${year}`,
        imageUrl: artwork.primaryimageurl
      };

      res.send({ artwork: responseObject });
    })
    .catch(err => {
      res.redirect('/error');
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
