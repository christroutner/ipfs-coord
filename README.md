# ipfs-coord

This is a JavaScript npm library built on top of [js-ipfs](https://github.com/ipfs/js-ipfs).
Right now this is just a prototype and a placeholder. When built, this library will help IPFS peers coordinate, discover a common interest, and then stay connected around that interest. It primarily uses IPFS pubsub channels for communication, circuit relays for censorship resistance, and Bitcoin Cash for end-to-end encryption and payments.

Here are some use cases where IPFS node coordination is needed:
- e2e encrypted chat
- Circuit-relay as-a-service
- Creating CoinJoin transactions
- Decentralized exchange of currencies
- Compute-as-a-service
- Storage-as-a-service

Here is some videos and blog posts that preceeded this work:
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
