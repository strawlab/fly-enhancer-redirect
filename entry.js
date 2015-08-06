import React from 'react'
import Router from 'react-router'
import Routes from './Routes.jsx'
import initialProps from './data.js'

if (typeof document !== 'undefined') {
  Router.run(Routes, Router.HistoryLocation, function (Handler) {
    React.render(React.createElement(Handler, initialProps), document.body)
  })
}

let Entry = function render (locals, callback) {
  callback(null, '<html><head></head><body>This page requires javascript.<script src="/bundle.js"></script></body></html>');
}

export default Entry
