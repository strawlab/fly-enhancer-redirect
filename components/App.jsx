import React from 'react'
import AppNav from './AppNav.jsx'

class App extends React.Component {
  render () {
    return (
    <div>
      <AppNav />
      {this.props.main}
    </div>
    )
  }
}
App.propTypes = { main: React.PropTypes.object }

export default App
