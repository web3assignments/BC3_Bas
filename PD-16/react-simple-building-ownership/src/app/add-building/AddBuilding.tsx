import React from "react";
import { ActiveNavLinkType } from "../nav/ActiveNavLinkType";
import { Nav } from "../nav/Nav";
import { IAddBuildingProps } from "./IAddBuildingProps";

export const AddBuilding = React.memo((props: IAddBuildingProps) => {

    const [addBuildingNameInput, setAddBuildingNameInput] = React.useState('');
    const [addBuildingPartsInput, setAddBuildingPartsInput] = React.useState(0);
    const [addBuildingResult, setAddBuildingResult] = React.useState('');

    const [fillBuildingPartBuildingIndexInput, setFillBuildingPartBuildingIndexInput] = React.useState(0);
    const [fillBuildingPartBuildingPartIndexInput, setFillBuildingPartBuildingPartIndexInput] = React.useState(0);
    const [fillBuildingPartStreetNameInput, setFillBuildingPartStreetNameInput] = React.useState('');
    const [fillBuildingPartHouseNumberInput, setFillBuildingPartHouseNumberInput] = React.useState('');
    const [fillBuildingPartPostalCodeInput, setFillBuildingPartPostalCodeInput] = React.useState('');
    const [fillBuildingPartCityInput, setFillBuildingPartCityInput] = React.useState('');
    const [fillBuildingPartBuildingPartOwnerInput, setFillBuildingPartBuildingPartOwnerInput] = React.useState('');
    const [fillBuildingPartResult, setFillBuildingPartResult] = React.useState('');

    const addBuilding = async (buildingName: string, buildingParts: number) => {
        let result = await props.simpleBuildingOwnershipContract.methods.addBuilding(buildingName, buildingParts).send({ from: props.account }).catch((e: any) => { console.log(e); });
        setAddBuildingResult(JSON.stringify(result));
    }

    const fillBuildingPart = async (buildingIndex: number, buildingPartIndex: number, streetName: string, houseNumber: string, postalCode: string, city: string, buildingPartOwner: string) => {
        let result = await props.simpleBuildingOwnershipContract.methods.fillBuildingPart(buildingIndex, buildingPartIndex, streetName, houseNumber, postalCode, city, buildingPartOwner).send({ from: props.account, value: 50000000000000000 }).catch((e: any) => { console.log(e); });
        setFillBuildingPartResult(JSON.stringify(result));
    }

    return <>
        <Nav chainId={props.chainId} networkId={props.networkId} account={props.account} activeNavLink={ActiveNavLinkType.AddBuilding} />
        <div className="add-building">

        </div>
    </>
});