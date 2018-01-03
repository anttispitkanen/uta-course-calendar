import { connect } from 'react-redux';

import Preview from './Preview';

const mapStateToProps = state => ({
    course: state.courseReducer.course,
    status: state.courseReducer.status
});

export default connect(
    mapStateToProps,
    null
)(Preview);
