'use strict'
const keypairs = require('./../common/keypairs');
const btcjs = require('bitcoinjs-lib');
const coininfo = require('coininfo');

let network = coininfo.litecoin.test;
const basePath = `m/49'/` + network.versions.bip44 + `'/0'/0/`;

network = network.toBitcoinJS();
console.log(network);


const addresses = keypairs(basePath, network).map( keypair =>{
    const pay1 = btcjs.payments.p2wpkh({pubkey: keypair.publicKey, network: btcjs.networks.testnet});
    const pay2 = btcjs.payments.p2sh({redeem:pay1, network: btcjs.networks.testnet})
    return pay2.address;
})

console.log(addresses);
module.exports = addresses;
