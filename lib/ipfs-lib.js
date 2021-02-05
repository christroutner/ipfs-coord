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

    this.ipfs = ipfsConfig.ipfs

    this.state = {
      isReady: false
    }
  }

  // This function is called during instantiation. It will set the `isReady`
  // flag in the state, once the IPFS node has intialized.
  async getNodeInfo () {
    try {
      // Wait until the IPFS creation Promise has resolved, and the node is
      // fully instantiated.
      this.ipfs = await this.ipfs

      const id = await this.ipfs.config.get('Identity')
      console.log('id1: ', id)

      const id2 = await this.ipfs.id()
      console.log('id2: ', id2)

      const ipfsId = id.PeerID
      console.log('ipfsId: ', ipfsId)
    } catch (err) {
      console.error('Error in ipfs-lib.js/getNodeInfo()')
      throw err
    }
  }
}

module.exports = IPFS
