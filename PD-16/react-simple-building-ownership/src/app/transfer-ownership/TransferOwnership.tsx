import React from "react";
import { BuildingPart } from "../../contracts/SimpleBuildingOwnership/DTO/BuildingPart";
import { ActiveNavLinkType } from "../nav/ActiveNavLinkType";
import { Nav } from "../nav/Nav";
import { ITransferOwnershipProps } from "./ITransferOwnershipProps";
import "./TransferOwnership.scss";

export const TransferOwnership = React.memo((props: ITransferOwnershipProps) => {

    const [isLoading, setIsLoading] = React.useState(false);
    const [buildingPartId, setBuildingPartId] = React.useState(0);
    const [newOwner, setNewOwner] = React.useState('');

    const isOwner = async (id: number): Promise<boolean> => {
        let result = await props.simpleBuildingOwnershipContract.methods.getBuildingPart(id).call().catch((e: any) => { console.log(e); });
        let buildingPart = BuildingPart.fromJson(result);
        return buildingPart.owner === props.account;
    }

    const transferOwnership = async (id: number, newOwner: string) => {
        setIsLoading(true);
        if (await isOwner(id)) {
            let result = await props.simpleBuildingOwnershipContract.methods.transferBuildingPartOwnership(id, newOwner).send({ from: props.account }).catch((e: any) => { console.log(e); });
            try {
                let success = result.status;
                if (success) { 
                    alert('Successfully transferred ownership of building part with id: ' + id);
                }
            } catch {
                console.log('Something went wrong');
            }
        } else {
            alert('You can only transfer ownership of your own possessions');
        }
        setIsLoading(false);
    }

    return <>
        <Nav chainId={props.chainId} networkId={props.networkId} account={props.account} activeNavLink={ActiveNavLinkType.TransferOwnership} />
        <div className="transfer-ownership">
            <div className="display-4">Transfer ownership</div>
            <div className="transfer-ownership__inputs">
                <div className="transfer-ownership__inputs--row">
                    <input className="form-control transfer-ownership__margin-right" placeholder="Building part id"
                        type="number" min={1} onChange={e => setBuildingPartId(+e.target.value)} />
                    <input className="form-control" placeholder="New owner of building part"
                        type="text" onChange={e => setNewOwner(e.target.value)} />
                    <button onClick={() => transferOwnership(buildingPartId, newOwner)} type="button"
                        className={`btn btn-primary transfer-ownership__margin-left ${isLoading ? 'transfer-ownership__loading' : ''}`}>Send
                    </button>
                </div>
            </div>
        </div>
    </>
});