import { connect } from 'react-redux';
import { searchActions } from '../../redux/actions';
import Search from './Search';

export default connect(
    null,
    searchActions
)(Search);
