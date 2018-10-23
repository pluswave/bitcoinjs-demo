'use strict'

const bchaddr = require('bchaddrjs');
const classicAddresses = require('./getClassicAddress');

/*
classicAddresses.forEach( (a)=>{
    console.log(a, bchaddr.isTestnetAddress(a));
})*/



const addresses = classicAddresses.map( x=>{
    return bchaddr.toCashAddress(x);
})

console.log(addresses);

module.exports = addresses;

// 水龙头
// https://testnet.wormhole.cash/faucet/
