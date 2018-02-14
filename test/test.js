import assert from 'assert'
import { transformFileSync } from 'babel-core'
import fs from 'fs'
import _ from 'lodash'
import path from 'path'

import componentAsJsxName from '../src'

const fixturesDir = path.join(__dirname, 'fixtures')

const fixtureAssert = (fixtureDir, options = []) =>
  it(`should pass ${_.startCase(fixtureDir)}`, () => {
    const actualPath = path.join(fixturesDir, fixtureDir, 'actual.js')
    const expectedPath = path.join(fixturesDir, fixtureDir, 'expected.js')

    const actual = transformFileSync(actualPath, {
      babelrc: false,
      plugins: [[componentAsJsxName, options]],
    }).code
    const expected = fs.readFileSync(expectedPath).toString()

    assert.equal(_.trim(actual), _.trim(expected))
  })

describe('fixtures', () => {
  fixtureAssert('statefull')
  fixtureAssert('statefull-pure')
  fixtureAssert('statefull-multirender')
  // fixtureAssert('statefull-predefined')
  // fixtureAssert('statefull-static')

  fixtureAssert('stateless')
  fixtureAssert('stateless-anonymous')
  // fixtureAssert('stateless-assignment')
  // fixtureAssert('stateless-predefined')
})
