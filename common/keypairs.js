'use strict';
const utils = require('./utils');
const mnemonic = require('./mnemonic').mnemonic;

var keypairs = (basePath,networkParams)=> { 
    return [0,1,2].map( x => {
        let path = basePath + x;
        let p = utils.getBitCoinECPair(mnemonic, {
            network: networkParams,
            path: path
        })
        p.bip32Path = path;
        return p;
    });
}

module.exports = keypairs;