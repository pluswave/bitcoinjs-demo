var bip39 = require('bip39');
var bip32 = require('bip32');
var btcjs = require('bitcoinjs-lib');
var ECPair = btcjs.ECPair;

function getMasterNode(mnemonic)
{
    var masterSeed = bip39.mnemonicToSeed(mnemonic);

    var  masterNode = bip32.fromSeed(masterSeed);
    return masterNode;
}

function getBitCoinECPair(mnemonic, options)
{
    var masterNode = getMasterNode(mnemonic);
    const btcPath = `m/44'/0'/0'/0/0`;
    var  node;
    let path;
    if( options && options.path ) {
        path = options.path;
    }
    else {
        path = btcPath;
    }
    node = masterNode.derivePath(path);

    return ECPair.fromPrivateKey(node.privateKey, {
        network: ( options && options.network ) || btcjs.networks['bitcoin']
    });
}

function getMasterNodeIdentifier(mnemonic)
{
    let masterNode = getMasterNode(mnemonic);
    return masterNode.identifier;
}

function getMasterNodeFingerprint(mnemonic)
{
    let masterNode = getMasterNode(mnemonic);
    let f = masterNode.identifier.slice(0,4); // same ase fingerprint 
    return masterNode.fingerprint;
}

module.exports = {
    getBitCoinECPair,
    getMasterNodeIdentifier,
    getMasterNodeFingerprint
}