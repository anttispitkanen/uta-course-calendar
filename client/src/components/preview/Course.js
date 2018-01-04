import React, { Component } from 'react';
import './Course.scss';

class Course extends Component {
    render() {
        console.log(this.props.course);
        return (
            <div className="course-wrapper">This is the course over here!</div>
        );
    }
}

export default Course;
