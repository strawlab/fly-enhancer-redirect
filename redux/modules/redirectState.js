// redirectState.js
// See https://github.com/erikras/ducks-modular-redux for layout convention.

// actionTypes -----------------------------------------------------------------
export const SET = 'strawlab.org/fly-enhancer-redirect/redirectState/SET'

// reducer ---------------------------------------------------------------------
const initialState = null
export default function reducer (state = initialState, action) {
  switch (action.type) {
    case SET:
      return action.payload
    default:
      return state
  }
}

// action creators -------------------------------------------------------------
export function setRedirectState (value) {
  return {
    type: SET,
    payload: value
  }
}
