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

function safeStringify(obj) {
  return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--')
}

// The <Root> React component is the template for the page. As such, it lives
// outside the redux provider and the router components and contains only
// minimal bits required to render the page from javascript. In the future, we
// could evaluate putting <Root> under the redux provider in the hierarchy and
// thus let the page title (for example) be connected to a redux store variable.

class Root extends React.Component {
  render() {

    let initialProps = {
      __html: safeStringify(this.props.initialProps)
    };

    return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>{data.title}</title>
      </head>
      <body>
        {this.props.children}
        <script
          id='initial-props'
          type='application/json'
          dangerouslySetInnerHTML={initialProps} />
        <script src={fixRoute('/bundle.js')} />
      </body>
    </html>
  );
  }
}

// Client render (optional):
if (typeof document !== 'undefined') {
  var initialProps = JSON.parse(document.getElementById('initial-props').innerHTML)
  const store = configureStore(initialProps);
  console.log("in client",history,initialProps);
  ReactDOM.render(
    <Root initialProps={initialProps}>
      <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
      </Provider>
    </Root>
    , document);

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
    } else if (renderProps) {
      const store = configureStore()
      const initialProps = store.getState();
      const html = renderToString(
        <Root initialProps={initialProps}>
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        </Root>
      );
      callback(null, '<!DOCTYPE html>' + html);
    } else {
      console.error("locals when getting 404:",locals);
      throw new Error("404 not implemented");
    }
  });
};
