import { combineReducers } from 'redux';
import currentJaneliaLine from './currentJaneliaLine';
import currentViennaLine from './currentViennaLine';

export default combineReducers({
  currentJaneliaLine,
  currentViennaLine,
});
