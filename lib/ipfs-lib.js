/*
  The top-level IPFS library. This library will encapsulate the following
  libraries:
  - circuit-relay
  - pubsub
  - peers
*/

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
  }

  // This function is called during instantiation. It will set the `isReady`
  // flag in the state, once the IPFS node has intialized.
  async getNodeInfo () {
    try {
      // Wait until the IPFS creation Promise has resolved, and the node is
      // fully instantiated.
      this.ipfs = await this.ipfs

      // const id = await this.ipfs.config.get('Identity')
      // console.log('id1: ', id)
      // this.ipfsPeerId = id.PeerId

      const id2 = await this.ipfs.id()
      console.log('id2: ', id2)
      this.state.ipfsPeerId = id2.id

      const addrs = id2.addresses.map(elem => elem.toString())
      this.state.addresses = addrs

      console.log('IPFS state: ', this.state)
    } catch (err) {
      console.error('Error in ipfs-lib.js/getNodeInfo()')
      throw err
    }
  }
}

module.exports = IPFS
