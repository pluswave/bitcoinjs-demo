'use strict'

const {keypairs, addresses } = require('./getClassicAddress');
const btcjs = require('bitcoinforksjs-lib');
const fingerPrint = require('../common/mnemonic').masterNodeFingerPrint;

const {network} = require('./network');
const Transaction = btcjs.Transaction;

const utxo = {
    txid : '3ffd44e47abb085b8b3f372c4fe17c6d68291ac65d9a642ad2d853fee98c9b1a',
    hex: '02000000014601656aee07dd3be024fc1d90fd818e93756f7a6684217bc88afe5152737379000000006a47304402207b9ce89e71eeed87093e69f296041ef4a8e0b00bf8d4198e18e5d229ed5d815d02200e7e09ee1a6e97c2d396155d1b09e41684e451ee345b47d75e83591031d52f684121033ee6aaf63904f06aaa811e568d6601867fb08438c5b5c01d01b1527e3367b782ffffffff02d05f8d48010000001976a91497a808f1d39ae863ed78500504780e2ca0c21b7288ac40420f00000000001976a91486a4d3b8bb2e3c72be0e00ca86dbbdca8510663f88ac00000000',
    vout_index : 1,
    value:1000000,
}

const pay1 = btcjs.payments.p2pkh({pubkey: keypairs[0].publicKey, network});

const psbt = new btcjs.Psbt({
    network: network
});
console.log("new psbt:", psbt.toBase64());
psbt.addInput({
    hash: utxo.txid,
    index: utxo.vout_index
});
console.log("add one input:", psbt.toBase64());
psbt.addOutput({
    address: addresses[1],
    value: utxo.value - 300
});
console.log("add one output:", psbt.toBase64());

psbt.updateInput(0,
    {
    witnessUtxo: {
        script: pay1.output,
        value: utxo.value
    },
    sighashType: Transaction.SIGHASH_ALL | Transaction.SIGHASH_BITCOINCASHBIP143
})
console.log("update one input:", psbt.toBase64());


psbt.updateInput(0, {
    bip32Derivation:[{
    masterFingerprint: fingerPrint,
    pubkey: keypairs[0].publicKey,
    path: keypairs[0].bip32Path,
  }]}
  );
console.log("update one input for bip32Derivation", psbt.toBase64());

psbt.updateOutput(0, {
    bip32Derivation:[{
        masterFingerprint: fingerPrint,
        pubkey: keypairs[1].publicKey,
        path: keypairs[1].bip32Path,
      }]}
);

console.log("update one output for bip32Derivation", psbt.toBase64());


psbt.signInput(0, keypairs[0]);
console.log("sign one input:", psbt.toBase64());
psbt.finalizeAllInputs();
console.log("finalize All input:", psbt.toBase64());
let trans = psbt.extractTransaction();
console.log("transaction:", trans.toHex(), trans.getId());
