import React from 'react';
import Course from './Course';
import './Preview.scss';

const Preview = ({ course, status }) => {
    if (status === 'FETCHING') return (
        <div className="preview-placeholder">
            <div className="spinner"></div>
            <span>Fetching...</span>
        </div>
    );

    if (status === 'ERROR') return <div className="preview-placeholder">Could not find course</div>;

    if (!course) return (
        <div className="preview-placeholder">
            <i className="icon fa fa-arrow-up"></i>
            <span>Search for a course above</span>
        </div>
    );

    return <Course course={course} />;
}

export default Preview;
