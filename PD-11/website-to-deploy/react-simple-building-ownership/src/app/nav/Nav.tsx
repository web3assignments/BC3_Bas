import * as React from 'react';
import { INavProps } from './INavProps';

export const Nav = React.memo((props: INavProps) => {

    return <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="navbar-brand">Simple Building Ownership</div>

            <div className="collapse navbar-collapse" id="navbarColor01">
                <ul className="navbar-nav mr-auto">
                </ul>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <div className="nav-link">ChainId: {props.chainId}</div>
                    </li>
                    <li className="nav-item">
                        <div className="nav-link">NetworkId: {props.networkId}</div>
                    </li>
                    <li className="nav-item">
                        <div className="nav-link">Account: {props.account}</div>
                    </li>
                </ul>
            </div>
        </nav>
    </>
});