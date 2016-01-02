import React from 'react'
import { Link } from 'react-router'
import { fixRoute } from '../common/util'

class App extends React.Component {
  render () {
    return (
    <div>
      <ul>
        <li>
          <Link to={{pathname: fixRoute('/')}}>
          {'Redirect Home'}
          </Link>
        </li>
        <li>
          <Link to={{pathname: fixRoute('/v1/flylight')}}>
          {'Janelia FlyLight'}
          </Link>
        </li>
        <li>
          <Link to={{pathname: fixRoute('/v1/vdrc')}}>
          {'Vienna Tiles (VDRC)'}
          </Link>
        </li>
        <li>
          <Link to={{pathname: fixRoute('/v1/bbweb')}}>
          {'Vienna Tiles (Brain Base Web)'}
          </Link>
        </li>
      </ul>
      {this.props.main}
    </div>
    )
  }
}
App.propTypes = { main: React.PropTypes.object }

export default App
