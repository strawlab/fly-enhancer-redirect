import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { setJaneliaLine } from '../redux/modules/currentJaneliaLine'
import { setViennaLine } from '../redux/modules/currentViennaLine'
import { fixRoute } from '../common/util'

function pad (num, size) {
  let s = num + ''
  while (s.length < size) s = '0' + s
  return s
}

function get_vt_string (vt_number) {
  let vtInt = parseInt(vt_number, 10)
  return pad(vtInt, 6)
}

export const data = {
  flylight: {
    title: 'Janelia FlyLight',
    placeholder: 'R27B03',
    query_name: 'line',
    pretty_name: 'driver line identifier',
    do_redirect: function (lineOrig) {
      let blank, blank_key, el, form, formData, hiddenField, i, j, key, len, len1, value

      const line = lineOrig.toUpperCase()
      formData = []
      formData.push(['_search_toggle', 'general'])
      formData.push(['line', line])
      blank = ['lines', 'genes', 'mlines', 'dlines']

      for (i = 0, len = blank.length; i < len; i++) {
        blank_key = blank[i]
        formData.push([blank_key, ''])
      }

      formData.push(['_gsearch', 'Search'])
      formData.push(['_search_logic', 'AND'])
      formData.push(['_disc_search_logic', 'AND'])
      formData.push(['_embryo_search_logic', 'AND'])
      formData.push(['.cgifields', '_search_toggle'])
      formData.push(['.cgifields', 'dline'])
      formData.push(['.cgifields', 'mline'])
      formData.push(['.cgifields', 'term'])
      formData.push(['.cgifields', 'lline'])
      formData.push(['.cgifields', 'gfp_pattern'])
      formData.push(['.cgifields', 'line'])
      formData.push(['.cgifields', 'lterm'])
      form = document.createElement('form')
      form.setAttribute('method', 'POST')
      form.setAttribute('action', 'http://flweb.janelia.org/cgi-bin/flew.cgi')
      for (j = 0, len1 = formData.length; j < len1; j++) {
        el = formData[j]
        key = el[0]
        value = el[1]
        hiddenField = document.createElement('input')
        hiddenField.setAttribute('type', 'hidden')
        hiddenField.setAttribute('name', key)
        hiddenField.setAttribute('value', value)
        form.appendChild(hiddenField)
      }
      document.body.appendChild(form)
      form.submit()
    }
  },
  bbweb: {
    title: 'Vienna Tiles (Brain Base Web)',
    placeholder: '5534',
    query_name: 'vt',
    pretty_name: 'Vienna Tile number',
    do_redirect: function (vt_number_orig) {
      let vt_number = get_vt_string(vt_number_orig)
      let brainbase_url = 'http://brainbase.imp.ac.at/bbweb/#6?st=byline&q=' + vt_number
      window.location = brainbase_url
    }
  },
  vdrc: {
    title: 'Vienna Tiles (VDRC)',
    placeholder: '5534',
    query_name: 'vt',
    pretty_name: 'Vienna Tile number',
    do_redirect: function (vt_number_orig) {
      let vt_number = get_vt_string(vt_number_orig)
      let vdrc_url = 'http://stockcenter.vdrc.at/control/keywordsearch?SEARCH_CATALOG_ID=VDRC_Catalog&SEARCH_CATEGORY_ID=VDRC_All&SEARCH_STRING=vt' + vt_number + '&VIEW_SIZE=100'
      window.location = vdrc_url
    }
  }
}

// hmm, babel doesn't add string.endsWith(), so we use this.
function endsWith (str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1
}

