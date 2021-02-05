/*
  An npm JavaScript library for front end web apps. Implements a minimal
  Bitcoin Cash wallet.
*/

/* eslint-disable no-async-promise-executor */

// 'use strict'

// Public npm libraries
const BCHJS = require('@psf/bch-js')

// local libraries
const Util = require('./lib/util')
const Ipfs = require('./lib/ipfs-lib')

let _this // local global for 'this'.

class IpfsCoord {
  constructor (config) {
    _this = this

    if (!config.ipfs) {
      throw new Error(
        'An instance of IPFS must be passed when instantiating the ipfs-coord library.'
      )
    }

    // All the configuration of an optional handler for log reports. If none
    // is specified, default to console.log.
    if (config.logHandler) {
      this.logger = config.logHandler
    } else {
      this.logger = console.log
    }
    config.logHandler = this.logger

    // Instatiate and encapsulate support libraries.
    _this.bchjs = new BCHJS()
    _this.util = new Util()
    _this.ipfs = new Ipfs(config)

    // Initialize the IPFS node and start the coordination daemon.
    _this.ipfs.initIpfs()
  }
}

module.exports = IpfsCoord
