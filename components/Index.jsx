import React from 'react'

var ListItemWrapper = React.createClass({
  render: function() {
    return <li><a href={this.props.path}>{this.props.path}</a></li>;
  }
});

let Index = React.createClass({
  render: function () {
    return (
      <main>
        <h1>fly enhancer redirect</h1>
        This is a URL redirection service from the <a href="https://strawlab.org/">Straw
        Lab</a>. It allows a simple URL to link to an online resoures elsewhere.

        <p>The source code for this site is <a href="https://github.com/strawlab/fly-enhancer-redirect">here</a>.</p>

      </main>
      );
  }
})

export default Index
