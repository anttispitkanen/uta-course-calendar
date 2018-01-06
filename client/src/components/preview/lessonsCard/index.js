import { connect } from 'react-redux';
import { courseActions } from '../../../redux/actions';
import LessonsCard from './LessonsCard';

export default connect(
    null,
    courseActions
)(LessonsCard);
