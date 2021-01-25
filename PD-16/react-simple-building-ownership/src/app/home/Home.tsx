import React from "react";
import { ActiveNavLinkType } from "../nav/ActiveNavLinkType";
import { Nav } from "../nav/Nav";
import { IHomeProps } from "./IHomeProps";
import "./Home.scss";
import { Building } from "../../contracts/SimpleBuildingOwnership/DTO/Building";
import { BuildingPart } from "../../contracts/SimpleBuildingOwnership/DTO/BuildingPart";
import { BuildingInfo } from "../../contracts/SimpleBuildingOwnership/Classes/BuildingInfo";

export const Home = React.memo((props: IHomeProps) => {

    const [isLoading, setIsLoading] = React.useState(false);
    const [results, setResults] = React.useState(new BuildingInfo(new Building('', [], ''), [], []));
    const [getBuildingIndexInput, setGetBuildingIndexInput] = React.useState(0);
    const [getBuildingPartIdInput, setGetBuildingPartIdInput] = React.useState(0);

    const isAddressValidated = async (buildingPartId: number): Promise<boolean> => {
        let result = await props.simpleBuildingOwnershipContract.methods.isAddressValidated(buildingPartId).call().catch((e: any) => { console.log(e); });
        try {
            return result as boolean;
        } catch {
            return false;
        }
    }

    const getBuildingPart = async (id: number) => {
        setIsLoading(true);
        let result = await props.simpleBuildingOwnershipContract.methods.getBuildingPart(id).call().catch((e: any) => { console.log(e); });
        let buildingPart = BuildingPart.fromJson(result);
        let addressValidated = await isAddressValidated(id);
        setResults(new BuildingInfo(new Building('', [], ''), [buildingPart], [addressValidated]));
        setIsLoading(false);
    }

    const getBuilding = async (index: number) => {
        setIsLoading(true);
        let result = await props.simpleBuildingOwnershipContract.methods.getBuilding(index).call().catch((e: any) => { console.log(e); });
        let building = Building.fromJson(result);
        let buildingParts = new Array<BuildingPart>();
        let addressesValidated = new Array<boolean>();
        for (let i = 0; i < building.buildingPartIds.length; i++) {
            let result = await props.simpleBuildingOwnershipContract.methods.getBuildingPart(building.buildingPartIds[i]).call().catch((e: any) => { console.log(e); });
            buildingParts.push(BuildingPart.fromJson(result));
            let addressValidated = await isAddressValidated(building.buildingPartIds[i]);
            addressesValidated.push(addressValidated);
        }
        setResults(new BuildingInfo(building, buildingParts, addressesValidated));
        setIsLoading(false);
    }

    return <>
        <Nav chainId={props.chainId} networkId={props.networkId} account={props.account} activeNavLink={ActiveNavLinkType.Home} />
        <div className="home">
            <div className="display-4">Search building</div>
            <div className="home__inputs">
                <div className="home__inputs--row">
                    <input className="form-control" placeholder="Search for building by index"
                        type="number" onChange={e => setGetBuildingIndexInput(+e.target.value)} min={0} />
                    <button onClick={() => getBuilding(getBuildingIndexInput)} type="button"
                        className={`btn btn-primary home__button ${isLoading ? 'home__loading' : ''}`}>Send
                    </button>
                </div>
                <div className="home__inputs--row">
                    <input className="form-control" placeholder="Search for building part by id"
                        type="number" onChange={e => setGetBuildingPartIdInput(+e.target.value)} min={0} />
                    <button onClick={() => getBuildingPart(getBuildingPartIdInput)} type="button"
                        className={`btn btn-primary home__button ${isLoading ? 'home__loading' : ''}`}>Send
                    </button>
                </div>
            </div>
            {
                results.buildingParts.length > 0 && !results.buildingParts[0].isEmpty() ? <>
                    <div className="display-4">Results</div>
                    <div className={`home__result ${isLoading ? 'home__loading' : ''}`}>
                        {
                            results.building.isEmpty() ? <></> : <>
                                <div className="home__row home__row--title">
                                    <div className="home__column--5"></div>
                                    <div className="home__column--40">Name</div>
                                    <div className="home__column--55">Fill Authority</div>
                                </div>
                                <div className="home__row home__row">
                                    <div className="home__column--5"></div>
                                    <div className="home__column--40">{results.building.name}</div>
                                    <div className="home__column--55">{results.building.owner}</div>
                                </div>
                                <div className="home__row home__row">
                                    <div className="home__column"></div>
                                </div>
                            </>
                        }
                        <div className="home__row home__row--title">
                            <div className="home__column--5">{results.building.isEmpty() ? '' : 'ID'}</div>
                            <div className="home__column--40">Owner</div>
                            <div className="home__column--25">Address</div>
                            <div className="home__column--15">Postal Code</div>
                            <div className="home__column--15">Address Validated</div>
                        </div>
                        {
                            results.buildingParts.map((buildingPart: BuildingPart, index) => {
                                return <div key={index} className="home__row">
                                    <div className="home__column--5">{results.building?.buildingPartIds[index]?.toString()}</div>
                                    <div className="home__column--40">{buildingPart.owner}</div>
                                    <div className="home__column--25">{buildingPart.streetName + ' ' + buildingPart.houseNumber + ' ' + buildingPart.city}</div>
                                    <div className="home__column--15">{buildingPart.postalCode}</div>
                                    <div className="home__column--15">{results.addressesValidated[index]?.toString()}</div>
                                </div>
                            })
                        }
                    </div>
                </> : <></>
            }
        </div>
    </>
});