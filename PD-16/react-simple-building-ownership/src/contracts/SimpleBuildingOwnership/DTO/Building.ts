export class Building {

    public name: string;
    public buildingPartIds: Array<number>;
    public owner: string;

    constructor(name: string, buildingPartIds: Array<number>, owner: string) {
        this.name = name;
        this.buildingPartIds = buildingPartIds;
        this.owner = owner;
    }

    public isEmpty(): boolean {
        return this.name.length === 0 && this.buildingPartIds.length === 0 && this.owner.length === 0;
    }

    public static fromJson(json: any): Building {
        try {
            return new Building(json[0], json[1], json[2]);
        } catch {
            return new Building('', [], '');
        }
    }
}