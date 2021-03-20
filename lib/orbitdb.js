/*
  A library for handling anything to do with OrbitDB.

  OrbitDB is used to solve a specific problem:
  Communication relies on pubsub channels. Because IPFS is a constantly shifting,
  fully-distributed network, heavily relying on circuit relays, connections
  between peers can often move out from underneith them. The ipfs-lib.js library
  has Intervals that restore these broken connections, but there are frequently
  windows that last a few seconds, where peers will be unable to recieve
  messages published to their pubsub channel.

  OrbitDB solves this issue by persisting messages. When a peer announces itself
  on the coordination pubsub channel, the other peers will subscribe to their
  private pubsub channel for passing e2e encrypted message. Additionally, thanks
  to this OrbitDB library, each peer will have a personal OrbitDB database that
  peers will write messages to. Each peer maintains a copy of all the other
  peers databases. These short-lived databases persist messages, which solves
  the 'dropped call' problem.

  These OrbitDBs are short-lived, and should not grow in size to the point where
  they are prohibitive. Since OrbitDB is an append-only database, entries can't
  be deleted to shrink the size of the database. Instead, the databases need to
  be abandoned and new databases created, in order to prevent the database from
  growing prohibitively large.
*/

const OrbitDbClass = require('orbit-db')

class OrbitDB {
  constructor () {
    this.OrbitDbClass = OrbitDbClass

    this.state = {}
  }

  async startOrbit (ipfsNode) {
    // eslint-disable-next-line no-useless-catch
    try {
      // validate input
      if (typeof ipfsNode !== 'object') {
        throw new Error('The ipfs node must be an object')
      }

      this.ipfs = ipfsNode

      // Get ID information about this IPFS node.
      const id2 = await this.ipfs.id()
      this.state.ipfsPeerId = id2.id.toString()
      console.log(`This IPFS ID: ${this.state.ipfsPeerId}`)

      // creating orbit instance
      console.log('Starting OrbitDB...!')
      const orbitdb = await this.OrbitDbClass.createInstance(this.ipfs, {
        repo: `./orbitdb/${this.state.ipfsPeerId}`
      })

      // Configure this instance of OrbitDB.
      const options = {
        accessController: {
          // Anyone can write to this database.
          write: ['*']
        }
      }

      const timestamp = this.getTimestamp()

      // Create/load orbitDB eventlog
      const dbName = this.state.ipfsPeerId + timestamp
      this.db = await orbitdb.eventlog(dbName, options)

      // If the database already exists, load the data saved to disk.
      await this.db.load()

      console.log('...OrbitDB is ready.')
      console.log(`db id: ${this.db.id}`)

      return this.db.id
    } catch (err) {
      console.error('Error in orbitdb.js/startOrbit()')
      throw err
    }
  }

  // Generate a fixed-length timestamp string for the DB name.
  getTimestamp () {
    try {
      const now = new Date()

      let year = '00' + now.getYear()
      year = year.slice(-2)

      let month = '00' + (now.getMonth() + 1)
      month = month.slice(-2)

      let date = '00' + now.getDate()
      date = date.slice(-2)

      let hour = '00' + (now.getHours() + 1)
      hour = hour.slice(-2)

      const timestamp = `${year}${month}${date}${hour}`

      return timestamp
    } catch (err) {
      console.error('Error in orbitdb.js/getTimestamp()')
      throw err
    }
  }
}

module.exports = OrbitDB
