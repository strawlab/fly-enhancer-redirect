import { combineReducers } from 'redux'
import currentJaneliaLine from './currentJaneliaLine'
import currentViennaLine from './currentViennaLine'
import { routeReducer } from 'redux-simple-router'

const rootReducer = combineReducers(Object.assign({},
  currentJaneliaLine,
  currentViennaLine,
  { routing: routeReducer }
))

export default rootReducer
