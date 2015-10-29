import React from 'react'
import Router from 'react-router'
import App from './components/App.jsx'
import Index from './components/Index.jsx'
import RedirectV1 from './components/RedirectV1.jsx'
import {fixRoute} from './common/util';

export default {
  path: fixRoute('/'),
  component: App,
  childRoutes: [
    { path: 'v1/:destination', components: {main: RedirectV1} },
  ],
  indexRoute: { components: {main: Index} }
}
