'use strict'

const {keypairs, addresses } = require('./getClassicAddress');
const btcjs = require('bitcoinjs-lib');
const fingerPrint = require('../common/mnemonic').masterNodeFingerPrint;

const {network} = require('./network');


const utxo = {
    txid : 'a9341ccbecf22b20c657f6b46f8cdd200b0fb166dd1d94b111b0a2439a2a0dd2',
    txHex: '02000000013318909e2c0b800d16fa3c7db3037246f8f99f60df79f7836ec8d089fdf3bfd3010000006a473044022033465a3f3889687530e656ce195af3268cc51b75e67094d04d1a04a4191c1a9702204c005e6b270e83e2bdc1a2130228cf38975d44cc702be9acda993267079f45860121026c42f6e1a56c84f2cddaa7c93e3dca981b9b6780f85f2a51b40fc1d27e2b706ffeffffff02b0fa6206000000001976a91486a4d3b8bb2e3c72be0e00ca86dbbdca8510663f88acd914725c030000001976a914d758d74f8f39c82c1037f721ce92d73c362aeb1488ac652f0500',
    vout_index : 0,
    value: 107150000,
}


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
    nonWitnessUtxo: Buffer.from(utxo.txHex, 'hex')
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
console.log("transaction:", trans.toHex());
