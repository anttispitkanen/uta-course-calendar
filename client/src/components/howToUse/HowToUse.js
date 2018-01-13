import React, { Component} from 'react';
import onClickOutside from 'react-onclickoutside';
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
                How to use
            </div>
        );
    }
}

export default onClickOutside(HowToUse);
