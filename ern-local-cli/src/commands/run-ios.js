// @flow

import utils from '../lib/utils'
import {
  utils as coreUtils,
  deviceConfig
} from 'ern-core'

exports.command = 'run-ios'
exports.desc = 'Run one or more MiniApps in the iOS Runner application'

exports.builder = function (yargs: any) {
  return yargs
    .option('dev', {
      type: 'bool',
      describe: 'Enable or disable React Native dev support'
    })
    .option('miniapps', {
      type: 'array',
      alias: 'm',
      describe: 'One or more MiniApps to combine in the Runner Container'
    })
    .option('dependencies', {
      type: 'array',
      alias: 'deps',
      describe: 'One or more additional native dependencies to add to the Runner Container'
    })
    .option('descriptor', {
      type: 'string',
      alias: 'd',
      describe: 'Full native application descriptor'
    })
    .option('mainMiniAppName', {
      type: 'string',
      describe: 'Name of the MiniApp to launch when starting the Runner application'
    })
    .option('usePreviousDevice', {
      type: 'bool',
      alias: 'u',
      describe: 'Use the previously selected device to avoid prompt'
    })
    .option('host', {
      type: 'string',
      describe: 'Host/IP to use for the local packager',
      default: 'localhost'
    })
    .option('port', {
      type: 'string',
      describe: 'Port to use for the local package',
      default: '8081'
    })
    .epilog(utils.epilog(exports))
}

exports.handler = async function ({
  miniapps,
  dependencies = [],
  descriptor,
  mainMiniAppName,
  dev,
  usePreviousDevice,
  host,
  port
} : {
  miniapps?: Array<string>,
  dependencies: Array<string>,
  descriptor?: string,
  mainMiniAppName?: string,
  dev?: boolean,
  usePreviousDevice?: boolean,
  host?: string,
  port?: string
}) {
  try {
    if (process.platform !== 'darwin') {
      return log.error('This command can only be used on Mac OS X')
    }
    deviceConfig.updateDeviceConfig('ios', usePreviousDevice)

    await utils.runMiniApp('ios', {
      mainMiniAppName,
      miniapps,
      dependencies,
      descriptor,
      dev,
      host,
      port
    })
  } catch (e) {
    coreUtils.logErrorAndExitProcess(e)
  }
}
