This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# The Art of History

An application that lets you see artwork and headlines of historical events from the same time period.

## Setup

1. Run `yarn run setup`
2. Run `yarn start`

The app should now be accessible from `http://localhost:3000/`

## Overview

This application uses **React** on the frontend and **Node/Express** on the backend. This application also utilizes two third party APIs:

- [Harvard Art Museums](https://github.com/harvardartmuseums/api-docs)
- [New York Times Article Search](https://developer.nytimes.com/docs/articlesearch-product/1/overview)

The application features a timeline slider at the top where the user can change the year (from between 1900 and 2000 at 10 breakpoints). Below the timeline, an image of an artwork in the collection is rendered along with its information (title, artist(s) name, etc). At the bottom, there is a news ticker that scrolls real New York Times headlines from that same time period.

When the user changes the year on the slider, a `POST` request is made to the `getContent` route on the backend with that year. In this `getContent` API, two url strings are built for both of the 3rd party APIs. They are then passed to a function that handles parallel requests. Within this function, there are several helper functions that perform various checks on the received data (i.e. year is a match, image url is present, etc).

There is also a seed data file that is used as a backup in the scenario where the 3rd party API returns a failed response. After these checks, a response object is built with two properties `artwork` and `news` to be passed back to the frontend.

## Technology

I chose to use **React** (specifically bootsrapped with `create-react-app`) for building out the UI. I chose **React** because it's fast, well-documented and I love the component structure. For styling, I decided to use `CSS Modules`. I like that all styles are scoped locally, helping to keep things more organized. I also utilized a combination of `CSS Grid` and `Flexbox` to make the application responsive. For the backend, I chose to use **Node/Express** because it's lightweight and easily customized.

## Optimizations & Considerations

Given more time, I think I would have liked to add a third API for fetching a song based on the selected time era. The main idea behind this project is to give the user more context around the artwork. Things like music and historical events give great insight into the context of artwork of a certain time period. Given that this application is supposed to provide a combination of randomly selected images and headlines, I didn't feel that it was necessary to have any sort of database.
