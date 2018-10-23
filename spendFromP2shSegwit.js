'use strict'

const keypairs = require('./keypairs');
const btcjs = require('bitcoinjs-lib');
const addresses = require('./getP2shSegwitAddress');

const txb = new btcjs.TransactionBuilder(btcjs.networks.testnet);

const pay1 = btcjs.payments.p2wpkh({pubkey: keypairs[0].publicKey, network: btcjs.networks.testnet});

const utxo = {
    txid : '9f23f3f5af19109aa5db191f4c2c393e188e7c9296292bf2f16fe3192f31d0da',
    vout_index : 1,
    value: 14617753
}

txb.addInput(utxo.txid, utxo.vout_index);
txb.addOutput(addresses[1], utxo.value - 5000);
txb.sign(0, keypairs[0], pay1.output, null, utxo.value );
console.log( txb.build().toHex() )
