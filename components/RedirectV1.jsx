import React from 'react'
import Router from 'react-router'
import { Link } from 'react-router'

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
  mixins: [Router.History],
  getInitialState: function() {
    return {
      nameFilter:"",
    };
  },
  onNameFilterChange: function(evt) {
    this.setState({nameFilter: evt.target.value});
  },
  onKeyDown: function(evt) {
    /*
    // Disabled for now: pressing Enter follows link. Reason: weird React error.
    if (evt.keyCode == 13) {
      let pathname = this.props.location.pathname;

      let query = this.getCurrentQuery();
      this.props.history.pushState(null, pathname, query); // <-- HERE I get an error.
    }
    */
  },
  setDefaultQuery: function(p) {
    let destination = p.params.destination;
    let this_data = data[destination];
    this.setState({nameFilter: this_data.example_query_value});
  },
  componentWillReceiveProps: function(nextProps) {
    this.setDefaultQuery(nextProps);
  },
  componentDidMount: function() {
    this.setDefaultQuery(this.props);
  },
  getCurrentQuery: function() {
    let destination = this.props.params.destination;
    let this_data = data[destination];

    let query = {};
    query[this_data.query_name]=this.state.nameFilter;
    return query;
  },
  render: function () {
    let destination = this.props.params.destination;
    let query = this.props.location.query || {};
    let this_data = data[destination];

    let arg = query[this_data.query_name];

    if (typeof arg === "undefined") {
      let pathname = this.props.location.pathname;
      let query = this.getCurrentQuery();

      return (
        <main>
          <noscript><h3>ERROR: javascript required</h3></noscript>
          <p>
            To generate a link, please enter a {this_data.pretty_name}:
            <input type="text" value={this.state.nameFilter} onChange={this.onNameFilterChange} onKeyDown={this.onKeyDown} />
          </p>
          <p>
            <Link to={pathname} query={query}>link to {this_data.query_name} {this.state.nameFilter}</Link>
          </p>
        </main>
      );
    }

    // Remove trailing slash from arg if present.
    if (arg.length >1 & endsWith(arg,"/")) {
      arg = arg.substring(0,arg.length-1);
    }

    this_data.do_redirect(arg);
    return (
      <main>
        <noscript><h3>ERROR: javascript required</h3></noscript>
        You will be redirected for destination {destination} with query {query}.
        <p>Go to the <a href="/">site index</a>.</p>
      </main>
    );
  }
})

export default RedirectV1
