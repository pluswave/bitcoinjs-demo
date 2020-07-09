'use strict'

const {keypairs, addresses} = require('./getNativeSegwitAddress');
const addressP2sh = require('./getP2shSegwitAddress').addresses;
const btcjs = require('bitcoinjs-lib');
const fingerPrint = require('../common/mnemonic').masterNodeFingerPrint;
const {network} = require('./network');


const utxo = {
    txid : 'bfcb85d2318a04bc88f22777dd1be41caf8c364629c83e988cb855a4ad6320fd',
    vout_index : 0,
    value: 989000,
}

const pay1 = btcjs.payments.p2wpkh({pubkey: keypairs[1].publicKey, network});


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
    address: addressP2sh[0], 
    value: utxo.value - 500
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
    pubkey: keypairs[1].publicKey,
    path: keypairs[1].bip32Path,
  }]}
  );
console.log("update one input for bip32Derivation", psbt.toBase64());


psbt.signInput(0, keypairs[1]);
console.log("sign one input:", psbt.toBase64());
psbt.finalizeAllInputs();
console.log("finalize All input:", psbt.toBase64());
let trans = psbt.extractTransaction();
console.log("transaction:", trans.toHex());
