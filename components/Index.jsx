import React from 'react'

var ListItemWrapper = React.createClass({
  render: function() {
    return <li><a href={this.props.path}>{this.props.path}</a></li>;
  }
});

let Index = React.createClass({
  render: function () {
    let routes = this.props.routes;
    return (
      <main>
        <h1>Welcome to redirect.strawlab.org</h1>
        This is a URL redirection service from the <a href="http://strawlab.org/">Straw
        Lab</a>. It allows a simple URL to link to an online resoures elsewhere.
        Currently available routes are:
        <ul>
          {routes.map(function(route_path){
            if (route_path !== "/") {
              return <ListItemWrapper key={route_path} path={route_path} />;
            }
          })}
        </ul>
      </main>
    )
  }
})

export default Index
