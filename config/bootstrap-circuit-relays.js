/*
  This library contains known circuit relays that new IPFS nodes can use to
  bootstrap themselves into the network and join the pubsub network.
*/
/* eslint camelcase: 0 */

const BOOTSTRAP_BROWSER_CRs = [
  {
    name: 'ipfs-cr-wss.fullstack.nl',
    multiaddr:
      '/dns4/ipfs-cr-wss.fullstackcash.nl/tcp/443/wss/ipfs/QmRrUu64cAnPntYiUc7xMunLKZgj1XZT5HmqJNtDMqQcD7',
    connected: false
  },
  {
    name: 'node0.preload.ipfs.io',
    multiaddr: '/dns4/node0.preload.ipfs.io/tcp/443/wss/p2p/QmZMxNdpMkewiVZLMRxaNxUeZpDUb34pWjZ1kZvsd16Zic',
    connected: false
  },
  {
    name: 'node1.preload.ipfs.io',
    multiaddr: '/dns4/node1.preload.ipfs.io/tcp/443/wss/p2p/Qmbut9Ywz9YEDrz8ySBSgWyJk41Uvm2QJPhwDJzJyGFsD6',
    connected: false
  },
  {
    name: 'node2.preload.ipfs.io',
    multiaddr: '/dns4/node2.preload.ipfs.io/tcp/443/wss/p2p/QmV7gnbW5VTcJ3oyM2Xk1rdFBJ3kTkvxc87UFGsun29STS',
    connected: false
  },
  {
    name: 'node3.preload.ipfs.io',
    multiaddr: '/dns4/node3.preload.ipfs.io/tcp/443/wss/p2p/QmY7JB6MQXhxHvq7dBDh4HpbH29v4yE9JRadAVpndvzySN',
    connected: false
  }
]

const BOOTSTRAP_NODE_CRs = [
  {
    name: 'ipfs.fullstack.cash',
    multiaddr:
      '/ip4/116.203.193.74/tcp/4001/ipfs/QmNZktxkfScScnHCFSGKELH3YRqdxHQ3Le9rAoRLhZ6vgL',
    connected: false
  },
  {
    name: 'chat.psfoundation.cash',
    multiaddr:
      '/ip4/138.68.212.34/tcp/4002/ipfs/QmaUW4oCVPUFLRqeSjvhHwGFJHGWrYWLBEt7WxnexDm3Xa',
    connected: false
  },
  {
    name: 'ipfs-cr.fullstack.nl',
    multiaddr:
      '/ip4/157.90.20.129/tcp/4002/ipfs/QmRrUu64cAnPntYiUc7xMunLKZgj1XZT5HmqJNtDMqQcD7',
    connected: false
  }
]

const bootstrapCircuitRelays = {
  browser: BOOTSTRAP_BROWSER_CRs,
  node: BOOTSTRAP_NODE_CRs
}

module.exports = bootstrapCircuitRelays
