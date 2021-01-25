import { Building } from "../DTO/Building";
import { BuildingPart } from "../DTO/BuildingPart";

export class BuildingInfo {

    public building: Building;
    public buildingParts: Array<BuildingPart>;
    public addressesValidated: Array<boolean>;

    constructor(building: Building, buildingParts: Array<BuildingPart>, addressesValidated: Array<boolean>) {
        this.building = building;
        this.buildingParts = buildingParts;
        this.addressesValidated = addressesValidated;
    }
}