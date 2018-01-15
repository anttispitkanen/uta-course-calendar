import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import onClickOutside from 'react-onclickoutside';
import help1 from '../../images/help-1.png';
import './Help.scss';

class Help extends Component {
    handleClickOutside = e => {
        this.closeModal();
    }

    closeModal = () => {
        this.props.history.replace({ pathname: '/' });
    }

    render() {
        return (
            <div className="help-wrapper">
                <div className="help-close-wrapper">
                    <i className="help-close fa fa-times"
                        onClick={this.closeModal} />
                </div>

                <h2>UTA course calendar - FAQ</h2>

                <div className="help-section">
                    <h3 className="help-section-heading">
                        What is this?
                    </h3>
                    <p className="help-section-text">
                        This is an app that helps you build an electronic calendar
                        out of your studies in University of Tampere easily. See <Link to="/howto">
                        How to use</Link> for instructions.
                    </p>
                </div>

                <div className="help-section">
                    <h3 className="help-section-heading">
                        Why?
                    </h3>
                    <p className="help-section-text">
                        I study at UTA myself and got tired of writing my classes in
                        my calendar by hand, so I built this.
                    </p>
                </div>

                <div className="help-section">
                    <h3 className="help-section-heading">
                        How does it work?
                    </h3>
                    <p className="help-section-text">
                        The course schedule information is fetched from the <A href="https://opendata.uta.fi">
                        open data API</A> of University of Tampere. The chosen lectures,
                        exercises or other lessons are then parsed to an .ics-file (ICAL,
                        standard calendar format), that can be imported to basically any
                        electronic calendar.
                    </p>
                    <p className="help-section-text">
                        Instructions on how to import to <A href="https://support.google.com/calendar/answer/37118">
                        Google Calendar</A>.
                    </p>
                </div>

                <div className="help-section">
                    <h3 className="help-section-heading">
                        Does this work with any course?
                    </h3>
                    <p className="help-section-text">
                        This works with any course where the course teacher has correctly inserted
                        the course schedule into the system. This is, according to doing some testing,
                        about 95% of all courses.
                    </p>
                    <p className="help-section-text">
                        A correcltly inserted course schedule, that will work with this app, looks
                        something like the example below in the UTA study schedule. The lectures, tutorials
                        and whatever the course includes, are listed under the heading "Teaching".
                    </p>
                    <img className="help-image" src={help1} alt="example screenshot" />
                    <p className="help-section-text">
                        There are also cases where the teacher has not inserted the information correctly.
                        In such case this app cannot create the calendar.
                    </p>
                </div>

                <div className="help-section">
                    <h3 className="help-section-heading">
                        Is the created calendar correct?
                    </h3>
                    <p className="help-section-text">
                        The calendar is correct in cases where the course teacher has inserted the schedule correctly.
                        This app gets all the information it has through the UTA open data API, which is updated daily.
                    </p>
                    <p className="help-section-text">
                        However, I can't promise that the teachers or the API
                        are always 100% correct, so it's advised that you don't trust it blindly.
                    </p>
                </div>

                <div className="help-section">
                    <h3 className="help-section-heading">
                        Can I download multiple courses at once?
                    </h3>
                    <p className="help-section-text">
                        No. But you can download as many subsequent courses as you wish, and import them separately to your calendar.
                    </p>
                </div>

                <div className="help-section">
                    <h3 className="help-section-heading">
                        What if I don't know my tutorial/exercise group yet?
                    </h3>
                    <p className="help-section-text">
                        You can download parts of the same course separately, and import those to your calendar separately.
                    </p>
                    <p className="help-section-text">
                        For example, you can download the lectures before the course starts. Then, when you get to know
                        your (possible) exercise group, you can download that.
                    </p>
                </div>

                <div className="help-section">
                    <h3 className="help-section-heading">
                        How to use a calendar app?
                    </h3>
                    <p className="help-section-text">
                        Google will help you.
                    </p>
                    <p className="help-section-text">
                        However, within the app of your choice, I would advise you to create a separate calendar
                        for each separate course. Then you can neatly color code different courses so you can
                        easily make sense of your complete calendar.
                    </p>
                </div>

                <div className="help-section">
                    <h3 className="help-section-heading">
                        Is this open source?
                    </h3>
                    <p className="help-section-text">
                        Sure. The source code can be found on <A href="https://github.com/anttispitkanen/uta-course-calendar">
                        GitHub</A>. Feel free to submit a PR or fork it if you wish.
                    </p>
                </div>

                <div className="help-section">
                    <h3 className="help-section-heading">
                        Who built this?
                    </h3>
                    <p className="help-section-text">
                        Antti Pitkänen, a Computer Science student at University of Tampere.
                        A JavaScript enthusiast.
                    </p>
                    <p className="help-section-text">
                        You can reach me through <A href="http://anttipitkanen.com">
                        my website</A> or find me on <A href="https://twitter.com/poetkoe">
                        Twitter</A>.
                    </p>
                </div>
            </div>
        );
    }
}

export default onClickOutside(Help);

/* Link helper component */
const A = ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferer">
        { children }
    </a>
);