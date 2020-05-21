var bip39 = require('bip39');
var bip32 = require('bip32');
var btcjs = require('bitcoinjs-lib');
var ECPair = btcjs.ECPair;

function getBitCoinECPair(mnemonic, options)
{
    var masterSeed = bip39.mnemonicToSeed(mnemonic);

    var  masterNode = bip32.fromSeed(masterSeed);

    const btcPath = `m/44'/0'/0'/0/0`;
    var  node;
    if( options && options.path ) {
        node = masterNode.derivePath(options.path);
    }
    else {
        node = masterNode.derivePath(btcPath); 
    }

    return ECPair.fromPrivateKey(node.privateKey, {
        network: ( options && options.network ) || btcjs.networks['bitcoin']
    });
}

module.exports = {
    getBitCoinECPair: getBitCoinECPair
}