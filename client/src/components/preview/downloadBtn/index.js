import { connect } from 'react-redux';
import DownloadBtn from './DownloadBtn';

const mapStateToProps = state => ({
    chosenGroups: state.chosenGroupsReducer
});

export default connect(
    mapStateToProps,
    null
)(DownloadBtn);