const getComputedCache = function (props) {
  const destination = props.params.destination

  const currentQuery = props.location.query || {}
  const this_data = data[destination]

  if (typeof this_data === 'undefined') {
    throw new Error('unknown destination')
  }

  const currentQueryArg = currentQuery[this_data.query_name]
  const shouldRedirect = typeof currentQueryArg !== 'undefined'

  let nameFieldText
  switch (destination) {
    case 'flylight':
      nameFieldText = props.currentJaneliaLine
      break
    case 'bbweb':
    case 'vdrc':
      nameFieldText = props.currentViennaLine
      break
    default:
      throw new Error('unknown destination', destination)
  }

  let nextQuery = {}
  nextQuery[this_data.query_name] = nameFieldText

  let argNoSlash = currentQueryArg

  if (typeof argNoSlash !== 'undefined') {
    // Remove trailing slash from argNoSlash if present.
    if (argNoSlash.length > 1 & endsWith(argNoSlash, '/')) {
      argNoSlash = argNoSlash.substring(0, argNoSlash.length - 1)
    }
  }

  return { destination, this_data, currentQueryArg, argNoSlash,
  shouldRedirect, nextQuery, currentQuery, nameFieldText}
}

class RedirectV1 extends React.Component {
  constructor (props) {
    super(props)
    this.handleNameFilterChange = this.handleNameFilterChange.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }
  componentDidMount () { this.redirectIfNeeded(this.props) }
  componentDidUpdate (pp, ps) { this.redirectIfNeeded(this.props) }
  handleNameFilterChange (evt) {
    const destination = this.props.params.destination
    switch (destination) {
      case 'flylight':
        this.props.dispatch(setJaneliaLine(evt.target.value))
        break
      case 'bbweb':
      case 'vdrc':
        this.props.dispatch(setViennaLine(evt.target.value))
        break
      default:
        throw new Error('unknown destination', destination)
    }
    return
  }
  handleKeyDown (evt) {
    if (evt.keyCode === 13) {
      const pathname = this.props.location.pathname

      const { nextQuery } = getComputedCache(this.props)
      const query = nextQuery
      this.context.router.push({pathname, query})
    }
  }
  redirectIfNeeded (props) {
    let cs = getComputedCache(props)
    if (cs.shouldRedirect) {
      cs.this_data.do_redirect(cs.argNoSlash)
    }
  }
  render () {
    let cs = getComputedCache(this.props)
    if (!cs.shouldRedirect) {
      return (
      <main>
        <h2>{'Redirection service for '}{cs.this_data.title}</h2>
        <noscript>
          <h3>{'ERROR: javascript required'}</h3>
        </noscript>
        <p>
          {'To generate a link, please enter a '}
          {cs.this_data.pretty_name}
          {':'}
          <input
            onChange={this.handleNameFilterChange}
            onKeyDown={this.handleKeyDown}
            placeholder={cs.this_data.placeholder}
            type='text'
            value={cs.nameFieldText} />
        </p>
        {cs.nameFieldText
          ? <div><h3>Generated link</h3><p>
             <Link to={{pathname: this.props.location.pathname, query: cs.nextQuery}}>
             {'link to '}
             {cs.this_data.query_name}{' '}
             {cs.nameFieldText}
             </Link>
           </p></div> : null}
      </main>
      )
    }

    return (
    <main>
      <h2>{'Redirection service for '}{cs.this_data.title}</h2>
      <noscript>
        <h3>{'ERROR: javascript required'}</h3>
      </noscript>
      {'You will be redirected for destination '}
      {cs.destination}
      {' with query '}
      {JSON.stringify(cs.currentQuery)}
      {'.'}
      <p>
        {'Go to the '}
        <Link to={{pathname: fixRoute('/')}}>
        {'site index'}
        </Link>
        {'.'}
      </p>
    </main>
    )
  }
}
RedirectV1.contextTypes = { router: React.PropTypes.object.isRequired }
RedirectV1.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  location: React.PropTypes.object.isRequired,
  params: React.PropTypes.object.isRequired
}

function mapStateToProps (state) {
  const {currentJaneliaLine, currentViennaLine} = state

  return {
    currentJaneliaLine,
    currentViennaLine}
}

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(RedirectV1)
