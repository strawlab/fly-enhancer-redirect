import { createStore as _createStore } from 'redux';

export default function createStore(createHistory, data) {

  const reducer = require('./modules/reducer');
  const store = _createStore(reducer, data);

  return store;
}
