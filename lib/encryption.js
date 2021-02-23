/*
  A library for end-to-end encryption (e2ee). This will largely be a wrapper
  for existing encryption libraries.
*/

const BchEncrypt = require('bch-encrypt-lib/index.js')

class PeerEncryption {
  constructor (encryptConfig) {
    if (!encryptConfig) {
      throw new Error(
        'Must pass a config object when instantiating the encryption library.'
      )
    }

    if (!encryptConfig.bchLib) {
      throw new Error(
        'Must pass in an instance of bch-lib.js when instantiating the encryption library.'
      )
    }

    if (!encryptConfig.BCHJS) {
      throw new Error(
        'Must pass in the BCHJS Class when instantiating the encryption library.'
      )
    }

    this.state = {
      ipfsId: encryptConfig.ipfsId
    }

    this.bchLib = encryptConfig.bchLib
    this.bchEncrypt = new BchEncrypt(encryptConfig.BCHJS)
    this.ipfs = encryptConfig.ipfs
  }

  // Decrypt incoming messages on the pubsub channel for this node.
  async decryptMsg (msgObj) {
    try {
      console.log('decryptMsg msgObj: ', msgObj)

      const privKey = await this.bchLib.generatePrivateKey()
      console.log(`privKey: ${privKey}`)

      const encryptedHexData = msgObj.data.toString('hex')
      console.log(`encryptedHexData: ${encryptedHexData}`)

      const decryptedHexStr = await this.bchEncrypt.encryption.decryptFile(privKey, encryptedHexData)
      console.log(`decryptedHexStr ${decryptedHexStr}`)

      const decryptedBuff = Buffer.from(decryptedHexStr, 'hex')

      const decryptedStr = decryptedBuff.toString()
      console.log(`decryptedStr: ${decryptedStr}`)
    } catch (err) {
      console.error('Error in decryptMsg()')
      throw err
    }
  }

  // Send an e2e encrypted message to a peer.
  async sendEncryptedMsg (peer, msg) {
    try {
      console.log('sendEncryptedMsg peer: ', peer)
      console.log('sendEncryptedMsg msg: ', msg)

      const channel = peer.ipfsId.toString()
      const pubKey = peer.encryptPubKey

      const msgBuf = Buffer.from(msg, 'utf8').toString('hex')
      console.log(`msgBuf: ${msgBuf}`)

      const encryptedHexStr = await this.bchEncrypt.encryption.encryptFile(pubKey, msgBuf)
      console.log(`encryptedHexStr: ${encryptedHexStr}`)

      const msgBuf2 = Buffer.from(encryptedHexStr, 'hex')

      // Publish the message to the pubsub channel.
      await this.ipfs.pubsub.publish(channel, msgBuf2)

      console.log('Encrypted message published.')
    } catch (err) {
      console.error('Error in sendEncryptedMsg()')
      throw err
    }
  }
}

module.exports = PeerEncryption
