'use strict'
const keypairs = require('./../common/keypairs');
const btcjs = require('bitcoinjs-lib');
const coininfo = require('coininfo');

let network = coininfo.litecoin.test;
const basePath = `m/44'/` + network.versions.bip44 + `'/0'/0/`;

network = network.toBitcoinJS();
console.log(network);


const classicAddresses = keypairs(basePath, network).map( keypair =>{
    return btcjs.payments.p2pkh({pubkey: keypair.publicKey, network:network}).address
})

console.log(classicAddresses);
module.exports = classicAddresses;

