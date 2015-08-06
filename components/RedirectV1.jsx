import React from 'react'

let RedirectV1 = React.createClass({
  render: function () {
    let destination = this.props.params.destination;
    let query = this.props.query;
    console.log("this.props",this.props);
    console.log("query",query);
    return (
      <main>
        RedirectV1 component for {destination}.
      </main>
    )
  }
})

export default RedirectV1
