'use strict'

const {keypairs, addresses} = require('./getNativeSegwitAddress');
const btcjs = require('bitcoinjs-lib');
const fingerPrint = require('../common/mnemonic').masterNodeFingerPrint;
const coininfo = require('coininfo');


const utxo = {
    txid : '4da9ca24ea785cb2412bff3aa24d1b75d036acf182c079e42541a337a8f8b252',
    vout_index : 0,
    value: 993000,
}

const network = coininfo.litecoin.test.toBitcoinJS();

const pay1 = btcjs.payments.p2wpkh({pubkey: keypairs[0].publicKey, network});


const psbt = new btcjs.Psbt({
    network
});
console.log("new psbt:", psbt.toBase64());
psbt.addInput({
    hash: utxo.txid, 
    index: utxo.vout_index
});
console.log("add one input:", psbt.toBase64());
psbt.addOutput({
    address: addresses[1], 
    value: utxo.value - 4000
});
console.log("add one output:", psbt.toBase64());

psbt.updateInput(0, 
    {
    witnessUtxo:{
        script: pay1.output,
        value: utxo.value
    }
})
console.log("update one input:", psbt.toBase64());

psbt.updateInput(0, {
    bip32Derivation:[{
    masterFingerprint:fingerPrint,
    pubkey: keypairs[0].publicKey,
    path: keypairs[0].bip32Path,
  }]}
  );
console.log("update one input for bip32Derivation", psbt.toBase64());


psbt.signInput(0, keypairs[0]);
console.log("sign one input:", psbt.toBase64());
psbt.finalizeAllInputs();
console.log("finalize All input:", psbt.toBase64());
let trans = psbt.extractTransaction();
console.log("transaction:", trans.toHex());
