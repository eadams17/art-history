const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
const envConfigure = require('dotenv').config();
const seedData = require('./data.json');
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// artwork was started or finished around the same year as search query
const yearCheck = (beginDate, endDate, year) => {
  if (beginDate >= year - 1 && beginDate <= year + 1) {
    return true;
  } else if (endDate >= year - 1 && endDate <= year + 1) {
    return true;
  } else {
    return false;
  }
};

const getDateQuery = year => {
  let month,
    day = '';
  month = getRandomNumber(1, 12);
  day = getRandomNumber(1, 12);
  // add 0 if necessary for param formatting
  if (month.toString().length !== 2) {
    month = `0${month}`;
  }
  if (day.toString().length !== 2) {
    day = `0${day}`;
  }
  return `fq=pub_date:("${year}-${month}-${day}")`;
};

const requestAsync = url => {
  return new Promise((resolve, reject) => {
    request(url, (err, response, body) => {
      if (err) return reject(err, response, body);
      resolve(JSON.parse(body));
    });
  });
};

const getParallel = async (urls, year) => {
  //transform requests into Promises, await all
  try {
    var data = await Promise.all(urls.map(requestAsync));
  } catch (err) {
    console.error(err);
  }
  let artObjects = {};
  let i = 0;
  data[0].records.forEach(record => {
    // check that image url exists and date of artwork is valid
    if (
      record.primaryimageurl &&
      yearCheck(record.datebegin, record.dateend, year)
    ) {
      artObjects[i] = record;
      i += 1;
    }
  });
  // choose an artwork from the matches at random
  const key = getRandomNumber(0, i);
  // use seed data for artwork/headlines in case of API limit
  const artwork = artObjects[key] ? artObjects[key] : seedData.artwork[year];
  const newsData = data[1].fault
    ? seedData.news[year]
    : data[1].response.docs.map(article => article.headline.main);
  const {
    title,
    medium,
    technique,
    people,
    dated,
    dimensions,
    primaryimageurl
  } = artwork;

  const responseObject = {
    artwork: {
      title: title,
      description: medium ? medium : technique,
      artist: people,
      year: dated,
      dimensions: dimensions,
      imageUrl: primaryimageurl
    },
    news: newsData
  };

  return responseObject;
};

app.post('/getContent', async (req, res) => {
  const year = req.body.year;
  const harvardParams = `apikey=${
    process.env.HARVARD_KEY
  }&yearmade=${year}&hasimage=1&size=100`;
  const dateQuery = getDateQuery(year);
  const sectionQuery = 'fq=news_desk:("World")&fq=section:("Front Page")';
  const harvardUrl = `https://api.harvardartmuseums.org/object?${harvardParams}`;
  const NYTUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?${dateQuery}&${sectionQuery}&api-key=${
    process.env.NYT_KEY
  }`;
  const urls = [harvardUrl, NYTUrl];

  const responseObject = await getParallel(urls, year);

  const { artwork, news } = responseObject;
  res.send({ artwork, news });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
