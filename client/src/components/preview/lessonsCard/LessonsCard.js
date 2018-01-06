import React from 'react';
import classNames from 'classnames';
import Lesson from './lesson/Lesson';
import './LessonsCard.scss';

const LessonsCard = ({ lessons, groupName, groupType, selected, toggleGroupSelected, id }) => (
    lessons && // this ensures we don't render an empty LessonsCard
    <div className={classNames('lessons-card', { 'selected': selected })}>
        <div className="lessons-card-select-container">
            <span>Select</span>
            <input
                name="select-toggle"
                type="checkbox"
                checked={selected}
                onChange={() => toggleGroupSelected(id, {
                    lessons,
                    groupName,
                    groupType,
                    id
                })}
            />
        </div>
        <div className="lessons-card-header">
            <h3>{groupType}</h3>
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
