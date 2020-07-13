const coininfo = require('coininfo');
const network = coininfo.dash.test.toBitcoinJS();

module.exports = {
    network: network.toBitcoinJS(),
    bip44: network.versions.bip44
};