import React from "react";
import { ActiveNavLinkType } from "../nav/ActiveNavLinkType";
import { Nav } from "../nav/Nav";
import { ITransferOwnershipProps } from "./ITransferOwnershipProps";

export const TransferOwnership = React.memo((props: ITransferOwnershipProps) => {

    return <>
        <Nav chainId={props.chainId} networkId={props.networkId} account={props.account} activeNavLink={ActiveNavLinkType.TransferOwnership} />
    </>
});