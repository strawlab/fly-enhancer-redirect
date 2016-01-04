import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { renderToString } from 'react-dom/server'
import { Router, RouterContext, match, browserHistory } from 'react-router'
import createMemoryHistory from 'react-router/lib/createMemoryHistory'
import { Provider } from 'react-redux'

import configureStore from './redux/create'

import routes from './routes'
import data from './data'
import { fixRoute } from './common/util'

// Client render (optional):
if (typeof document !== 'undefined') {
  let store = configureStore()
  ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory} routes={routes} />
    </Provider>
    , document.getElementById('fly-enhancer-redirect'))
}

function renderFullPage (title, html) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charSet="utf-8" />
  <title>${title}</title>
  <link href="${fixRoute('/css/basscss-7.0.4.min.css')}" rel="stylesheet">
</head>
<body>
  <div class="m2">
    <noscript>
      <div class="black bg-red border">
        <h1>ERROR: javascript is required to use this site</h1>
        <p>Javascript is required to use this site, but javascript is
        not enabled in your browser.</p>
      </div>
    </noscript>
    <div id="fly-enhancer-redirect">${html}</div>
  </div>
  <script src="${fixRoute('/bundle.js')}"></script>
</body>
</html>`
}

// Exported static site renderer:
export default (locals, callback) => {
  const history = createMemoryHistory()
  const location = history.createLocation(locals.path)

  match({routes, location}, (error, redirectLocation, renderProps) => {
    if (error) {
      throw new Error('error handling not implemented')
    } else if (redirectLocation) {
      throw new Error('redirection not implemented')
    } else if (!renderProps) {
      throw new Error('404 not implemented')
    }

    const store = configureStore()
    const component = (
    <Provider store={store}>
      <RouterContext {...renderProps}/>
    </Provider>
    )
    const html = renderToString(component)
    callback(null, renderFullPage(data.title, html))
  })
}
