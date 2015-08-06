import React from 'react'
import Router from 'react-router'

let RouteHandler = Router.RouteHandler

let Root = React.createClass({
  render: function () {
    let initialProps = {
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
            <script src='/bundle.js' />
        </body>
      </html>
    )
  }
})

function safeStringify(obj) {
  return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--')
}

export default Root
