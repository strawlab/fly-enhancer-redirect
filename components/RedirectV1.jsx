import React from 'react'

let RedirectV1 = React.createClass({
  render: function () {
    let destintation = this.props.params.destintation;
    console.log("this.props",this.props);
    return (
      <main>
        RedirectV1 component for {destintation}.
      </main>
    )
  }
})

export default RedirectV1
