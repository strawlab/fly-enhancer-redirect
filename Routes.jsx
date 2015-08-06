import React from 'react'
import Router from 'react-router'
import Root from './components/Root.jsx'
import Index from './components/Index.jsx'
import FlyLight from './components/FlyLight.jsx'

let Route = Router.Route
let DefaultRoute = Router.DefaultRoute

let Routes = (
  <Route handler={Root} path='/'>
    <DefaultRoute handler={Index} />
    <Route path='/fly-light' handler={FlyLight} />
  </Route>
)

export default Routes
