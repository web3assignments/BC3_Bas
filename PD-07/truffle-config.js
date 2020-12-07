const HDWalletProvider = require('@truffle/hdwallet-provider');

const fs = require('fs');
const privateKey = fs.readFileSync("../../../../../.ganache-private-key.txt")
    .toString().trim();
const infuraKey = fs.readFileSync("../../../../../.infura-key.txt")
    .toString().trim();

module.exports = {
    networks: {
        development: {
            host: "127.0.0.1",   // Localhost (default: none)
            port: 7545,          // Standard Ethereum port (default: none)
            network_id: "*",     // Any network (default: none)
        },
        ropsten: {
            provider: () => new HDWalletProvider(privateKey, `https://ropsten.infura.io/v3/${infuraKey}`),
            network_id: 3,       // Ropsten's id
            gas: 5500000,        // Ropsten has a lower block limit than mainnet. Default is 6721975.
            skipDryRun: true
        },
        rinkeby: {
            provider: () => new HDWalletProvider(privateKey, `https://rinkeby.infura.io/v3/${infuraKey}`),
            network_id: 4,       // rinkeby id
            skipDryRun: true
        },
        goerli: {
            provider: () => new HDWalletProvider(privateKey, `https://goerli.infura.io/v3/${infuraKey}`),
            network_id: 5,       // goerli's id
            gas: 300000,        // default: 6721975, // limit 8000000
            skipDryRun: true
        }
    },
    mocha: { },
    compilers: { 
        solc: {
            version: "0.7.0"
        } 
    }
}