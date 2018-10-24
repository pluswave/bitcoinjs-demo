'use strict';
const superagent = require('superagent');
const addresses = require('./getClassicAddress');
const testnetPrefix = 'https://bch-tchain.api.btc.com/v3/'

// const a = 'mke69V3rRqbtZh7o46Kv1LpahwJCS7vMgb'

const url = testnetPrefix + 'address/' 
    + addresses[0]
    // + a
    + '/unspent';

console.log(url);

superagent.get(url)
    .then(r=>{
        console.log(JSON.stringify(r.body))     
    });
