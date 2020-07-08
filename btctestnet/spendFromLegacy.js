'use strict'

const keypairs = require('./keypairs');
const btcjs = require('bitcoinjs-lib');
const fingerPrint = require('../common/mnemonic').masterNodeFingerPrint;
const addresses = require('./getClassicAddress');

const utxo = {
    txid : '974a3caa4bf478458aa51fa9a746ff108beedc1fd83aade41dd882774a4358fc',
    txHex: '02000000000101ac2659166b88b6902d81ddb46867f81cdf5b1938890562ce7b4b3a7216eea9ef0000000017160014639f742a28d8b2f645cd9c2b31c313af36a0e35ffeffffff02baf9be00000000001976a91473a5ac321d08c89dd55d1851a405714bc2bf096788ac6ebcd2842100000017a914e9c8e1339210ac158111ac996828a5002a3894288702483045022100a24d15208191a0820972b4335d85397dc566da888ac1205689bba5246f9dd44602203f42cb7995837b707c0ab7410bea3c3de2b2ed42c51c8d945ed70ee4e89517d501210356b398db9818871a3c82bfd98fba5d972e6891ec12e6b859149d69bd14dcbdb4bb051600',
    vout_index : 0,
    value: 12515770,
}

const pay1 = btcjs.payments.p2pkh({pubkey: keypairs[0].publicKey, network: btcjs.networks.testnet});


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
    address: addresses[1], 
    value: utxo.value - 5000
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
        masterFingerprint: utils.getMasterNodeFingerprint(mnemonic),
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
