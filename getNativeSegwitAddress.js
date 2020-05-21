'use strict'
const keypairs = require('./keypairs');
const btcjs = require('bitcoinjs-lib');

const p2shAddresses = keypairs.map( keypair =>{
    const pay1 = btcjs.payments.p2wpkh({pubkey: keypair.publicKey, network: btcjs.networks.testnet});
    return pay1.address
})

console.log(p2shAddresses);
module.exports = p2shAddresses;
