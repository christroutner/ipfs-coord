/*
A library for managing connections to IPFS peers.

TODO: Build these methods:
- setState() - Set the state of the instance of this Class.
- getState() - Get the state of the instance of this Class.
- reconnect() - Reconnect to the known peers.
- pruneConnections() - Disconnect dead or misbehaving nodes.
- addPeer() - Add a new peer to the state, based on a recieved announcement message.
- announce() - Announce this node on the coordination channel
*/

let _this

class Peer {
  constructor (peerConfig) {
    this.state = {
      peers: {} // Each peer is an object, identified by their IPFS ID.
    }

    _this = this
  }

  // Add a peer to the state of this instance. If peer is already in the state,
  // it's entry will be updated.
  addPeer (announceObj) {
    try {
      // console.log('announceObj: ', announceObj)

      _this.state.peers[announceObj.from] = announceObj.data
      console.log(`Peer ${announceObj.from} updated peer state.`)
    } catch (err) {
      console.log('Error in addPeer()')
      throw err
    }
  }
}

module.exports = Peer
