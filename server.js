'use strict';

require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const Component = require('immutable-ics').Component;
const Property = require('immutable-ics').Property;

const courses = require('./courses.json');
// console.log(courses.find(a => a.id === 36871))

const {
    writeFilePromise,
    downloadPromise,
    unlinkPromise
} = require('./helpers');

const VCALENDAR = 'VCALENDAR';
const VEVENT = 'VEVENT';
const VERSION = 'VERSION';
const DTSTART = 'DTSTART';
const DTEND = 'DTEND';
const DATE = 'DATE';
const SUMMARY = 'SUMMARY';
const VALARM = 'VALARM';

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('listening on ' + PORT));

const calendar = new Component({
    name: VCALENDAR,
    properties: [
        new Property({ name: VERSION, value: 2 })
    ],
    components: [
        new Component({
            name: VEVENT,
            properties: [
                new Property({
                    name: DTSTART,
                    value: new Date('2017-12-10 23:00:00')
                }),
                new Property({
                    name: DTEND,
                    value: new Date('2017-12-10 13:00:00')
                }),
                new Property({
                    name: SUMMARY,
                    // parameters: { VALUE: String },
                    value: 'Tämä on Pötkön testitapahtuma :D'
                })
            ],
            components: [
                new Component({
                    name: VALARM,
                    properties: [
                        new Property({
                            name: 'ACTION',
                            value: 'DISPLAY'
                        }),
                        new Property({
                            name: 'DESCRIPTION',
                            value: 'This is a Poetkoe-made event description'
                        }),
                        new Property({
                            name: 'TRIGGER',
                            value: '-P60M'
                        })
                    ]
                })
            ]
        })
    ]
});

// console.log(calendar.toString());

app.get('/', async (req, res) => {
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

app.get('/course', async (req, res) => {
    const id = req.query.id;
    const course = courses.find(a => a.id == id);
    res.json(course);
});
