'use strict'
const keypairs = require('./../common/keypairs');
const btcjs = require('bitcoinjs-lib');
const {network, bip44} = require('./network');
const basePath = `m/49'/` + bip44 + `'/0'/0/`;

console.log(network);

const keys = keypairs(basePath, network);

const addresses = keys.map( keypair =>{
    const pay1 = btcjs.payments.p2wpkh({pubkey: keypair.publicKey, network});
    const pay2 = btcjs.payments.p2sh({redeem:pay1, network})
    return pay2.address;
})

console.log(addresses);
module.exports = {
    keypairs: keys,
    addresses
}
