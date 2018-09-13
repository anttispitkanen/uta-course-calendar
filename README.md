# UTA course calendar

This service is intended for students of [University of Tampere](https://www.uta.fi/). The app lets the user copypaste a course url from the curriculum, pick the parts they want, and download an .ics-file to import to a calendar. Running live on Heroku [here](https://utacoursecalendar.herokuapp.com/).

## What is this?

An app that helps students build an electronic calendar for their studies in University of Tampere with one click.

## Why?

I study at UTA myself and got tired of writing my classes in my calendar by hand, so I built this. I happily spent hours to save a few minutes. No more writing by hand!

## How does it work?

The student

1. Finds their course in the University of Tampere study schedule
2. Copies the URL
3. Pastes the URL into this app
4. Picks the lectures, exercises, tutorials etc. they want to save to their calendar and
5. Hits the download button to get a ready made .ics-file to be imported to a calendar app

The course schedule information is fetched from the [open data API](https://opendata.uta.fi) of University of Tampere. The chosen lectures, exercises or other lessons are then parsed to an [.ics-file](https://en.wikipedia.org/wiki/ICalendar), that can be imported to basically any
electronic calendar.

## Is this official?

This application is built and maintained by a third party (=a UTA student) and is not an official tool provided by University of Tampere.

---

# Tech

Front-end:

- React (Create React App), React Router 4
- Redux, React Redux, Redux Saga
- `immutable-ics` for creating the .ics-files
- `js-file-download` as a download helper

Back-end:

- Node.js
- Express

Hosting:

- Heroku
- GitHub
