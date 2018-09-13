/**
 * Utils for building the calendar ics-file
 */

import { Component, Property } from 'immutable-ics';

/**
 * Calendar property constants
 */
const VCALENDAR = 'VCALENDAR';
const VEVENT = 'VEVENT';
const VERSION = 'VERSION';
const DTSTART = 'DTSTART';
const DTEND = 'DTEND';
const DTSTAMP = 'DTSTAMP';
const SUMMARY = 'SUMMARY';
const LOCATION = 'LOCATION';
const VALARM = 'VALARM';
const ACTION = 'ACTION';
const DISPLAY = 'DISPLAY';
const DESCRIPTION = 'DESCRIPTION';
const TRIGGER = 'TRIGGER';

const calendarBuilder = groups => {
  const lessons = [];
  groups.map(group =>
    group.lessons.map(lessonArray =>
      lessonArray.map(lesson => lessons.push(lesson)),
    ),
  );

  const calendar = parseCalendar(lessons);
  return calendar;
};

const parseCalendar = lessons =>
  new Component({
    name: VCALENDAR,
    properties: [new Property({ name: VERSION, value: 2 })],
    components: lessons.map(lesson => parseLesson(lesson)),
  });

const parseLesson = lesson =>
  new Component({
    name: VEVENT,
    properties: [
      new Property({
        name: DTSTART,
        value: new Date(lesson.start),
      }),
      new Property({
        name: DTEND,
        value: new Date(lesson.end),
      }),
      new Property({
        name: SUMMARY,
        value: `${lesson.name} (${lesson.code})`,
      }),
      new Property({
        name: DESCRIPTION,
        value:
          `${lesson.groupType}` +
          (lesson.groupName ? `\n${lesson.groupName}` : '') +
          (lesson.additionalInfo ? `\n${lesson.additionalInfo}` : ''),
      }),
      new Property({
        name: LOCATION,
        value: lesson.location,
      }),
      new Property({
        name: DTSTAMP,
        value: new Date(),
      }),
    ],
    components: [
      new Component({
        name: VALARM,
        properties: [
          new Property({
            name: ACTION,
            value: DISPLAY,
          }),
          new Property({
            name: DESCRIPTION,
            value: lesson.name,
          }),
          new Property({
            name: TRIGGER,
            value: '-PT60M',
          }),
        ],
      }),
    ],
  });

export { calendarBuilder };
