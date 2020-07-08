'use strict'
const keypairs = require('./keypairs');
const btcjs = require('bitcoinjs-lib');

const p2shAddresses = keypairs.map( keypair =>{
    const pay1 = btcjs.payments.p2wpkh({pubkey: keypair.publicKey, network: btcjs.networks.testnet});
    const pay2 = btcjs.payments.p2sh({redeem:pay1, network: btcjs.networks.testnet})
    return pay2.address
})

console.log(p2shAddresses);
module.exports = p2shAddresses;