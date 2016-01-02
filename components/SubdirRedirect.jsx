import React from 'react'
import { Link } from 'react-router'
import { fixRoute } from '../common/util'

// Include this component as the route handler for the true root path at '/' (or
// elsewhere) to automatically redirect to the base route specified by
// fixRoute('/'). This is intended only to be used in development, as presumably
// in deployment the root route will be handled seperately.

class SubdirRedirect extends React.Component {
  componentDidMount () { this.doRedirect() }
  componentDidUpdate (prevProps, prevState) { this.doRedirect() }
  doRedirect () { this.context.router.push(fixRoute('/')) }
  render () {
    const baseLink = React.createElement(Link,
      {to: {pathname: fixRoute('/')}, key: 'subdir'}, 'subdir')
    const baseDiv = React.createElement('div',
      null, ['You will be redirected to ', baseLink, '.'])
    return baseDiv
  }
}
SubdirRedirect.contextTypes = { router: React.PropTypes.object.isRequired }

export default SubdirRedirect
