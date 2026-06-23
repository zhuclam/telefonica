const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const exec = (command) => execSync(command, { encoding: 'utf-8' }).trim()

const gitRoot = exec('git rev-parse --show-toplevel')
const expectedCwd = path.join(gitRoot, 'front-end')

if (path.resolve(process.cwd()) !== expectedCwd)
  throw new Error('This script must be executed from the main front-end dir')

const args = process.argv.slice(2)
const [upgradeType] = args

const validArgs = ['major', 'minor', 'patch']

if (!validArgs.includes(upgradeType))
  throw new Error(
    `Invalid argument, must provide one of the following: ${validArgs.join(
      ', '
    )}`
  )

const currentBranch = exec('git rev-parse --abbrev-ref HEAD')
const gitStatusResult = exec('git status --porcelain')

if (currentBranch !== 'main')
  throw new Error(`Must be initiated from main branch (current: ${currentBranch})`)
if (gitStatusResult)
  throw new Error(`Must have clean repo before releasing:\n${gitStatusResult}`)

const ENV_PATH = path.resolve('.env')
const currentVersion = fs.readFileSync(ENV_PATH).toString().split('=')[1].trim()
let [currMajor, currMinor, currPatch] = currentVersion.split('.').map(Number)

if (upgradeType === 'major') {
  currMajor++
  currMinor = 0
  currPatch = 0
} else if (upgradeType === 'minor') {
  currMinor++
  currPatch = 0
} else {
  currPatch++
}

const newVersion = [currMajor, currMinor, currPatch].join('.')

fs.writeFileSync(ENV_PATH, `REACT_APP_VERSION=${newVersion}\n`)

exec(`git add ${ENV_PATH}`)
exec(`git commit -m "Bump version to ${newVersion}"`)
exec('git push')
exec(`git checkout -b releases/${newVersion}`)
exec('yarn build')
exec('git add .')
exec('git commit -m "Builded"')
exec(`git push --set-upstream origin releases/${newVersion}`)
