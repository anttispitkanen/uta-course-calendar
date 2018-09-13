import { connect } from 'react-redux';
import { searchActions, courseActions } from '../../redux/actions';
import Search from './Search';

export default connect(
  null,
  { ...searchActions, ...courseActions },
)(Search);
