import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import onClickOutside from 'react-onclickoutside';
import { A } from '../../utils/linkHelper';
import help1 from '../../images/help-1.png';
import './Help.scss';

class Help extends Component {
  handleClickOutside = e => {
    this.closeModal();
  };

  closeModal = () => {
    this.props.history.replace({ pathname: '/' });
  };

  render() {
    return (
      <div className="help-wrapper">
        <div className="help-close-wrapper">
          <i className="help-close fa fa-times" onClick={this.closeModal} />
        </div>

        <h2>UTA course calendar - FAQ</h2>

        <div className="help-section">
          <h3 className="help-section-heading">What is this?</h3>
          <p className="help-section-text">
            This is an app that helps students build an electronic calendar for
            their studies in <A href="https://uta.fi">University of Tampere</A>{' '}
            by just copying the course URL and pasting it to this app.
          </p>
          <p className="help-section-text">
            See <Link to="/howto">how to use</Link> for instructions.
          </p>
        </div>

        <div className="help-section">
          <h3 className="help-section-heading">Why?</h3>
          <p className="help-section-text">
            I study at UTA myself and got tired of writing my classes in my
            calendar by hand, so I built this. I happily spent hours to save a
            few minutes. No more writing by hand!
          </p>
        </div>

        <div className="help-section">
          <h3 className="help-section-heading">Is this official?</h3>
          <p className="help-section-text">
            This application is built and maintained by a third party (=a UTA
            student) and is not an official tool provided by University of
            Tampere.
          </p>
          <p className="help-section-text">
            The course schedule data that this application uses is provided by
            University of Tampere{' '}
            <A href="https://opendata.uta.fi">open data API</A>. The course
            information is the same information that you can find in the
            official University of Tampere{' '}
            <A href="https://www10.uta.fi/opas/teaching/index.htm?uiLang=en&kieli=en">
              teaching schedule
            </A>
            . So in that way the schedule data is official.
          </p>
        </div>

        <div className="help-section">
          <h3 className="help-section-heading">How does it work?</h3>
          <p className="help-section-text">
            The course schedule information is fetched from the{' '}
            <A href="https://opendata.uta.fi">open data API</A> of University of
            Tampere. The chosen lectures, exercises or other lessons are then
            parsed to an{' '}
            <A href="https://en.wikipedia.org/wiki/ICalendar">.ics-file</A>{' '}
            (ICAL, standard calendar format), that can be imported to basically
            any electronic calendar.
          </p>
          <p className="help-section-text">
            Instructions on how to import to{' '}
            <A href="https://support.google.com/calendar/answer/37118">
              Google Calendar
            </A>
            .
          </p>
        </div>

        <div className="help-section">
          <h3 className="help-section-heading">
            Does this work with any course?
          </h3>
          <p className="help-section-text">
            This works with any course where the course teacher has correctly
            inserted the course schedule into the system. This is, according to
            doing some testing, about 95% of all courses.
          </p>
          <p className="help-section-text">
            A correcltly inserted course schedule, that will work with this app,
            looks something like the example below in the UTA study schedule.
            The lectures, tutorials and whatever the course includes, are listed
            under the heading "Teaching".
          </p>
          <img className="help-image" src={help1} alt="example screenshot" />
          <p className="help-section-text">
            There are also cases where the teacher has not inserted the
            information correctly. In such case this app cannot create the
            calendar. An example would be when a teacher has written the
            schedule as text in the additional details section of the page.
            These cases don't seem to be many, but I did see some when browsing
            through the courses.
          </p>
        </div>

        <div className="help-section">
          <h3 className="help-section-heading">
            Is the created calendar correct?
          </h3>
          <p className="help-section-text">
            The calendar is correct in cases where the course teacher has
            inserted the schedule correctly. This app gets all the information
            it has through the UTA open data API, which is updated daily. That
            is the same information that is displayed in the official teaching
            schedules.
          </p>
          <p className="help-section-text">
            However, I can't promise that the teachers or the API are always
            100% correct, so it's advised that you don't trust it blindly. As
            the creator I take no responsibility of the validity of the
            information.
          </p>
          <p className="help-section-text">
            One thing that is often wrongly inserted into the system by teachers
            are exceptions to regular times (="lectures every monday but NOT
            2.3." or something similar). If the possible exceptions are listed
            separately under the lessons in the University of Tampere teaching
            schedules, they are inserted correctly, and UTA course calendar
            should automatically apply those exceptions when building the
            calendar file.
          </p>
          <p className="help-section-text">
            Unfortunately there seem to be some courses where the exceptions are
            just written incorrectly in the "additional information" of a
            lecture, and in those cases UTA course calendar is not smart enough
            to apply those exceptions. In these cases the exceptions appear as
            text after the lesson details (and not as a list below them) in the
            University of Tampere teaching schedules.
          </p>
        </div>

        <div className="help-section">
          <h3 className="help-section-heading">
            Can I download multiple courses at once?
          </h3>
          <p className="help-section-text">
            No. But you can download as many subsequent courses as you wish, and
            import them separately to your calendar. This is in many ways much
            more convenient.
          </p>
        </div>

        <div className="help-section">
          <h3 className="help-section-heading">
            What if I don't know my tutorial/exercise group yet?
          </h3>
          <p className="help-section-text">
            You can download parts of the same course separately, and import
            those to your calendar separately.
          </p>
          <p className="help-section-text">
            For example, you can download the lectures before the course starts.
            Then, when you get to know your (possible) exercise group, you can
            download that and add it to your calendar.
          </p>
        </div>

        <div className="help-section">
          <h3 className="help-section-heading">
            What if something about the course changes?
          </h3>
          <p className="help-section-text">
            If you have already downloaded the course and then something (times,
            locations) about it changes, those changes don't show automatically
            in your calendar app. There are however two easy ways to work around
            this problem.
          </p>
          <p className="help-section-text">
            If the time or location of a single lecture changes or if a single
            lecture is cancelled you can edit that event directly in your
            calendar.
          </p>
          <p className="help-section-text">
            If it's a bigger change, you can just delete the course from your
            calendar and download it again with the updated information. This is
            easy especially if you do as I do and recommend, and have separate
            calendars (withing the calendar app) for separate courses.
          </p>
          <p className="help-section-text">
            (Please note that the course data this app uses is updated once
            every day at approximately 3am, so if a teacher updates a course
            today, those changes won't show in UTA course calendar until
            tomorrow.)
          </p>
        </div>

        <div className="help-section">
          <h3 className="help-section-heading">
            How can I remove the course from my own calendar?
          </h3>
          <p className="help-section-text">
            You can delete the events (=lectures, exercises...) like you would
            delete any other calendar event.
          </p>
          <p className="help-section-text">
            Also, if you have the course as its own calendar in the calendar app
            you use, you can delete the whole calendar, which will erase all the
            events inside the calendar. Please use caution though and don't
            delete calendars that you don't want deleted.
          </p>
        </div>

        <div className="help-section">
          <h3 className="help-section-heading">How to use a calendar app?</h3>
          <p className="help-section-text">
            There are many calendar apps to choose from, google instructions if
            you need help. I recommend Google Calendar myself, as it's easy to
            use both on mobile and in a browser and works really well.
          </p>
          <p className="help-section-text">
            Within the app of your choice, I would advise you to create a
            separate calendar for each separate course. Then you can neatly
            color code and filter different courses so you can easily make sense
            of your complete calendar.
          </p>
        </div>

        <div className="help-section">
          <h3 className="help-section-heading">
            What browser does this work on?
          </h3>
          <p className="help-section-text">
            UTA course calendar has been built and tested with the latest
            version of Chrome, desktop and mobile. Some testing has been done
            also on the latest desktop versions of Firefox and Safari.
          </p>
          <p className="help-section-text">
            The creator takes no responsibility of this working or not working
            on other browsers.
          </p>
        </div>

        <div className="help-section">
          <h3 className="help-section-heading">Is this open source?</h3>
          <p className="help-section-text">
            Sure. The source code can be found on{' '}
            <A href="https://github.com/anttispitkanen/uta-course-calendar">
              GitHub
            </A>
            . Feel free to submit a PR or fork it if you wish.
          </p>
        </div>

        <div className="help-section">
          <h3 className="help-section-heading">
            "Wow this is awesome, can I share it?"
          </h3>
          <p className="help-section-text">
            Of course! UTA course calendar was built to help the students of
            University of Tampere, and I personally hope that as many people as
            possible will find it helpful. Feel free to share it to anyone,
            anywhere.
          </p>
        </div>

        <div className="help-section">
          <h3 className="help-section-heading">Who built this?</h3>
          <p className="help-section-text">
            Antti Pitkänen, a Computer Science student at University of Tampere.
            A JavaScript enthusiast.
          </p>
          <p className="help-section-text">
            You can reach me through{' '}
            <A href="http://anttipitkanen.com">my website</A> or find me on{' '}
            <A href="https://twitter.com/poetkoe">Twitter</A>.
          </p>
        </div>
      </div>
    );
  }
}

export default onClickOutside(Help);
