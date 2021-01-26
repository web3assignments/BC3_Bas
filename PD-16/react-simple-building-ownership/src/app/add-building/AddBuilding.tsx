import React from "react";
import { ActiveNavLinkType } from "../nav/ActiveNavLinkType";
import { Nav } from "../nav/Nav";
import { IAddBuildingProps } from "./IAddBuildingProps";
import "./AddBuilding.scss";
import { Building } from "../../contracts/SimpleBuildingOwnership/DTO/Building";

export const AddBuilding = React.memo((props: IAddBuildingProps) => {

    const [isLoading, setIsLoading] = React.useState(false);

    const [getBuildingResult, setGetBuildingResult] = React.useState(new Building('', [], ''));
    const [getBuildingIndexInput, setGetBuildingIndexInput] = React.useState(0);

    const [addBuildingNameInput, setAddBuildingNameInput] = React.useState('');
    const [addBuildingPartsInput, setAddBuildingPartsInput] = React.useState(0);
    
    const [fillBuildingPartBuildingIndex, setFillBuildingPartBuildingIndex] = React.useState(-1);
    const [fillBuildingPartStreetNameInput, setFillBuildingPartStreetNameInput] = React.useState('');
    const [fillBuildingPartHouseNumberInput, setFillBuildingPartHouseNumberInput] = React.useState('');
    const [fillBuildingPartPostalCodeInput, setFillBuildingPartPostalCodeInput] = React.useState('');
    const [fillBuildingPartCityInput, setFillBuildingPartCityInput] = React.useState('');
    const [fillBuildingPartBuildingPartOwnerInput, setFillBuildingPartBuildingPartOwnerInput] = React.useState('');

    const getBuilding = async (index: number) => {
        setIsLoading(true);
        let result = await props.simpleBuildingOwnershipContract.methods.getBuilding(index).call().catch((e: any) => { console.log(e); });
        let building = Building.fromJson(result);
        setGetBuildingResult(building);
        building.buildingPartIds.length > 0 ? setFillBuildingPartBuildingIndex(index) : setFillBuildingPartBuildingIndex(-1);
        setIsLoading(false);
    }

    const addBuilding = async (buildingName: string, buildingParts: number) => {
        setIsLoading(true);
        let result = await props.simpleBuildingOwnershipContract.methods.addBuilding(buildingName, buildingParts).send({ from: props.account }).catch((e: any) => { console.log(e); });
        let index = -1;
        try {
            index = result.events.NewBuilding.returnValues.index;
        } catch {
            index = -1;
        }
        if (index > -1) {
            getBuilding(index);
        }
        setIsLoading(false);
    }

    const fillBuildingPart = async (buildingIndex: number, buildingPartIndex: number, streetName: string, houseNumber: string, postalCode: string, city: string, buildingPartOwner: string) => {
        setIsLoading(true);
        await props.simpleBuildingOwnershipContract.methods.fillBuildingPart(buildingIndex, buildingPartIndex, streetName, houseNumber, postalCode, city, buildingPartOwner).send({ from: props.account, value: 50000000000000000 }).catch((e: any) => { console.log(e); });
        getBuilding(buildingIndex);
        setIsLoading(false);
    }

    const isFillAuthority = (): boolean => {
        return props.account === getBuildingResult.owner;
    }

    return <>
        <Nav chainId={props.chainId} networkId={props.networkId} account={props.account} activeNavLink={ActiveNavLinkType.AddBuilding} />
        <div className="add-building">
            <div className="display-4">Add building</div>
            <div className="add-building__inputs">
                <div className="add-building__inputs--row">
                    <input className="form-control add-building__margin-right" placeholder="Name of building"
                        type="text" onChange={e => setAddBuildingNameInput(e.target.value)} />
                    <input className="form-control" placeholder="Amount of ownable parts of building"
                        type="number" onChange={e => setAddBuildingPartsInput(+e.target.value)} min={1} />
                    <button onClick={() => addBuilding(addBuildingNameInput, addBuildingPartsInput)} type="button"
                        className={`btn btn-primary add-building__margin-left ${isLoading ? 'add-building__loading' : ''}`}>Send
                    </button>
                </div>
            </div>
            <div className="display-4">Building to fill</div>
            <div className="add-building__inputs">
                <div className="add-building__inputs--row">
                    <input className="form-control" placeholder="Search for building by index"
                        type="number" onChange={e => setGetBuildingIndexInput(+e.target.value)} min={0} />
                    <button onClick={() => getBuilding(getBuildingIndexInput)} type="button"
                        className={`btn btn-primary add-building__margin-left ${isLoading ? 'add-building__loading' : ''}`}>Send
                    </button>
                </div>
            </div>
            {
                getBuildingResult.buildingPartIds.length > 0 ? <>
                    <div className={`add-building__result ${isLoading ? 'add-building__loading' : ''}`}>         
                        <div className="add-building__row add-building__row--title">
                            <div className="add-building__column--15 add-building__margin-left">Filled parts</div>
                            <div className="add-building__column--20 add-building__margin-left">Name</div>
                            <div className="add-building__column add-building__margin-left">Fill Authority</div>
                        </div>
                        <div className="add-building__row add-building__row">
                            <div className="add-building__column--15 add-building__margin-left">{getBuildingResult.buildingPartIds.filter(s => s > 0).length + '/' + getBuildingResult.buildingPartIds.length}</div>
                            <div className="add-building__column--20 add-building__margin-left">{getBuildingResult.name}</div>
                            <div className={`add-building__column add-building__margin-left 
                                ${isFillAuthority() ? 'add-building__green' : 'add-building__red'}`}>
                                    {getBuildingResult.owner}
                            </div>
                        </div>
                        <div className="add-building__row add-building__row">
                            <div className="add-building__column"></div>
                        </div>
                        <div className="add-building__row add-building__row--title">
                            <div className="add-building__column--20 add-building__margin-left">Streetname</div>
                            <div className="add-building__column--12 add-building__margin-left">Housenumber</div>
                            <div className="add-building__column--20 add-building__margin-left">City</div>
                            <div className="add-building__column--15 add-building__margin-left">Postal Code</div>
                            <div className="add-building__column--25 add-building__margin-left">Owner</div>
                            <div className="add-building__column--8 add-building__margin-left"></div>
                        </div>
                        {
                            getBuildingResult.buildingPartIds.map((buildingPart: number, index) => {
                                return buildingPart > 0 ? <div key={index}></div> : <div key={index} className="add-building__row">
                                    <div className="add-building__column--20">
                                        <input className="form-control" placeholder="Streetname"
                                            type="text" onChange={e => setFillBuildingPartStreetNameInput(e.target.value)} />
                                    </div>
                                    <div className="add-building__column--12">
                                        <input className="form-control" placeholder="Housenumber"
                                            type="text" onChange={e => setFillBuildingPartHouseNumberInput(e.target.value)} />
                                    </div>
                                    <div className="add-building__column--20">
                                        <input className="form-control" placeholder="City"
                                            type="text" onChange={e => setFillBuildingPartCityInput(e.target.value)} />
                                    </div>
                                    <div className="add-building__column--15">
                                        <input className="form-control" placeholder="Postal code"
                                            type="text" onChange={e => setFillBuildingPartPostalCodeInput(e.target.value)} />
                                    </div>
                                    <div className="add-building__column--25">
                                        <input className="form-control" placeholder="Owner"
                                            type="text" onChange={e => setFillBuildingPartBuildingPartOwnerInput(e.target.value)} />
                                    </div>
                                    <div className="add-building__column--8">
                                        <button disabled={!isFillAuthority()} onClick={() => fillBuildingPart(fillBuildingPartBuildingIndex, index, 
                                            fillBuildingPartStreetNameInput, fillBuildingPartHouseNumberInput, 
                                            fillBuildingPartPostalCodeInput, fillBuildingPartCityInput, fillBuildingPartBuildingPartOwnerInput)} 
                                            type="button" className={`btn btn-primary add-building__button ${isLoading ? 'add-building__loading' : ''}`}>Send
                                        </button>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </> : <></>
            }
        </div>
    </>
});