import React from 'react'
import { Link, History } from 'react-router'

function pad(num, size) {
    let s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

function get_vt_string(vt_number) {
  let vtInt = parseInt(vt_number);
  return pad(vtInt,6);
}

let data = {
  flylight: {
    query_name: "line",
    pretty_name: "driver line identifier",
    example_query_value: "R27B03",
    do_redirect: function(line) {
        var blank, blank_key, el, form, formData, hiddenField, i, j, key, len, len1, value;

        formData = [];
        formData.push(["_search_toggle", "general"]);
        formData.push(["line", line]);
        blank = ["lines", "genes", "mlines", "dlines"];

        for (i = 0, len = blank.length; i < len; i++) {
          blank_key = blank[i];
          formData.push([blank_key, ""]);
        }

        formData.push(["_gsearch", "Search"]);
        formData.push(["_search_logic", "AND"]);
        formData.push(["_disc_search_logic", "AND"]);
        formData.push(["_embryo_search_logic", "AND"]);
        formData.push([".cgifields", "_search_toggle"]);
        formData.push([".cgifields", "dline"]);
        formData.push([".cgifields", "mline"]);
        formData.push([".cgifields", "term"]);
        formData.push([".cgifields", "lline"]);
        formData.push([".cgifields", "gfp_pattern"]);
        formData.push([".cgifields", "line"]);
        formData.push([".cgifields", "lterm"]);
        form = document.createElement('form');
        form.setAttribute('method', 'POST');
        form.setAttribute('action', 'http://flweb.janelia.org/cgi-bin/flew.cgi');
        for (j = 0, len1 = formData.length; j < len1; j++) {
          el = formData[j];
          key = el[0];
          value = el[1];
          hiddenField = document.createElement('input');
          hiddenField.setAttribute('type', 'hidden');
          hiddenField.setAttribute('name', key);
          hiddenField.setAttribute('value', value);
          form.appendChild(hiddenField);
        }
        document.body.appendChild(form);
        form.submit();
    }
  },
  bbweb: {
    query_name: "vt",
    pretty_name: "Vienna Tile number",
    example_query_value: "5534",
    do_redirect: function(vt_number_orig) {
      let vt_number = get_vt_string(vt_number_orig);
      let brainbase_url = "http://brainbase.imp.ac.at/bbweb/#6?st=byline&q="+vt_number;
      window.location = brainbase_url;
    }
  },
  vdrc: {
    query_name: "vt",
    pretty_name: "Vienna Tile number",
    example_query_value: "5534",
    do_redirect: function(vt_number_orig) {
      let vt_number = get_vt_string(vt_number_orig);
      let vdrc_url = 'http://stockcenter.vdrc.at/control/keywordsearch?SEARCH_CATALOG_ID=VDRC_Catalog&SEARCH_CATEGORY_ID=VDRC_All&SEARCH_STRING=vt'+vt_number+'&VIEW_SIZE=100';
      window.location = vdrc_url;
    }
  }
};

// hmm, babel doesn't add string.endsWith(), so we use this.
function endsWith(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
};

let RedirectV1 = React.createClass({
  mixins: [History],
  getInitialState: function() {
    return {
      nameFilter:"",
    };
  },
  onNameFilterChange: function(evt) {
    this.setState({nameFilter: evt.target.value});
  },
  onKeyDown: function(evt) {
    if (evt.keyCode == 13) {
      let pathname = this.props.location.pathname;

      let {nextQuery} = this.getComputedState(this.props,this.state);
      this.history.pushState(null, pathname, nextQuery);
    }
  },
  setDefaultQuery: function(p) {
    let destination = p.params.destination;
    let this_data = data[destination];
    this.setState({nameFilter: this_data.example_query_value});
  },
  componentWillReceiveProps: function(nextProps) {
    this.setDefaultQuery(nextProps);
  },
  componentWillMount: function() {
    this.setDefaultQuery(this.props);
  },
  maybeRedirect(props,state) {
    let cs = this.getComputedState(props,state);
    if (cs.shouldRedirect) {
      cs.this_data.do_redirect(cs.argNoSlash);
    }
  },
  componentDidUpdate(pp,ps) { this.maybeRedirect(this.props,this.state); },
  componentDidMount() { this.maybeRedirect(this.props,this.state); },
  getComputedState(props,state) {
    const destination = props.params.destination;
    const pathname = props.location.pathname;

    const currentQuery = props.location.query || {};
    const this_data = data[destination];

    const currentQueryArg = currentQuery[this_data.query_name];
    const shouldRedirect = typeof currentQueryArg !== "undefined";
    const nameFieldText = state.nameFilter;

    let nextQuery = {};
    nextQuery[this_data.query_name]=nameFieldText;

    let argNoSlash = currentQueryArg;

    if (typeof argNoSlash !== "undefined") {
      // Remove trailing slash from argNoSlash if present.
      if (argNoSlash.length >1 & endsWith(argNoSlash,"/")) {
        argNoSlash = argNoSlash.substring(0,argNoSlash.length-1);
      }
    }

    return { destination, this_data, currentQueryArg, argNoSlash,
      shouldRedirect, nextQuery, currentQuery, nameFieldText, pathname };
  },
  render: function () {
    let cs = this.getComputedState(this.props,this.state);
    if ( !cs.shouldRedirect ) {
      return (
        <main>
          <noscript><h3>ERROR: javascript required</h3></noscript>
          <p>
            To generate a link, please enter a {cs.this_data.pretty_name}:
            <input type="text" value={cs.nameFieldText} onChange={this.onNameFilterChange} onKeyDown={this.onKeyDown} />
          </p>
          <p>
            <Link to={cs.pathname} query={cs.nextQuery}>link to {cs.this_data.query_name} {cs.nameFieldText}</Link>
          </p>
        </main>
      );
    }

    return (
      <main>
        <noscript><h3>ERROR: javascript required</h3></noscript>
        You will be redirected for destination {cs.destination} with query {JSON.stringify(cs.currentQuery)}.
        <p>Go to the <a href="/">site index</a>.</p>
      </main>
    );
  }
})

export default RedirectV1
