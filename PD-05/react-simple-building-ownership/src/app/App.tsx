import React from 'react';
import './App.scss';
import Web3 from 'web3';
import { Nav } from './nav/Nav';
import { address } from '../contracts/SimpleBuildingOwnershipGanacheLocal/Address';
import { ABI } from '../contracts/SimpleBuildingOwnershipGanacheLocal/ABI';

export const App = React.memo(() => {

  const web3 = new Web3(Web3.givenProvider);
  const simpleBuildingOwnershipContract = new web3.eth.Contract(ABI, address);
  const test = simpleBuildingOwnershipContract.methods.
  const [chainId, setChainId] = React.useState(0);
  const [networkId, setNetworkId] = React.useState(0);
  const [account, setAccount] = React.useState('');

  React.useEffect(() => {
    web3.eth.requestAccounts();
    newChain();
    newActs();
  }, []);

  const newChain = async () => {
    var chainId = await web3.eth.getChainId();
    var networkId = await web3.eth.net.getId();
    setChainId(chainId);
    setNetworkId(networkId);
  }
  
  const newActs = async () => {
    var acts = await web3.eth.getAccounts();
    setAccount(acts[0]);
  }

  return <div className="App">
    <Nav chainId={chainId} networkId={networkId} account={account} />
  </div>
});