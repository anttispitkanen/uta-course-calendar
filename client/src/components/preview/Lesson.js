import React from 'react';
import './Lesson.scss';

const Lesson = ({ name, code, location, start, end, groupName, groupType, additionalInfo }) => (
    <li className="single-lesson">
        {/* <div>{name} ({code}) {groupName} {additionalInfo}</div> */}
        {/* <div>{groupName} {additionalInfo}</div> */}
        <div>{additionalInfo || null}</div>
        {/* <div>{groupType !== 1 ? groupType : null}</div> */}
        <div>{location}</div>
        <div>{start.toLocaleDateString()}</div>
        <div>{start.toLocaleTimeString()} - {end.toLocaleTimeString()}</div>
    </li>
);

export default Lesson;
