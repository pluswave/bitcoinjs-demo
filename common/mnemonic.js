var bip39 = require('bip39');
var bip32 = require('bip32');

function getMasterNode(mnemonic)
{
    var masterSeed = bip39.mnemonicToSeed(mnemonic);

    var  masterNode = bip32.fromSeed(masterSeed);
    return masterNode;
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

const mnemonic = 'welcome minimum better adjust sell spy result erupt clock zero enlist weapon dynamic drama need acquire wrestle voyage throw firm pepper differ glare only';


module.exports = {
    mnemonic,
    masterNodeIdentifier: getMasterNodeIdentifier(mnemonic),
    masterNodeFingerPrint: getMasterNodeFingerprint(mnemonic)
};
