import React from 'react';
import Lesson from './Lesson';
import './LessonsCard.scss';

const lessonIdCodes = {
    1: {
        fi: 'Luennot',
        en: 'Lectures'
    },
    2: {
        fi: 'Pienryhmäopetus',
        en: 'Tutorials'
    },
    3: { // TODO: find this out (could be essay?)
        fi: null,
        en: null
    },
    4: {
        fi: 'Ryhmätyöskentely',
        en: 'Group work'
    },
    5: {
        fi: 'Itsenäinen työskentely',
        en: 'Independent work'
    },
    6: {
        fi: 'Seminaari',
        en: 'Seminar'
    },
    7: {
        fi: 'Harjoitukset',
        en: 'Exercises'
    },
    8: {
        fi: 'Lukupiiri',
        en: 'Study circle'
    },
    9: { // TODO: find this out (if exists)
        fi: null,
        en: null
    },
    10: { // TODO: find this out (if exists)
        fi: null,
        en: null
    }
};

const lang = teachingLanguage => teachingLanguage === 'fi' ? 'fi' : 'en';

const LessonsCard = ({ lessons, groupName, groupType, teachingLanguage }) => (
    lessons && // this ensures we don't render an empty LessonsCard
    <div className="lessons-card">
        <div className="lessons-card-header">
            <h3>{lessonIdCodes[groupType][lang(teachingLanguage)]}</h3>
            <h4>{groupName || null}</h4>
        </div>
        <ul>
            {lessons.map(lesson => lesson.map(l => (
                <Lesson
                    key={l.start}
                    {...l}
                />
            )))}
        </ul>
    </div>
);

export default LessonsCard;
