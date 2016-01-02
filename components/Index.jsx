import React from 'react'

class Index extends React.Component {
  render() {
    return (
      <main>
        <h1>{'fly enhancer redirect'}</h1>
        {'This is a URL redirection service from the '}<a href="https://strawlab.org/">
        {'Straw Lab'}</a>{'. It allows URLs to link to online resoures elsewhere.'}
        <p>{'The source code for this site is '}
          <a href="https://github.com/strawlab/fly-enhancer-redirect">{'here'}</a>{'.'}
        </p>
      </main>
      );
  }
}

export default Index
