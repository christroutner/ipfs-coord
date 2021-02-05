/*
  Schema templates for sending and recieving messages from other IPFS peers.

  TODO: Bulid these methods:
  - announcement() - template for announcing the node to the pubsub channel.
*/

class Schema {
  constructor (schemaConfig) {
    this.state = {}
  }

  // Returns a JSON object that represents an announement message.
  announcement (announceObj) {
    try {
      this.state.ipfsId = announceObj.ipfsId
      this.state.type = announceObj.type
      this.state.ipfsMultiaddrs = announceObj.ipfsMultiaddrs

      const retObj = {
        apiName: 'ipfs-coord',
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
        encryptPubKey: ''
      }

      return retObj
    } catch (err) {
      console.error('Error in schema.js/announcement()')
      throw err
    }
  }

  // Returns a JSON object that represents a chat message.
  chat (msg) {
    try {
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
          message: msg
        }
      }

      return retObj
    } catch (err) {
      console.error('Error in schema.js/chat()')
      throw err
    }
  }
}

module.exports = Schema
