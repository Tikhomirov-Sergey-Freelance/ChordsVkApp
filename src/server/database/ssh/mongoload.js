const node_ssh = require('node-ssh');
const fs = require('fs')
const path = require('path')
const { NodeSSH } = require('node-ssh')
const { execSync } = require('child_process')

const ssh = new NodeSSH()

const config = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../../..', 'ChordsPrivate/ssh/config.json')).toString('utf8'))

config['agent'] = process.env.SSH_AUTH_SOCK
config['privateKey'] = path.normalize(`${__dirname}/../../../../ChordsPrivate/ssh/privatekey.ppk`)

//mongodump -d<dbname> -o <backUpPath>

const localDir = path.normalize(`${__dirname}/mongo-dump`)
const remoteDumpDir = `/opt/mongo-dump`
const dbName = 'chords'
const remoteDir = `${remoteDumpDir}/${dbName}`

async function createLocalDir() {

  if (fs.existsSync(localDir)) {

    await new Promise(async (resolve) => {

        await fs.rmdir(`${localDir}`, { recursive: true }, (err, data) => {

            if(err) {
                console.log('rmdir', err) 
            }

            resolve()

        })
    })

    console.log('Удалили старую папку с логами')
}

fs.mkdirSync(localDir)

console.log('Создали новую папку с логами')
}


async function run() {

  const connect = await ssh.connect(config)
  //const sudosu = await ssh.execCommand('sudo su -')
  const mongodumpCommang = await ssh.execCommand(`sudo mongodump -d ${dbName} -o ${remoteDumpDir}`, { cwd: '/opt/' })
  console.log('command mongodump', mongodumpCommang)

  const filesString = await ssh.execCommand('sudo ls', { cwd: remoteDir })
  let files = filesString.stdout.split('\n')

  console.log('Спимок файлов', files)

  try {

    while (files.length) {
      const file = files.pop()
      await ssh.getFile(localDir + `/${file}`, remoteDir + `/${file}`)
    }

  } catch (error) {
    console.log('load logs error', error)
  }

  const mongostoreCommang = JSON.stringify(execSync(`mongorestore --db ${dbName}  ${localDir}`))
  console.log('command mongostore', mongostoreCommang)

  process.exit()
}

createLocalDir()
run();