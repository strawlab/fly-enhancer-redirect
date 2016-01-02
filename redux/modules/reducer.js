import { combineReducers } from 'redux'
import currentJaneliaLine from './currentJaneliaLine'
import currentViennaLine from './currentViennaLine'

const rootReducer = combineReducers({
  currentJaneliaLine,
  currentViennaLine})

export default rootReducer
