/*
  Schema templates for sending and recieving messages from other IPFS peers.

  TODO: Bulid these methods:
  - announcement() - template for announcing the node to the pubsub channel.
*/

class Schema {
  constructor (schemaConfig) {
    // Initialize the state with default values.
    this.state = {
      ipfsId: schemaConfig.ipfsId ? schemaConfig.ipfsId : null,
      type: schemaConfig.type ? schemaConfig.type : null,
      ipfsMultiaddrs: schemaConfig.ipfsMultiaddrs ? schemaConfig.ipfsMultiaddrs : [],
      isCircuitRelay: schemaConfig.isCircuitRelay ? schemaConfig.isCircuitRelay : false
    }
  }

  // Returns a JSON object that represents an announement message.
  announcement (announceObj) {
    const retObj = {
      apiName: 'ipfs-coord-announce',
      apiVersion: '1.3.0',
      apiInfo: 'ipfs-hash-to-documentation-to-go-here',

      // IPFS specific information for this node.
      ipfsId: this.state.ipfsId,
      type: this.state.type,
      ipfsMultiaddrs: this.state.ipfsMultiaddrs,

      // The circuit relays preferred by this node.
      circuitRelays: [],
      isCircuitRelay: this.state.isCircuitRelay,

      // Array of objects, containing addresses for different blockchains.
      cryptoAddresses: [],

      // BCH public key, used for e2e encryption.
      encryptPubKey: ''
    }

    return retObj
  }

  // Returns a JSON object that represents a chat message.
  // Inputs:
  // - message - string text message
  // - handle - the desired display name for the user
  chat (msgObj) {
    const { message, handle } = msgObj

    const retObj = {
      apiName: 'chat',
      apiVersion: '1.3.0',
      apiInfo: 'ipfs-hash-to-documentation-to-go-here',

      // IPFS specific information for this node.
      ipfsId: this.state.ipfsId,
      type: this.state.type,
      ipfsMultiaddrs: this.state.ipfsMultiaddrs,

      // The circuit relays preferred by this node.
      circuitRelays: [],

      // Array of objects, containing addresses for different blockchains.
      cryptoAddresses: [],

      // BCH public key, used for e2e encryption.
      encryptPubKey: '',

      data: {
        message: message,
        handle: handle
      }
    }

    return retObj
  }
}

module.exports = Schema
