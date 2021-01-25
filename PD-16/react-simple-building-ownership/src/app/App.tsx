import React from 'react';
import './App.scss';
import Web3 from 'web3';
import { ContractEns } from '../contracts/SimpleBuildingOwnership/ContractEns';
import { ABI } from '../contracts/SimpleBuildingOwnership/ABI';
import { Route, Switch, Redirect, HashRouter } from "react-router-dom";
import history from '../history';
import { Home } from './home/Home';
import { AddBuilding } from './add-building/AddBuilding';
import { TransferOwnership } from './transfer-ownership/TransferOwnership';

export const App = React.memo(() => {

    const web3 = new Web3(Web3.givenProvider);
    const [simpleBuildingOwnershipContract, setSimpleBuildingOwnershipContract] = React.useState<any>();

    const [chainId, setChainId] = React.useState(0);
    const [networkId, setNetworkId] = React.useState(0);
    const [account, setAccount] = React.useState('');

    React.useEffect(() => {
        const fetchWeb3Data = async () => {
            const address = await web3.eth.ens.getAddress(ContractEns);
            setSimpleBuildingOwnershipContract(new web3.eth.Contract(ABI, address));
            await web3.eth.requestAccounts();
            await newChain();
            await newActs();
        }
        fetchWeb3Data();
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

    const getBaseProps = () => {
        return {web3, simpleBuildingOwnershipContract, chainId, networkId, account}
    }

    return <HashRouter>
        <Switch>
            <Route exact path="/" render={() => <Home {...getBaseProps()} />} />
            <Route exact path="/add-building" render={() => <AddBuilding {...getBaseProps()} />} />
            <Route exact path="/transfer-ownership" render={() => <TransferOwnership {...getBaseProps()} />} />
            <Redirect from="*" to="/" />
        </Switch>
    </HashRouter>
});