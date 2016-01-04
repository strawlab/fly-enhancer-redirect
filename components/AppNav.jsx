import React from 'react'
import { Link } from 'react-router'
import { fixRoute } from '../common/util'

const navData = {
  header: {to: fixRoute('/'), label: 'Fly Enhancer Redirect home'},
  items: [
    {to: fixRoute('/v1/flylight'), label: 'Janelia FlyLight'},
    {to: fixRoute('/v1/vdrc'), label: 'Vienna Tiles (VDRC)'},
    {to: fixRoute('/v1/bbweb'), label: 'Vienna Tiles (Brain Base Web)'}
  ]
}

class NavItem extends React.Component {
  render () {
    return (
      <Link to={{pathname: this.props.item.to}} className={'p1 m1'}>{this.props.item.label}</Link>
    )
  }
}
NavItem.propTypes = { item: React.PropTypes.object.isRequired }

class NavHeader extends React.Component {
  render () {
    return <NavItem item={this.props.item}/>
  }
}
NavHeader.propTypes = { item: React.PropTypes.object.isRequired }

class AppNav extends React.Component {
  render () {
    return (
      <nav role='navigation' className={'clearfix'}>
        <div className='left'>
          <NavHeader item={navData.header} />
        </div>
        <div className='right'>
          {navData.items.map(function (item, idx) {
            return (<NavItem key={idx} item={item}/>)
          })}
        </div>
      </nav>
    )
  }
}

export default AppNav
