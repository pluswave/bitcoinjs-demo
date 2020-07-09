const coininfo = require('coininfo');
const network = coininfo.litecoin.test.toBitcoinJS();

module.exports = {
    network: network.toBitcoinJS(),
    bip44: network.versions.bip44
};