const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const envConfigure = require('dotenv').config();
const path = require('path');
const port = process.env.PORT || 5000;
const helpers = require('./helperFunctions.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'client/build')));

app.post('/getContent', async (req, res) => {
  const year = req.body.year;
  const harvardParams = `apikey=${process.env.HARVARD_KEY}&yearmade=${year}&hasimage=1&size=100`;
  const dateQuery = helpers.getDateQuery(year);
  const sectionQuery = 'fq=news_desk:("World")&fq=section:("Front Page")';
  const harvardUrl = `https://api.harvardartmuseums.org/object?${harvardParams}`;
  const NYTUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?${dateQuery}&${sectionQuery}&api-key=${process.env.NYT_KEY}`;
  const urls = [harvardUrl, NYTUrl];

  const responseObject = await helpers.getParallel(urls, year);

  const { artwork, news } = responseObject;
  res.send({ artwork, news });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
