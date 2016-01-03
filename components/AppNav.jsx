import React from 'react'
import { Link } from 'react-router'
import { fixRoute } from '../common/util'

const navData = {
  header: {to: fixRoute('/'), label: 'Redirect Home'},
  items: [
    {to: fixRoute('/v1/flylight'), label: 'Janelia FlyLight'},
    {to: fixRoute('/v1/vdrc'), label: 'Vienna Tiles (VDRC)'},
    {to: fixRoute('/v1/bbweb'), label: 'Vienna Tiles (Brain Base Web)'}
  ]
}

class NavItem extends React.Component {
  render () {
    return (
      <li>
        <Link to={{pathname: this.props.item.to}}>{this.props.item.label}</Link>
      </li>
    )
  }
}
NavItem.propTypes = { item: React.PropTypes.object }

class NavHeader extends React.Component {
  render () {
    return <NavItem item={this.props.item} />
  }
}
NavHeader.propTypes = { item: React.PropTypes.object }

class AppNav extends React.Component {
  render () {
    return (
      <nav role='navigation'>
        <ul>
          <NavHeader item={navData.header} />
          {navData.items.map(function (item, idx) {
            return (<NavItem key={idx} item={item}/>)
          })}
        </ul>
      </nav>
    )
  }
}

export default AppNav
