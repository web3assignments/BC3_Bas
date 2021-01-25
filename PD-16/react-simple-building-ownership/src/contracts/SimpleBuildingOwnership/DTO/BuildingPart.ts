export class BuildingPart {

    public owner: string;
    public streetName: string;
    public houseNumber: string;
    public postalCode: string;
    public city: string;

    constructor(owner: string, streetName: string, houseNumber: string, postalCode: string, city: string) {
        this.owner = owner;
        this.streetName = streetName;
        this.houseNumber = houseNumber;
        this.postalCode = postalCode;
        this.city = city;
    }

    public isEmpty(): boolean {
        return (this.owner.length === 0 || this.owner === '0x0000000000000000000000000000000000000000') && 
            this.streetName.length === 0 && this.houseNumber.length === 0 && 
            this.postalCode.length === 0 && this.city.length === 0;
    }

    public static fromJson(json: any): BuildingPart {
        try {
            return new BuildingPart(json[0], json[1], json[2], json[3], json[4]);
        } catch {
            return new BuildingPart('', '', '', '', '');
        }
    }
}