import { combineReducers } from 'redux'
import redirectState from './redirectState'
import currentJaneliaLine from './currentJaneliaLine'
import currentViennaLine from './currentViennaLine'

const rootReducer = combineReducers({
  redirectState,
  currentJaneliaLine,
  currentViennaLine})

export default rootReducer
