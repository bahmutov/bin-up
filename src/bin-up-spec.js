'use strict'

/* eslint-env mocha */
const binUp = require('.')
const la = require('lazy-ass')
const execa = require('execa-wrap')
const join = require('path').join

describe('bin-up', () => {
  it('write this test', () => {
    console.assert(binUp, 'should export something')
  })

  it('finds standard', () => {
    const nested = join(__dirname, '..', 'test', 'nested')
    return execa('npm', ['run', 'find:standard'], {
      cwd: nested
    }).then(result => {
      la(result.includes('code: 0'), 'non-zero code', result)
      la(result.includes('Found '), 'shows found', result)
    })
  })
})
