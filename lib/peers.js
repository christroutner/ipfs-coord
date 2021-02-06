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

class Peer {
  // constructor (peerConfig) {}

  // Add a peer to the state of this instance. If peer is already in the state,
  // the input will be ignored.
  addPeer (announceObj) {
    try {
      console.log('announceObj: ', announceObj)
    } catch (err) {
      console.log('Error in addPeer()')
      throw err
    }
  }
}

module.exports = Peer
