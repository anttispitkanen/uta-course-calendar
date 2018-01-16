import React, { Component} from 'react';
import onClickOutside from 'react-onclickoutside';
import { A } from '../../utils/linkHelper';
import example1 from '../../images/example-1.png';
import example2 from '../../images/example-2.png';
import example3 from '../../images/example-3.png';
import example4 from '../../images/example-4.png';
import './HowToUse.scss';

class HowToUse extends Component {
    handleClickOutside = e => {
        this.closeModal();
    }

    closeModal = () => {
        /* navigate to root => closes modal */
        this.props.history.replace({ pathname: '/' });
    }

    render() {
        return (
            <div className="howto-wrapper">
                <div className="howto-close-wrapper">
                    <i className="howto-close fa fa-times"
                        onClick={this.closeModal} />
                </div>

                <h2>How to use?</h2>

                <div className="howto-section">
                    <i className="howto-section-number">1.</i>
                    <p className="howto-section-text">
                        Find the course you want to have in your calendar in
                        the <TeachingLink lang="en">UTA teaching schedule
                        </TeachingLink> (<TeachingLink lang="fi">Finnish one here</TeachingLink>).
                        Make sure you pick the course from the correct study period.
                    </p>
                </div>

                <div className="howto-section">
                    <i className="howto-section-number">2.</i>
                    <p className="howto-section-text">
                        Copy the course URL from the address bar.
                    </p>
                    <img className="howto-image" src={example1} alt="example 1"/>
                </div>

                <div className="howto-section">
                    <i className="howto-section-number">3.</i>
                    <p className="howto-section-text">
                        Paste the URL into the search field and hit "Search".
                    </p>
                    <img className="howto-image" src={example2} alt="example 2"/>
                </div>

                <div className="howto-section">
                    <i className="howto-section-number">4.</i>
                    <p className="howto-section-text">
                        Select the groups you wish to have in your calendar
                        (lectures, exercises, seminars...) and click "Download"
                        to download the calendar as an .ics-file.
                    </p>
                    <img className="howto-image" src={example3} alt="example 3"/>
                </div>

                <div className="howto-section">
                    <i className="howto-section-number">5.</i>
                    <p className="howto-section-text">
                        Import the .ics-file to your calendar of choice, and voilà!
                        All the classes you chose are automatically added to your calendar as events!
                    </p>
                    <img className="howto-image" src={example4} alt="example 4"/>
                    <p>
                        Instructions for importing to <A href="https://support.google.com/calendar/answer/37118">
                        Google Calendar</A>. If you use another calendar app, google
                        for instructions if needed.
                    </p>
                </div>
            </div>
        );
    }
}

export default onClickOutside(HowToUse);

const TeachingLink = ({ lang, children }) => (
    <a target="_blank" rel="noopener noreferer"
        href={
            lang === 'fi'
                ? 'https://www10.uta.fi/opas/opetusohjelma/index.htm'
                : 'https://www10.uta.fi/opas/teaching/index.htm?uiLang=en&kieli=en'
        }>
            {children}
    </a>
);
