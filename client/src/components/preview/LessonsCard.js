import React from 'react';
import Lesson from './Lesson';
import './LessonsCard.scss';

// TODO: find out the rest of these
const lessonIdCodes = {
    1: 'Lectures',
    2: 'Harjoitukset',
    7: 'Pienryhmäopetus'
};

const LessonsCard = ({ lessons, groupName, groupType }) => (
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
