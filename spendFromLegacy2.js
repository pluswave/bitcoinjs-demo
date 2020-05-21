'use strict'

const keypairs = require('./keypairs');
const btcjs = require('bitcoinjs-lib');
const addresses = require('./getClassicAddress');
const addressesNs = require('./getNativeSegwitAddress');

const utxo = {
    txid : 'f5cee3ba95b541a8f1e767bd321c057c5f90c80a9d77b91c1c0eeffde3dd56f1',
    txHex: '0200000001fc58434a7782d81de4ad3ad81fdcee8b10ff46a7a91fa58a4578f44baa3c4a97000000006b4830450221008526e212f518e2490677a4f93ed5e0341860bf180731583328003d31dd4e2ac3022030061d82b9211358b969a06fbe813c422b0e265816f77421fac3364fbb6b72f301210309d255ace73577b35ba02fc39c9a445979be58ed33e433890a0c78c9f014bef6ffffffff0132e6be00000000001976a914555baf94d0ba9481af330ab3f30561a79e5372e688ac00000000',
    vout_index : 0,
    value: 12510770,
}


const psbt = new btcjs.Psbt({
    network: btcjs.networks.testnet
});
console.log("new psbt:", psbt.toBase64());
psbt.addInput({
    hash: utxo.txid, 
    index: utxo.vout_index
});
console.log("add one input:", psbt.toBase64());
psbt.addOutput({
    address: addressesNs[0], 
    value: utxo.value - 5000
});
console.log("add one output:", psbt.toBase64());

psbt.updateInput(0, 
    {
    nonWitnessUtxo: Buffer.from(utxo.txHex, 'hex')
})
console.log("update one input:", psbt.toBase64());

psbt.signInput(0, keypairs[1]);
console.log("sign one input:", psbt.toBase64());
psbt.finalizeAllInputs();
console.log("finalize All input:", psbt.toBase64());
let trans = psbt.extractTransaction();
console.log("transaction:", trans.toHex());
