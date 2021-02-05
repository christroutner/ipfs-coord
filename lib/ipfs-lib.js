/*
  The top-level IPFS library. This library will encapsulate the following
  libraries:
  - circuit-relay
  - pubsub
  - peers
*/

class IPFS {
  constructor (ipfsConfig) {
    if (!ipfsConfig.ipfs) {
      throw new Error(
        'An instance of IPFS must be passed when instantiating the ipfs-lib library.'
      )
    }

    this.ipfs = ipfsConfig
    this.state = {}
  }

  getNodeInfo () {
    try {
      console.log('hello world')
    } catch (err) {
      console.error('Error in ipfs-lib.js/getNodeInfo()')
      throw err
    }
  }
}

module.exports = IPFS
