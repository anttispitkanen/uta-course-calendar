import React from 'react';
import moment from 'moment';
import './Lesson.scss';

const Lesson = ({ location, start, end, additionalInfo }) => (
  <li className="single-lesson">
    <div>{additionalInfo || null}</div>
    <div>{location}</div>
    <div>{moment(start).format('ddd D.M.YYYY')}</div>
    <div>
      {moment(start).format('H.mm')} - {moment(end).format('H.mm')}
    </div>
  </li>
);

export default Lesson;
