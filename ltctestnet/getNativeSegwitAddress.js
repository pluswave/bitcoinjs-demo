'use strict'
const keypairs = require('./../common/keypairs');
const btcjs = require('bitcoinjs-lib');
const {network, bip44} = require('./network');
const basePath = `m/84'/` + bip44 + `'/0'/0/`;

console.log(network);

const keys = keypairs(basePath, network);

const addresses = keys.map( keypair =>{
    return btcjs.payments.p2wpkh({pubkey: keypair.publicKey, network:network}).address
})

console.log(addresses);
module.exports = {
    keypairs: keys,
    addresses
}