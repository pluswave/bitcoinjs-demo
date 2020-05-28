'use strict';
const utils = require('./utils');
const mnemonic = require('./mnemonic').mnemonic;
const btcjs = require('bitcoinjs-lib');

var keypairs = [0,1,2].map( x => {
    let path = `m/44'/0'/0'/0/` + x;
    let p = utils.getBitCoinECPair(mnemonic, {
        network: btcjs.networks.testnet,
        path: path
    })
    p.bip32Path = path;
    return p;
});

module.exports = keypairs;
