import React from 'react'
import Router from 'react-router'
import Root from './components/Root.jsx'
import Index from './components/Index.jsx'
import RedirectV1 from './components/RedirectV1.jsx'

let Route = Router.Route
let DefaultRoute = Router.DefaultRoute

// keep in sync with data.js
let Routes = (
  <Route handler={Root} path='/'>
    <DefaultRoute handler={Index} />
    <Route path='/redirect/v1/:destination/' handler={RedirectV1} />
  </Route>
)

export default Routes
