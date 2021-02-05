/*
  A library for managing IPFS pubsub channels.

  TODO: Implement these methods:
  - subscribe to a pubsub channel.
  - unsubscribe from a pubsub channel.
  - publish a message to a pubsub channel.
  - parse pubsub messages into a JSON object.
  - setState() - Set the state of the instance of this Class.
  - getState() - Get the state of the instance of this Class.
  - getPubSubCoordChannels - retrieve updated pubsub coordination channels from
    IPNS or the BCH blockchain.
*/

let _this

class PubSub {
  constructor (pubsubConfig) {
    if (!pubsubConfig.ipfs) {
      throw new Error(
        'Must pass in an instance of IPFS when instantiating the pubsub library.'
      )
    }

    this.ipfs = pubsubConfig.ipfs

    _this = this
  }

  async parsePubsubMessage (msg) {
    try {
      console.log(msg.data.toString())
    } catch (err) {
      console.error('Error in parsePubsubMessage(): ', err)
      // Do not throw an error. This is a top-level function.
    }
  }

  async subscribeToPubsubChannel (chanName) {
    try {
      await this.ipfs.pubsub.subscribe(chanName, async msg => {
        await _this.parsePubsubMessage(msg)
      })
    } catch (err) {
      console.error('Error in subscribeToPubsubChannel()')
      throw err
    }
  }

  // Converts an input string to a Buffer and then broadcasts it to the given
  // pubsub room.
  async publishToPubsubChannel (chanName, msgStr) {
    try {
      const msgBuf = Buffer.from(JSON.stringify(msgStr))

      // Publish the message to the pubsub channel.
      await this.ipfs.pubsub.publish(chanName, msgBuf)
    } catch (err) {
      console.error('Error in publishToPubsubChannel()')
      throw err
    }
  }
}

module.exports = PubSub
