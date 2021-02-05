/*
  The top-level IPFS library. This library will encapsulate the following
  libraries:
  - circuit-relay
  - pubsub
  - peers
*/

// Local libraries.
const CircuitRelay = require('./circuit-relay')

// A local global that maintains scope to the instance of this Class.
let _this

class IPFS {
  constructor (ipfsConfig) {
    // Input Validation
    if (!ipfsConfig.ipfs) {
      throw new Error(
        'An instance of IPFS must be passed when instantiating the ipfs-lib library.'
      )
    }
    if (!ipfsConfig.type) {
      throw new Error('The type of IPFS node must be specified.')
    }

    // Pass-through config settings.
    this.ipfs = ipfsConfig.ipfs
    this.logger = ipfsConfig.logHandler

    this.state = {
      isReady: false,
      type: ipfsConfig.type
    }

    this.cr = new CircuitRelay({
      ipfs: this.ipfs,
      type: this.state.type,
      logHandler: this.logger
    })

    _this = this
  }

  // This function is called during instantiation. It will set the `isReady`
  // flag in the state, once the IPFS node has intialized.
  async getNodeInfo () {
    try {
      // Wait until the IPFS creation Promise has resolved, and the node is
      // fully instantiated.
      this.ipfs = await this.ipfs

      // Get ID information about this IPFS node.
      const id2 = await this.ipfs.id()

      this.state.ipfsPeerId = id2.id

      const addrs = id2.addresses.map(elem => elem.toString())
      this.state.addresses = addrs

      // Signal to the rest of the library that the IPFS node is setup and
      // ready to be used.
      this.state.isReady = true

      this.logger('IPFS state: ', this.state)
    } catch (err) {
      console.error('Error in ipfs-lib.js/getNodeInfo()')
      throw err
    }
  }

  // Initialization function that kicks off timer-intervals that attempt to
  // keep this IPFS node connected to the network and coordinated with peers
  // and circuit relays.
  initIpfs () {
    try {
      // Initialize the IPFS node, and set the initial state.
      this.getNodeInfo()

      // Periodically maintain the connection to Circuit Relays.
      this.circuitRelayTimerHandle = setInterval(function () {
        _this.manageCircuitRelays()
      }, 60000) // One Minute

      // Periodically maintain the connection to other coordination peers.
      this.peerTimerHandle = setInterval(function () {
        _this.managePeers()
      }, 60000) // One Minute
    } catch (err) {
      console.error('Error in ipfs-lib.js/initIpfs()')
      throw err
    }
  }

  async manageCircuitRelays () {
    try {
      // Quietly exit if the IPFS node has NOT been initialized.
      if (!this.state.isReady) return

      await this.cr.connectToCRs()
    } catch (err) {
      console.error('Error in ipfs-lib.js/manageCircuitRelays(): ', err)
      // Note: Do not throw an error. This is a top-level function.
    }
  }

  async managePeers () {
    try {
      // Quietly exit if the IPFS node has not been initialized.
      if (!this.state.isReady) return

      this.logger('managePeers')
    } catch (err) {
      console.error('Error in ipfs-lib.js/managePeers(): ', err)
      // Note: Do not throw an error. This is a top-level function.
    }
  }
}

module.exports = IPFS
