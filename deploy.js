const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');

const provider = new HDWalletProvider(
    'desk blossom turn dizzy fashion orient coyote detect ordinary tide betray office',
    'https://rinkeby.infura.io/hQ9nGxJkSvCOn3N5Y28D'
);
const web3 = new Web3(provider);

