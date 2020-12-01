import Web3Utils from 'web3-utils';

export const ABI: Array<Web3Utils.AbiItem> = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "_name",
                "type": "string"
            },
            {
                "name": "_partsCount",
                "type": "uint256"
            }
        ],
        "name": "addBuilding",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_id",
                "type": "uint256"
            }
        ],
        "name": "getBuildingPart",
        "outputs": [
            {
                "name": "",
                "type": "address"
            },
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_index",
                "type": "uint256"
            }
        ],
        "name": "getBuilding",
        "outputs": [
            {
                "name": "",
                "type": "string"
            },
            {
                "name": "",
                "type": "uint256[]"
            },
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_buildingIndex",
                "type": "uint256"
            },
            {
                "name": "_buildingPartIndex",
                "type": "uint256"
            },
            {
                "name": "_buildingPartAddress",
                "type": "string"
            },
            {
                "name": "_buildingPartOwner",
                "type": "address"
            }
        ],
        "name": "fillBuildingPart",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "index",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "amountOfParts",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "fillPartsAuthority",
                "type": "address"
            }
        ],
        "name": "NewBuilding",
        "type": "event"
    }
];