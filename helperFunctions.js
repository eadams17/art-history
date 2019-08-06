const request = require('request');
const seedData = require('./data.json');
const dateGenerator = require('random-date-generator');
const dateFormat = require('dateformat');

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

const getDateQuery = year => {
  const startDate = new Date(year, 1, 1);
  const endDate = new Date(year, 12, 31);
  const randomDate = dateGenerator.getRandomDateInRange(startDate, endDate);
  const dateString = dateFormat(randomDate, 'yyyy-mm-dd');
  return `fq=pub_date:("${dateString}")`;
};

module.exports = {
  getParallel,
  getDateQuery
};
