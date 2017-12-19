'use strict';

require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const courses = require('./courses.json');
const { parseLessons, parseCalendar } = require('./parseCalendar');

const {
    writeFilePromise,
    downloadPromise,
    unlinkPromise
} = require('./helpers');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('listening on ' + PORT));

app.get('/', async (req, res) => {
    // const FILE_PATH = './temp/testi-ics.ics';
    // try {
    //     await writeFilePromise(fs, FILE_PATH, calendar);
    //     await downloadPromise(res, FILE_PATH);
    //     await unlinkPromise(fs, FILE_PATH);
    // } catch (e) {
    //     console.error(e);
    //     res.json({ error: e });
    // }
    res.json({ jou: 'joujou :DD' })
});

app.get('/course', async (req, res) => {
    const id = req.query.id;
    const course = courses.find(a => a.id == id);

    // const teaching = course._opsi_opryhmat.find(a => a.id_opsi_opetus == 1);
    // const course = teaching.ajat[0];

    // const calendar = parseCalendar(parseLessons(teaching, course));

    res.json(course);
});

app.get('/calendar', async (req, res) => {
    const id = req.query.id;
    const course = courses.find(a => a.id == id);

    const teaching = course._opsi_opryhmat.find(a => a.id_opsi_opetus == 1);
    const lessonTimes = teaching.ajat;

    const calendar = parseCalendar(parseLessons(lessonTimes, course));
    // console.log(calendar.toString())

    // res.send(calendar.toString());

    const FILE_PATH = './temp/testi-ics.ics';

    try {
        await writeFilePromise(fs, FILE_PATH, calendar);
        await downloadPromise(res, FILE_PATH);
        await unlinkPromise(fs, FILE_PATH);
    } catch (e) {
        console.error(e);
        res.json({ error: e });
    }
});
