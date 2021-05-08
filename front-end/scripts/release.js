const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

if (!process.cwd().endsWith('front-end'))
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

const exec = (path) => execSync(path, { encoding: 'utf-8' })

const gitStatusResult = exec('git status')

if (!/On branch main/.test(gitStatusResult))
  throw new Error('Must be initiated from main branch')
if (/Changes not staged for commit:|Untracked files:/i.test(gitStatusResult))
  throw new Error('Must have clean repo before releasing')

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
exec(`git checkout -b releases/${newVersion}`)
exec('yarn build')
exec('git add .')
exec('git commit -m "Builded"')
exec(`git push --set-upstream origin releases/${newVersion}`)
