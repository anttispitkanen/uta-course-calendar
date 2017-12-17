'use strict';
/**
 * Parsing all lessons of a course as an array
 */

const Component = require('immutable-ics').Component;
const Property = require('immutable-ics').Property;

/**
 * Calendar property constants
 */
const VCALENDAR = 'VCALENDAR';
const VEVENT = 'VEVENT';
const VERSION = 'VERSION';
const DTSTART = 'DTSTART';
const DTEND = 'DTEND';
const DATE = 'DATE';
const SUMMARY = 'SUMMARY';
const LOCATION = 'LOCATION';
const VALARM = 'VALARM';

/**
 * Create an array of specific lessons. Exceptions not filtered out yet.
 * @param {*} teaching
 * @param {*} course
 */
const parseLessonArray = (teaching, course) => {
    const lessons = [];
    const weekMs = 7 * 24 * 60 * 60 * 1000; // number of milliseconds in one week
    const iDate = new Date(teaching.alkuaika);
    const startTime = teaching.alkutunnit;
    const endTime = teaching.lopputunnit;
    let start, end;
    const location = teaching.paikka;
    const name = course.name;
    const code = course.code;

    while (true) {
        start = new Date(iDate);
        end = new Date(iDate);
        start.setHours(startTime);
        end.setHours(endTime);

        lessons.push({
            name,
            code,
            location,
            start,
            end
        });

        if (iDate.getTime() > teaching.toistuvuus_saakka) break;

        iDate.setTime(iDate.getTime() + weekMs);
    }

    return lessons;
}

/**
 * Take the lessons array and apply the exceptions,
 * i.e. cancelled lessons and changed locations.
 * @param {*} teaching
 * @param {*} lessons
 */
const applyExceptions = (teaching, lessons) => {
    const exceptionTimes = teaching.poikkeusajat;
    let additionalInfo;
    let location;
    let startTime;
    let exceptionLesson;
    const filteredLessons = [];

    lessons.map(lesson => {
        startTime = new Date(lesson.alku);

        exceptionLesson = exceptionTimes.find(a => (
            startTime.toLocaleDateString() === new Date(a.alkuaika).toLocaleDateString() &&
            startTime.toLocaleDateString() === new Date(a.alkuaika).toLocaleDateString()
        ));

        if (exceptionLesson) {
            additionalInfo = exceptionLesson.lisatiedot;
            location = exceptionLesson.paikka;

            if (/ei opetusta/.test(additionalInfo.toLowerCase())) {
                // if there is no teaching we don't want to include that lesson
                return;
            } else if (location) {
                // if (exceptional) location is specified, inject that into the lesson
                filteredLessons.push({
                    ...lesson,
                    location
                });
            }
        } else {
            // if there's no corresponding exception, inject the lesson as is
            filteredLessons.push(lesson);
        }
    });

    return filteredLessons;
}

/**
 * Parses an array of lessons out of the course data.
 * @param {*} teaching
 * @param {*} course
 */
const parseLessons = (teaching, course) => {
    const lessonArray = parseLessonArray(teaching, course);
    return applyExceptions(teaching, lessonArray);
}

/**
 * Parses a calendar event out of the lesson object.
 * @param {*} lesson
 */
const parseLesson = lesson => new Component({
    name: VEVENT,
    propertise: [
        new Property({
            name: DTSTART,
            value: lesson.start
        }),
        new Property({
            name: DTEND,
            value: lesson.end
        }),
        new Property({
            name: SUMMARY,
            value: `${lesson.name} (${lesson.code})`
        }),
        new Property({
            name: LOCATION,
            value: lesson.location
        })
    ]
});

/**
 * Parses a calendar object out of the lessons array.
 * @param {*} lessons
 */
const parseCalendar = lessons => new Component({
    name: VCALENDAR,
    properties: [
        new Property({ name: VERSION, value: 2 })
    ],
    components: lessons.map(lesson => (
        parseLesson(lesson)
    ))
});

module.exports = { parseLessons, parseCalendar };
