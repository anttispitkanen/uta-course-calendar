import React from 'react';
import Course from './Course';
import './Preview.scss';

const Preview = ({ course, status }) => {
    if (status === 'FETCHING') return (
        <div id="preview" className="preview-placeholder">
            <div className="spinner"></div>
            <span>Fetching...</span>
        </div>
    );

    if (status === 'ERROR') return (
        <div id="preview" className="preview-placeholder">Could not find course</div>
    );

    if (!course) return (
        <div id="preview" className="preview-placeholder">
            <i className="icon fa fa-arrow-up"></i>
            <span>Search for a course above</span>
        </div>
    );

    return (
        <div id="preview" className="preview-placeholder">
            <Course course={course} />
        </div>
    );
}

export default Preview;
