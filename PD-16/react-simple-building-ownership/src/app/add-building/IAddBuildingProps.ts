import Web3 from "web3";

export interface IAddBuildingProps {

    web3: Web3;
    simpleBuildingOwnershipContract: any;
    chainId: number;
    networkId: number;
    account: string;
}