#!/usr/bin/env node

const exists = require('fs').existsSync
const {join, normalize} = require('path')

// TODO: respect npm prefix
// https://docs.npmjs.com/files/folders
const prefix = 'node_modules/.bin'

function isGitRootFolder (folder) {
  const gitRoot = '.git'
  const full = join(folder, gitRoot)
  return exists(full)
}

console.error('args', process.argv)
const program = process.argv[2]
if (!program) {
  console.error('bin-up: finds bin link in node_modules/.bin folders')
  console.error('up to the Git root folder')
  console.error('usage: $(bin-up <name>)')
  console.error('for example:')
  console.error('$(bin-up mocha) --verbose test/*.js')
  process.exit(1)
}

const toFullAlias = (name) => (folder) =>
  join(folder, prefix, name)

const toFoundPath = toFullAlias(program)

let currentFolder = process.cwd()
let found

while (true) {
  const inFolder = toFoundPath(currentFolder)
  if (exists(inFolder)) {
    console.error('Found %s', inFolder)
    found = inFolder
    break
  }
  if (isGitRootFolder(currentFolder)) {
    console.error('reached git root folder %s', currentFolder)
    console.error('but could not find tool %s', program)
    process.exit(2)
  }
  const parent = normalize(join(currentFolder, '..'))
  if (parent === currentFolder) {
    console.error('reached top level folder %s', currentFolder)
    console.error('but could not find tool %s', program)
    process.exit(3)
  }
  currentFolder = parent
}

console.log(found)
