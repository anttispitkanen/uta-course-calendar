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

    if (course) {
        res.json(course);
    } else {
        res.json({ error: `No course found with id ${id}` });
    }
});

app.get('/calendar', async (req, res) => {
    try {
        const id = req.query.id;
        const course = courses.find(a => a.id == id);

        const teaching = course._opsi_opryhmat.find(a => a.id_opsi_opetus == 1);

        if (!teaching) {
            return res.json({ error: 'No lectures on this course' });
        }

        const lessonTimes = teaching.ajat;

        if (!lessonTimes || lessonTImes.length === 0) {
            return res.json({ error: 'No lecture times provided, try again later' });
        }

        const calendar = parseCalendar(parseLessons(lessonTimes, course));

        // TODO: naming of files
        const FILE_PATH = './temp/testi-ics.ics';

        await writeFilePromise(fs, FILE_PATH, calendar);
        await downloadPromise(res, FILE_PATH);
        await unlinkPromise(fs, FILE_PATH);
    } catch (e) {
        console.error(e);
        res.json({ error: e });
    }
});

app.post('/download', async (req, res) => {
    console.log(req.body.groups);
    res.json({ message: 'vastaanotettu :D' });
});
