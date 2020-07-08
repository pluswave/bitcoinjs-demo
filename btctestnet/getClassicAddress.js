'use strict'
const keypairs = require('./keypairs');
const btcjs = require('bitcoinjs-lib');

const classicAddresses = keypairs.map( keypair =>{
    return btcjs.payments.p2pkh({pubkey: keypair.publicKey, network: btcjs.networks.testnet}).address
})

console.log(classicAddresses);
module.exports = classicAddresses;

