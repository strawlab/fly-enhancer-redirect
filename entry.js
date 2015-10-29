import React from 'react';
import ReactDOM from 'react-dom'
import { renderToString } from 'react-dom/server'
import { createHistory, createMemoryHistory } from 'history';
import { Router, RoutingContext, match } from 'react-router';
import routes from './routes';
import data from './data';
import {fixRoute} from './common/util';

function safeStringify(obj) {
  return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--')
}

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

  const history = createHistory();
  ReactDOM.render(
    <Root initialProps={initialProps}>
      <Router history={history} routes={routes} />
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
      let initialProps = {};
      const html = renderToString(
          <Root initialProps={initialProps}>
            <RoutingContext {...renderProps} />
          </Root>
      );
      callback(null, '<!DOCTYPE html>' + html);
    } else {
      console.error("locals when getting 404:",locals);
      throw new Error("404 not implemented");
    }
  });
};
