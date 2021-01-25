import Web3 from "web3";

export interface ITransferOwnershipProps {

    web3: Web3;
    simpleBuildingOwnershipContract: any;
    chainId: number;
    networkId: number;
    account: string;
}