import React from 'react'
import { Link } from 'react-router'
import {fixRoute} from '../common/util';

class App extends React.Component {
  render() {
    return (
      <div>
        <ul>
          <li><Link to={fixRoute("/")} activeClassName="active">Redirect Home</Link></li>
          <li><Link to={fixRoute("/v1/flylight")} activeClassName="active">Janelia FlyLight</Link></li>
          <li><Link to={fixRoute("/v1/vdrc")} activeClassName="active">Vienna Tiles (VDRC)</Link></li>
          <li><Link to={fixRoute("/v1/bbweb")} activeClassName="active">Vienna Tiles (Brain Base Web)</Link></li>
        </ul>
        {this.props.main}
      </div>
    )
  }
}

export default App
