import React from 'react';
import Lesson from './Lesson';
import './LessonsCard.scss';

// TODO: find out the rest of these
const lessonIdCodes = {
    1: 'Lectures',
    2: 'Pienryhmäopetus',
    6: 'Seminaari',
    7: 'Harjoitukset'
};

const LessonsCard = ({ lessons, groupName, groupType }) => (
    lessons && // this ensures we don't render an empty LessonsCard
    <div className="lessons-card">
        <div className="lessons-card-header">
            <h3>{lessonIdCodes[groupType]}</h3>
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
