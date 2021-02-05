/*
  The top-level IPFS library. This library will encapsulate the following
  libraries:
  - circuit-relay
  - pubsub
  - peers
*/

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

    this.ipfs = ipfsConfig.ipfs

    this.state = {
      isReady: false,
      type: ipfsConfig.type
    }

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

      console.log('IPFS state: ', this.state)

      this.state.isReady = true
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
      // Quietly exit if the IPFS node has not been initialized.
      if (!this.state.isReady) return

      console.log('manageCircuitRelays')
    } catch (err) {
      console.error('Error in ipfs-lib.js/manageCircuitRelays()')
      // Note: Do not throw an error. This is a top-level function.
    }
  }

  async managePeers () {
    try {
      // Quietly exit if the IPFS node has not been initialized.
      if (!this.state.isReady) return

      console.log('managePeers')
    } catch (err) {
      console.error('Error in ipfs-lib.js/managePeers()')
      // Note: Do not throw an error. This is a top-level function.
    }
  }
}

module.exports = IPFS
