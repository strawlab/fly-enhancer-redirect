import React from 'react'
import Router from 'react-router'

let data = {
  flylight: {
    query_name: "line",
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
    example_query_value: "05534",
    do_redirect: function(vt_number) {
      let brainbase_url = "http://brainbase.imp.ac.at/bbweb/#6?st=byline&q="+vt_number;
      window.location = brainbase_url;
    }
  },
  vdrc: {
    query_name: "vt",
    example_query_value: "05534",
    do_redirect: function(vt_number) {
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
  mixins: [Router.Navigation, Router.State],
  render: function () {
    let destination = this.props.params.destination;
    let query = this.props.query;

    let this_data = data[destination];
    let arg = query[this_data.query_name];

    if (typeof arg === "undefined") {
      let pathname = this.getPathname();
      let query = {}; query[this_data.query_name]= this_data.example_query_value;
      let params = null;
      let example_link = this.makeHref( pathname, params, query );

      return (
        <main>
          Error: You must specify the query parameter "{this_data.query_name}".
          For example, this link <a href={example_link}>{example_link}</a>.
          <p>Go to the <a href="/">site index</a>.</p>
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
        You will be redirected for destination {destination} with query {query}.
        <p>Go to the <a href="/">site index</a>.</p>
      </main>
    );
  }
})

export default RedirectV1
