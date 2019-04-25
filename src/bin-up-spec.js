'use strict'

/* eslint-env mocha */
const binUp = require('.')
const la = require('lazy-ass')
const execa = require('execa-wrap')
const join = require('path').join

describe('bin-up', () => {
  const nestedFolder = join(__dirname, '..', 'test', 'nested')

  it('write this test', () => {
    console.assert(binUp, 'should export something')
  })

  it('finds standard', () => {
    return execa('npm', ['run', 'find:standard'], {
      cwd: nestedFolder
    }).then(result => {
      la(result.includes('code: 0'), 'non-zero code', result)
      la(result.includes('Found '), 'shows found', result)
    })
  })

  it('runs tool without arguments', () => {
    return execa('npm', ['run', 'run:os'], {
      cwd: nestedFolder
    }).then(result => {
      la(result.includes('code: 0'), 'should exit with error code', result)
      la(result.includes('Found '), 'shows that it found the tool', result)
      la(
        result.includes('darwin') || result.includes('linux'),
        'shows detected OS name',
        result
      )
    })
  })
})
