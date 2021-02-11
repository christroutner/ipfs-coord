/*
  A mocked instance of ipfs, for use in unit tests.
*/

const ipfs = {
  id: () => {},
  swarm: {
    connect: async () => {}
  }
}

module.exports = ipfs
