/*
  The top-level IPFS library. This library will encapsulate the following
  libraries:
  - circuit-relay
  - pubsub
  - peers
*/

// Local libraries.
const CircuitRelay = require('./circuit-relay')
const PubSub = require('./pubsub')
const Schema = require('./schema')
const Peers = require('./peers')

const DEFAULT_COORDINATION_ROOM = 'psf-ipfs-coordination-001'

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
      isReady: false, // IPFS node is ready, but not setup.
      isSetup: false, // IPFS node is ready and setup.
      type: ipfsConfig.type
    }

    this.cr = new CircuitRelay({
      ipfs: this.ipfs,
      type: this.state.type,
      logHandler: this.logger
    })

    this.peers = new Peers({ ipfs: this.ipfs, cr: this.cr })
    this.pubsub = new PubSub({
      ipfs: this.ipfs,
      logHandler: this.logger,
      peers: this.peers
    })
    this.schema = new Schema()

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
      this.state.ipfsMultiaddrs = addrs

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
  async initIpfs () {
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
      }, 20000) // Twenty Seconds

      // Periodically manage the pubsub channels.
      // this.pubsubTimerHandle = setInterval(function () {
      //   _this.managePubSubChannels()
      // }, 60000)

      // Periodically announce this nodes existance to the network.
      this.announceTimerHandle = setInterval(function () {
        _this.manageAnnouncement()
      }, 15000)

      // Wait a short delay for the IPFS node to initialize.
      await this.sleep(5000)

      // Kick off the first call to handle circuit relays and peers.
      _this.manageCircuitRelays()
      _this.managePubSubChannels()

      this.state.isSetup = true
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

      // this.logger('managePeers')
      await this.peers.refreshPeerConnections()
    } catch (err) {
      console.error('Error in ipfs-lib.js/managePeers(): ', err)
      // Note: Do not throw an error. This is a top-level function.
    }
  }

  async managePubSubChannels () {
    try {
      // Quietly exit if the IPFS node has not been initialized.
      if (!this.state.isReady) return

      // Subscribe to the coordination channel, where new peers announce themselves
      // to the network.
      this.pubsub.subscribeToPubsubChannel(
        DEFAULT_COORDINATION_ROOM,
        this.peers.addPeer
      )

      this.logger('managePubSubChannels')
    } catch (err) {
      console.error('Error in ipfs-lib.js/managePubSubChannels(): ', err)
      // Note: Do not throw an error. This is a top-level function.
    }
  }

  // Announce the existance of this node to the network.
  async manageAnnouncement () {
    try {
      // Quietly exit if the IPFS node has not been initialized.
      if (!this.state.isReady) return

      // Get the information needed for the announcement.
      const announceObj = {
        ipfsId: this.state.ipfsPeerId,
        ipfsMultiaddrs: this.state.ipfsMultiaddrs,
        type: this.state.type
      }
      const announceMsgObj = this.schema.announcement(announceObj)
      const announceMsgStr = JSON.stringify(announceMsgObj)

      // const now = new Date()
      // const testStr = `${now.toLocaleString()}: Announcement from IPFS node ${this.state.ipfsPeerId}`

      await this.pubsub.publishToPubsubChannel(
        DEFAULT_COORDINATION_ROOM,
        announceMsgStr
      )

      const now = new Date()
      this.logger(
        `Announced self on ${DEFAULT_COORDINATION_ROOM} pubsub channel at ${now.toLocaleString()}`
      )
    } catch (err) {
      console.error('Error in ipfs-lib.js/manageAnnouncement(): ', err)
      // Note: Do not throw an error. This is a top-level function.
    }
  }

  sleep (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

module.exports = IPFS
