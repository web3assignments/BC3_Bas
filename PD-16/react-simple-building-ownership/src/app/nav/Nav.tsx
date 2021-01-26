import * as React from 'react';
import { INavProps } from './INavProps';
import { ActiveNavLinkType } from './ActiveNavLinkType';
import { Link } from 'react-router-dom';

export const Nav = React.memo((props: INavProps) => {

    return <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <Link className="btn navbar-brand" to="/">Simple Building Ownership</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarColor01">
                <ul className="navbar-nav mr-auto">
                    <li className={`nav-item ${props.activeNavLink === ActiveNavLinkType.AddBuilding ? 'active' : ''}`}>
                        <Link className="btn nav-link" to="/add-building">Add Building</Link>
                    </li>
                    <li className={`nav-item ${props.activeNavLink === ActiveNavLinkType.TransferOwnership ? 'active' : ''}`}>
                        <Link className="btn nav-link" to="/transfer-ownership">Transfer Ownership</Link>
                    </li>
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