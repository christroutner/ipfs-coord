/*
  An npm JavaScript library for front end web apps. Implements a minimal
  Bitcoin Cash wallet.
*/

/* eslint-disable no-async-promise-executor */

'use strict'

// Public npm libraries
const BCHJS = require('@psf/bch-js')

// local libraries
const Util = require('./lib/util')
const Ipfs = require('./lib/ipfs-lib')

let _this // local global for 'this'.

class BoilplateLib {
  constructor (config) {
    _this = this

    if (!config.ipfs) {
      throw new Error(
        'An instance of IPFS must be passed when instantiating the ipfs-coord library.'
      )
    }

    // Instatiate and encapsulate support libraries.
    _this.bchjs = new BCHJS()
    _this.util = new Util()
    _this.ipfs = new Ipfs(config)

    _this.ipfs.getNodeInfo()
  }
}

module.exports = BoilplateLib
