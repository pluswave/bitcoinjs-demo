'use strict';
const utils = require('./utils');
// bip39.generateMnemonic(256)
const mnemonic = 'welcome minimum better adjust sell spy result erupt clock zero enlist weapon dynamic drama need acquire wrestle voyage throw firm pepper differ glare only';
const btcjs = require('bitcoinjs-lib');

var keypairs = [0,1,2].map( x => {
    return utils.getBitCoinECPair(mnemonic, {
        network: btcjs.networks.testnet,
        path: `m/44'/0'/0'/0/` + x
    })
});

module.exports = keypairs;
