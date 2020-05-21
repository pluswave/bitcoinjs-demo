'use strict'

const keypairs = require('./keypairs');
const btcjs = require('bitcoinjs-lib');
const addresses = require('./getNativeSegwitAddress');

const utxo = {
    txid : 'a9b4eb3e6118213b252882794e5fe9821979a8edfc82cc2814057e65e3c1448d',
    // txHex: '0200000000010113e2c2ffcdfb9e8cec5d3c10e948e6f3bb255183f1ca597993cad11940c672f101000000171600143d4fcebb42a14615c6a591713e8db75c8b9811b8feffffff02063d6a702700000017a91426077cfab0bfb92f3a914b520e6fea6fdf89469487990cdf000000000017a91415a5d3d8eef70c8d4437bf9f68da4e7f53fff1dc870247304402201500b2ace6e1fdf360fbdec6cfcd66bf205174830b916bc1465c6461ed66eae70220010792deb500e229d18ecf6dd415ce9ee177116b37d892a1aba8e2ca97e80c57012103c21695846b4b4a8b2dd4f772db32de88e28445bf5ac6c101de5805b9fd05ce2e9ff81500',
    vout_index : 0,
    value: 12505770,
}

const pay1 = btcjs.payments.p2wpkh({pubkey: keypairs[0].publicKey, network: btcjs.networks.testnet});


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

psbt.signInput(0, keypairs[0]);
console.log("sign one input:", psbt.toBase64());
psbt.finalizeAllInputs();
console.log("finalize All input:", psbt.toBase64());
let trans = psbt.extractTransaction();
console.log("transaction:", trans.toHex());
