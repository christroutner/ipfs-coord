/*
  A library for managing connections to a Circuit Relay node.

  TODO: Build these methods:
  - setState() - Set the state of the instance of this Class.
  - getState() - Get the state of the instance of this Class.
  - reconnect() - Reconnect to the known circuit relay nodes.
  - pruneConnections() - Disconnect dead or misbehaving nodes.
  - addRelay() - Add a new relay to the state.
*/
/* eslint camelcase: 0 */

// Known Circuit Relay IPFS nodes, to bootstrap this node.
const BOOTSTRAP_BROWSER_CRs = [
  {
    name: 'wss.fullstack.cash',
    multiaddr:
      '/dns4/wss.fullstack.cash/tcp/443/wss/ipfs/QmNZktxkfScScnHCFSGKELH3YRqdxHQ3Le9rAoRLhZ6vgL',
    connected: false
  }
]
const BOOTSTRAP_NODE_CRs = [
  {
    name: 'ipfs.fullstack.cash',
    multiaddr:
      '/ip4/116.203.193.74/tcp/4001/ipfs/QmNZktxkfScScnHCFSGKELH3YRqdxHQ3Le9rAoRLhZ6vgL',
    connected: false
  },
  {
    name: 'chat.psfoundation.cash',
    multiaddr:
      '/ip4/138.68.212.34/tcp/4002/ipfs/QmaUW4oCVPUFLRqeSjvhHwGFJHGWrYWLBEt7WxnexDm3Xa',
    connected: false
  }
]

class CircuitRelays {
  constructor (crConfig) {
    if (!crConfig.type) {
      throw new Error('The type of IPFS node must be specified.')
    }
    if (!crConfig.ipfs) {
      throw new Error(
        'Must pass in an instance of IPFS when instantiating the CircuitRelays library.'
      )
    }

    // Pass-through config settings.
    this.ipfs = crConfig.ipfs
    this.logger = crConfig.logHandler

    // Initialize the state.
    this.state = {}

    // Set the initial CR bootstrap nodes based on the type of IPFS node.
    this.state.type = crConfig.type
    if (this.state.type === 'browser') {
      this.state.relays = BOOTSTRAP_BROWSER_CRs
    } else {
      this.state.relays = BOOTSTRAP_NODE_CRs
    }
  }

  // Renew the connection to each circuit relay in the state.
  async connectToCRs () {
    try {
      for (let i = 0; i < this.state.relays.length; i++) {
        const thisRelay = this.state.relays[i]

        await this.ipfs.swarm.connect(thisRelay.multiaddr)

        thisRelay.connected = true
      }

      const now = new Date()
      this.logger(
        `${now.toLocaleString()}: Renewed connections to all known Circuit Relay nodes.`
      )
    } catch (err) {
      console.error('Error in connectToCRs()')
      throw err
    }
  }
}

module.exports = CircuitRelays
