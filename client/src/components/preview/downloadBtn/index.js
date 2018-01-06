import { connect } from 'react-redux';
import DownloadBtn from './DownloadBtn';
import { downloadActions } from '../../../redux/actions';

const mapStateToProps = state => ({
    chosenGroups: state.chosenGroupsReducer
});

export default connect(
    mapStateToProps,
    { ...downloadActions }
)(DownloadBtn);
