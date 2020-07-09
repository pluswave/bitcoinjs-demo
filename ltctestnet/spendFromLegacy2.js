'use strict'

const keypairs = require('./getClassicAddress').keypairs;
const btcjs = require('bitcoinjs-lib');
const fingerPrint = require('../common/mnemonic').masterNodeFingerPrint;
const addressesNs = require('./getNativeSegwitAddress').addresses;

const coininfo = require('coininfo');

const utxo = {
    txid : 'f8b5fcdcf5c9364e15f77cba017c15e3fe3413a795ba9103229acab56a930c0e',
    txHex: '0200000001dbecae7cdc2cf27301880cadc0f4335f640973b0ad2e6595454e80ee810b93b7000000006a47304402205031ba2415c48eb9809508593023cff3add9a48d0071903ebf9fb4ba580bfe3b0220561464946b307258d82120867a21887a8085074444572512ca344764b51ce8800121023c76990d63272940ee3b3ce1742a1ec4b66f7156bdd34115c1172a99963b7c36ffffffff01703a0f00000000001976a91412de01630f9298dc61ce9981df83e6072d18acb788ac00000000',
    vout_index : 0,
    value: 998000,
}

const network = coininfo.litecoin.test.toBitcoinJS();

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
    address: addressesNs[0], 
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
