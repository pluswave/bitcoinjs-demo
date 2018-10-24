'use strict'

const keypairs = require('./keypairs');
const btcjs = require('bitcoinjs-lib');
const addresses = require('./getClassicAddress');

const txb = new btcjs.TransactionBuilder(btcjs.networks.testnet);

const utxo = {
    txid : 'd46b663688893b613564dbbaf61951d361b782dfb137106cb369da4cb4746a3b',
    vout_index : 1,
    value: 5000000
}

txb.enableBitcoinCash(true)
txb.setVersion(2)
var hashType = btcjs.Transaction.SIGHASH_ALL | btcjs.Transaction.SIGHASH_BITCOINCASHBIP143

txb.addInput(utxo.txid, utxo.vout_index);
txb.addOutput(addresses[1], utxo.value - 500);
txb.sign(0, keypairs[0], null, hashType, utxo.value );
console.log( txb.build().toHex() )
