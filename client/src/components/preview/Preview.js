import React, { Component } from 'react';

class Preview extends Component {

    render() {
        const { course, status } = this.props;

        if (status === 'FETCHING') {
            return <div>Fetching...</div>;
        }

        if (status === 'ERROR') {
            return <div>Could not find course</div>;
        }

        if (!course) {
            return <div>Search for a course above</div>;
        }

        console.log(this.props.course);
        return (
            <div>Course found, check console!</div>
        );
    }
}

export default Preview;
