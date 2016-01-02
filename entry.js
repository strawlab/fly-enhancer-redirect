import React from 'react'
import ReactDOM from 'react-dom'
import { renderToString } from 'react-dom/server'
import { Router, RouterContext, match, browserHistory } from 'react-router'
import createMemoryHistory from 'react-router/lib/createMemoryHistory'
import { Provider } from 'react-redux'

import configureStore from './redux/create'

import routes from './routes'
import data from './data'
import {fixRoute} from './common/util'

// Client render (optional):
if (typeof document !== 'undefined') {
  var initialProps = JSON.parse(document.getElementById('initial-props').innerHTML)
  let store = configureStore(initialProps);
  ReactDOM.render(
      <Provider store={store}>
        <Router
            history={browserHistory}
            routes={routes}
        />
      </Provider>
    , document.getElementById('fly-enhancer-redirect'));
}

function renderFullPage(title, html, props) {
  const jsonProps = JSON.stringify(props);

  return `<!DOCTYPE html>
<html>
<head>
  <meta charSet="utf-8" />
  <title>${title}</title>
</head>
<body>
  <div id="fly-enhancer-redirect">${html}</div>
  <script
    id='initial-props'
    type='application/json'
     >${jsonProps}</script>
  <script src="${fixRoute('/bundle.js')}"></script>
</body>
</html>`
}

// Exported static site renderer:
export default (locals, callback) => {
  const history = createMemoryHistory();
  const location = history.createLocation(locals.path);

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    if (error) {
      throw new Error("error handling not implemented");
    } else if (redirectLocation) {
      throw new Error("redirection not implemented");
    } else if (!renderProps) {
      throw new Error("404 not implemented");
    }

    const store = configureStore()
    const component = (
      <Provider store={store}>
        <div>
          <RouterContext {...renderProps}/>
        </div>
      </Provider>
    );
    const html = renderToString(component);
    const initialProps = store.getState();
    callback(null, renderFullPage(data.title, html, initialProps));
  });
};
