'use strict';
const superagent = require('superagent');
const addresses = require('./getP2shSegwitAddress');
const testnetPrefix = 'https://tchain.api.btc.com/v3/'


const url = testnetPrefix + 'address/' + addresses[0] + '/unspent';

console.log(url);

superagent.get(url)
    .then(r=>{
        console.log(JSON.stringify(r.body))     
    });
