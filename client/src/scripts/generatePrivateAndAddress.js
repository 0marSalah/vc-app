const { EthrDID } = require('ethr-did');
const { Wallet } = require('ethers');

// Generate a new wallet
const wallet = Wallet.createRandom();
console.log('Private Key:', wallet.privateKey);
console.log('Address:', wallet.address);

// Create an EthrDID instance
const ethrDid = new EthrDID({
  identifier: wallet.address,
  privateKey: wallet.privateKey,
});
console.log('DID:', ethrDid.did);
