/*
  Schema templates for sending and recieving messages from other IPFS peers.

  TODO: Bulid these methods:
  - announcement() - template for announcing the node to the pubsub channel.
*/

class Schema {
  // constructor (schemaConfig) {}

  // Returns a JSON object that represents an announement message.
  announcement (announceObj) {
    try {
      const retObj = {
        apiName: 'ipfs-coord',
        apiVersion: '1.2.5',
        apiInfo: 'ipfs-hash-to-go-here',

        // IPFS specific information for this node.
        ipfsId: announceObj.ipfsId,
        type: announceObj.type,
        ipfsMultiaddrs: announceObj.ipfsMultiaddrs,

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
}

module.exports = Schema
