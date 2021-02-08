# ipfs-coord

This is a JavaScript npm library built on top of [js-ipfs](https://github.com/ipfs/js-ipfs).
This library will help IPFS peers coordinate, discover a common interest, and then stay connected around that interest. It primarily uses IPFS pubsub channels for communication, circuit relays for censorship resistance, and Bitcoin Cash for end-to-end encryption and payments. This library will automatically track peers, connect to them through circuit-relays, and end-to-end encrypt all communication with each node.

2/7/2020:
This library has proven out the concept, and is in the process of being refined. Tests are being written, and it's shooting for 100% test coverage, before too many new features are added.

Here are some use cases where IPFS node coordination is needed:
- e2e encrypted chat
- Circuit-relay as-a-service
- Creating CoinJoin transactions
- Decentralized exchange of currencies
- Compute-as-a-service
- Storage-as-a-service

Here is some videos and blog posts that preceded this work:
- [UncensorablePublishing.com](https://uncensorablepublishing.com)
- [Building Uncensorable REST APIs](https://youtu.be/VVc0VbOD4co)
- [IPFS API](https://troutsblog.com/blog/ipfs-api)
- [PS004 Collaborative CoinJoin](https://github.com/Permissionless-Software-Foundation/specifications/blob/master/ps004-collaborative-coinjoin.md)

## Install
Install the npm library:
`npm install --save ipfs-coord`

Setup a development environment:
```
git clone https://github.com/christroutner/ipfs-coord
cd ipfs-coord
npm install
npm test
```

# Licence
[MIT](LICENSE.md)
