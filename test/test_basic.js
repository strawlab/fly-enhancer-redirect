import 'babel-polyfill'
import assert from 'assert'
import {data, getComputedCache} from '../components/RedirectV1.jsx'

describe('getComputedCache', () => { // eslint-disable-line no-undef
  it('works with valid data', () => { // eslint-disable-line no-undef
    Object.keys(data).forEach(function (destination) {
      let demoProps = {
        params: { destination: destination },
        location: { query: {} }
      }
      const demoData = data[destination]
      demoProps.location.query[demoData.query_name] = demoData.placeholder
      const demoResult = getComputedCache(demoProps)

      assert.equal(demoResult.shouldRedirect, true)
    })
  })

  it('fails with invalid destination', () => { // eslint-disable-line no-undef

    const demoProps = {
      params: { destination: 'fail-destination' },
      location: {}
    }
    assert.throws(() => getComputedCache(demoProps), /unknown destination/)
  })
})
