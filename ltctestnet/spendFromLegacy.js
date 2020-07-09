'use strict'

const {keypairs, addresses } = require('./getClassicAddress');
const btcjs = require('bitcoinjs-lib');
const fingerPrint = require('../common/mnemonic').masterNodeFingerPrint;

const coininfo = require('coininfo');


const utxo = {
    txid : 'b7930b81ee804e4595652eadb07309645f33f4c0ad0c880173f22cdc7caeecdb',
    txHex: '01000000000101bd3800347443ad21832cada9e8cb0a3f98899e2fb7be25f3125d6528470cf2e10100000000f0ffffff0340420f00000000001976a91486a4d3b8bb2e3c72be0e00ca86dbbdca8510663f88acec705b000000000016001480de3f539c44abff88d5ef6b875765c533bff30f0000000000000000196a1768747470733a2f2f746c74632e6269746170732e636f6d02473044022078819b7f85f0fe1d53c10a78fe94c4fc49a164667ab4fd9059adcb35294c752102200cfb64d7bff51cac95d55d87b792a6c14e19bcecf25480ab0aee5cddde7698e7012102a77add0761087898d56cdff8f64bfc205667321e2446a2451ca1d6dae800e67e00000000',
    vout_index : 0,
    value: 1000000,
}

const network = coininfo.litecoin.test.toBitcoinJS();

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
    value: utxo.value - 2000
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
