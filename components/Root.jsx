// components/Root.jsx
var React = require('react')
var Router = require('react-router')
var RouteHandler = Router.RouteHandler

var Root = React.createClass({
  render: function () {
    var initialProps = {
      __html: safeStringify(this.props)
    }


    return (
      <html>
        <head>
          <title>{this.props.title}</title>
        </head>
        <body>
          <RouteHandler {...this.props} />
            <script
              id='initial-props'
              type='application/json'
              dangerouslySetInnerHTML={initialProps} />
            <script src='bundle.js' />
        </body>
      </html>
    )
  }
})

function safeStringify(obj) {
  return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--')
}

module.exports = Root
