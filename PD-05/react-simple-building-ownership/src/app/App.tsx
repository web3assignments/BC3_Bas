import React from 'react';
import './App.scss';
import Web3 from 'web3';
import { Nav } from './nav/Nav';
import { address } from '../contracts/SimpleBuildingOwnershipGanacheLocal/Address';
import { ABI } from '../contracts/SimpleBuildingOwnershipGanacheLocal/ABI';
import { Contract } from 'web3-eth-contract';

export const App = React.memo(() => {

  const web3 = new Web3(Web3.givenProvider);
  const simpleBuildingOwnershipContract: Contract = new web3.eth.Contract(ABI, address);
  
  const [chainId, setChainId] = React.useState(0);
  const [networkId, setNetworkId] = React.useState(0);
  const [account, setAccount] = React.useState('');

  const [getBuildingIndexInput, setGetBuildingIndexInput] = React.useState(0);
  const [getBuildingResult, setGetBuildingResult] = React.useState('');

  const [getBuildingPartIdInput, setGetBuildingPartIdInput] = React.useState(0);
  const [getBuildingPartResult, setGetBuildingPartResult] = React.useState('');

  const [addBuildingNameInput, setAddBuildingNameInput] = React.useState('');
  const [addBuildingPartsInput, setAddBuildingPartsInput] = React.useState(0);
  const [addBuildingResult, setAddBuildingResult] = React.useState('');

  const [fillBuildingPartBuildingIndexInput, setFillBuildingPartBuildingIndexInput] = React.useState(0);
  const [fillBuildingPartBuildingPartIndexInput, setFillBuildingPartBuildingPartIndexInput] = React.useState(0);
  const [fillBuildingPartAddressInput, setFillBuildingPartAddressInput] = React.useState('');
  const [fillBuildingPartBuildingPartOwnerInput, setFillBuildingPartBuildingPartOwnerInput] = React.useState('');
  const [fillBuildingPartResult, setFillBuildingPartResult] = React.useState('');

  React.useEffect(() => {
    const fetchWeb3Data = async () => {
      await web3.eth.requestAccounts();
      await newChain();
      await newActs();
    }
    fetchWeb3Data();
  }, []);

  const addBuilding = async (buildingName: string, buildingParts: number) => {
    let result = await simpleBuildingOwnershipContract.methods.addBuilding(buildingName, buildingParts).send({from: account}).catch((e: any) => { console.log(e); });
    setAddBuildingResult(JSON.stringify(result));
  }

  const fillBuildingPart = async (buildingIndex: number, buildingPartIndex: number, buildingPartAddress: string, buildingPartOwner: string) => {
    let result = await simpleBuildingOwnershipContract.methods.fillBuildingPart(buildingIndex, buildingPartIndex, buildingPartAddress, buildingPartOwner).send({from: account}).catch((e: any) => { console.log(e); });
    setFillBuildingPartResult(JSON.stringify(result));
  }

  const getBuildingPart = async (id: number) => {
    let result = await simpleBuildingOwnershipContract.methods.getBuildingPart(id).call().catch((e: any) => { console.log(e); });
    setGetBuildingPartResult(JSON.stringify(result));
  }

  const getBuilding = async (index: number) => {
    let result = await simpleBuildingOwnershipContract.methods.getBuilding(index).call().catch((e: any) => { console.log(e); });
    setGetBuildingResult(JSON.stringify(result));
  }

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

  return <div className="app">
    <Nav chainId={chainId} networkId={networkId} account={account} />
    <div className="app__flex-split">
      <div className="app__flex-split--half">
        <div className="app__block">
          <div className="app__block--title display-4">getBuilding</div>
          <div className="app__flex-split">
            <input onChange={e => setGetBuildingIndexInput(+e.target.value)} type="number" placeholder="index" className="form-control app__block--input" />
            <button onClick={() => getBuilding(getBuildingIndexInput)} type="button" className="btn btn-primary app__block--button">Send</button>
          </div>
          <div className="app__block--result">{getBuildingResult}</div>
        </div>
        <div className="app__block">
          <div className="app__block--title display-4">getBuildingPart</div>
          <div className="app__flex-split">
            <input onChange={e => setGetBuildingPartIdInput(+e.target.value)} type="number" placeholder="id" className="form-control app__block--input" />
            <button onClick={() => getBuildingPart(getBuildingPartIdInput)} type="button" className="btn btn-primary app__block--button">Send</button>
          </div>
          <div className="app__block--result">{getBuildingPartResult}</div>
        </div>
      </div>
      <div className="app__flex-split--half">
        <div className="app__block">
          <div className="app__block--title display-4">addBuilding</div>
          <div className="app__flex-split">
            <input onChange={e => setAddBuildingNameInput(e.target.value)} type="text" placeholder="name" className="form-control app__block--input" />
            <input onChange={e => setAddBuildingPartsInput(+e.target.value)} type="number" placeholder="parts" className="form-control app__block--input" />
            <button onClick={() => addBuilding(addBuildingNameInput, addBuildingPartsInput)} type="button" className="btn btn-primary app__block--button">Send</button>
          </div>
          <div className="app__block--result">{addBuildingResult}</div>
        </div>
        <div className="app__block">
          <div className="app__block--title display-4">fillBuildingPart</div>
          <div className="app__flex-split">
            <input onChange={e => setFillBuildingPartBuildingIndexInput(+e.target.value)} type="number" placeholder="buildingIndex" className="form-control app__block--input" />
            <input onChange={e => setFillBuildingPartBuildingPartIndexInput(+e.target.value)} type="number" placeholder="buildingPartIndex" className="form-control app__block--input" />
            <input onChange={e => setFillBuildingPartAddressInput(e.target.value)} type="text" placeholder="buildingPartAddress" className="form-control app__block--input" />
            <input onChange={e => setFillBuildingPartBuildingPartOwnerInput(e.target.value)} type="text" placeholder="buildingPartOwner" className="form-control app__block--input" />
            <button onClick={() => fillBuildingPart(fillBuildingPartBuildingIndexInput, fillBuildingPartBuildingPartIndexInput, fillBuildingPartAddressInput, fillBuildingPartBuildingPartOwnerInput)} 
              type="button" className="btn btn-primary app__block--button">Send
            </button>
          </div>
          <div className="app__block--result">{fillBuildingPartResult}</div>
        </div>
      </div>
    </div>
  </div>
});