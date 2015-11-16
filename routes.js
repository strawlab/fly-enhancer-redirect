import React from 'react'
import { Router, Link, History } from 'react-router'
import App from './components/App.jsx'
import Index from './components/Index.jsx'
import RedirectV1 from './components/RedirectV1.jsx'
import {fixRoute} from './common/util';

const normalRoutes = {
  path: fixRoute('/'),
  component: App,
  childRoutes: [
    { path: 'v1/:destination', components: {main: RedirectV1} },
  ],
  indexRoute: { components: {main: Index} }
}

// -------------------------
const devRoutes = [
  {
    path: '/',
    component: React.createClass({
      mixins: [ History ],
      doRedirect() { this.history.pushState(null, fixRoute('/')); },
      componentDidUpdate(prevProps,prevState) { this.doRedirect(); },
      componentDidMount() { this.doRedirect(); },
      render() {
        const baseLink = React.createElement(Link,
          {to: fixRoute('/'), key: "subdir"},"subdir");
        const baseDiv = React.createElement('div',
          null, ["You will be redirected to ",baseLink,"."]);
        return baseDiv;
      }
    }),
  },
  normalRoutes,
]
// -------------------------

const finalRoutes = __DEV__ ? devRoutes : normalRoutes;

export default finalRoutes
