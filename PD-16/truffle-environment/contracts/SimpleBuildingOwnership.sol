//SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

import "./provableAPI.sol";
import "solidity-util/lib/Strings.sol";
import "solidity-util/lib/Integers.sol";
import "solidity-util/lib/Addresses.sol";

/// @title A simple registration contract for ownership of a building part
/// @author Bas Bastiaansen
/// @notice This contract is made under education circumstances and is not meant for real-world use
contract SimpleBuildingOwnership is usingProvable {

    using Strings for string;
    using Integers for uint;
    using Addresses for address;
    using Addresses for address payable;
  
    event NewBuilding(uint index, uint amountOfParts, address fillPartsAuthority);

    modifier onlyBuildingAuthority(uint _buildingIndex) {
        require(msg.sender == buildings[_buildingIndex].fillPartsAuthority);
        _;
    }

    modifier onlyEmptyBuildingPart(uint _buildingIndex, uint _buildingPartIndex) {
        require(buildings[_buildingIndex].buildingPartIds[_buildingPartIndex] == 0);
        _;
    }

    modifier onlyBuildingPartOwner(uint _buildingPartId) {
        require(msg.sender == buildingParts[_buildingPartId].owner);
        _;
    }

    modifier onlyDestructAuthority() {
        require(msg.sender == destructAuthority);
        _;
    }

    struct Building {
        string name;
        uint[] buildingPartIds;
        address fillPartsAuthority;
    }

    struct BuildingPart {
        address owner;
        string streetName;
        string houseNumber;
        string postalCode;
        string city;
    }

    address payable private destructAuthority;    
    Building[] private buildings;
    uint private totalBuildingPartsCount;
    mapping(uint => BuildingPart) private buildingParts;
    mapping(string => string) private validatedAddresses;

    constructor() public {
        destructAuthority = msg.sender;
    }

    function __callback(bytes32, string memory result) public {
        if (msg.sender != provable_cbAddress()) revert();

        if (bytes(result).length > 0) {
            validatedAddresses[result] = result;
        }
    }

    function isAddressValidated(uint _buildingPartId) public view returns (bool) {

        BuildingPart memory buildingPart = buildingParts[_buildingPartId];
        string memory addressString = "";
        addressString = addressString.concat(buildingPart.streetName).concat(" ").concat(buildingPart.houseNumber).concat(", ").concat(buildingPart.postalCode).concat(" ").concat(buildingPart.city);
        string memory validatedAddress = validatedAddresses[addressString];
        
        if (addressString.compareToIgnoreCase(validatedAddress)) {
            return true;
        } else {
            return false;
        }
    }

    function addBuilding(string memory _name, uint _partsCount) public returns (uint) {
        buildings.push(Building(_name, new uint[](_partsCount), msg.sender));
        emit NewBuilding(buildings.length - 1, _partsCount, msg.sender);
        return buildings.length - 1;
    }

    function getGeoRegisterUrl(string memory _buildingPartStreet, string memory _buildingPartNumber, 
        string memory _buildingPartPostalCode) private pure returns (string memory) {

        string memory apiUrl = "";
        apiUrl = apiUrl.concat("json(https://geodata.nationaalgeoregister.nl/locatieserver/v3/suggest?q=").concat(_buildingPartStreet).concat("%20").concat(_buildingPartNumber).concat(",").concat(_buildingPartPostalCode).concat(").response.docs[0].weergavenaam");
        return apiUrl;
    }

    function fillBuildingPart(uint _buildingIndex, uint _buildingPartIndex, string memory _buildingPartStreet, string memory _buildingPartNumber, 
        string memory _buildingPartPostalCode, string memory _buildingPartCity, address _buildingPartOwner) public payable 
        onlyBuildingAuthority(_buildingIndex) onlyEmptyBuildingPart(_buildingIndex, _buildingPartIndex) returns (uint) {
        
        require (address(this).balance >= provable_getPrice("URL"),
            "please add some ETH to cover for the query fee");
        provable_query("URL", getGeoRegisterUrl(_buildingPartStreet, _buildingPartNumber, _buildingPartPostalCode));

        totalBuildingPartsCount++;
        buildingParts[totalBuildingPartsCount] = BuildingPart(_buildingPartOwner, _buildingPartStreet, _buildingPartNumber, _buildingPartPostalCode, _buildingPartCity);
        buildings[_buildingIndex].buildingPartIds[_buildingPartIndex] = totalBuildingPartsCount;
        if (allBuildingPartsFilled(_buildingIndex)) {
            buildings[_buildingIndex].fillPartsAuthority = address(0);
        }
        return totalBuildingPartsCount;
    }

    function transferBuildingPartOwnership(uint _buildingPartId, address _newOwner) public onlyBuildingPartOwner(_buildingPartId) {
        buildingParts[_buildingPartId].owner = _newOwner;
    }
  
    function getBuilding(uint _index) public view returns(string memory, uint[] memory, address) {
        string memory name = buildings[_index].name;
        uint[] memory buildingPartIds = buildings[_index].buildingPartIds;
        address fillPartsAuthority = buildings[_index].fillPartsAuthority;
        return (name, buildingPartIds, fillPartsAuthority);
    }

    function getBuildingPart(uint _id) public view returns(address, string memory, string memory, string memory, string memory) {
        address owner = buildingParts[_id].owner;
        string memory streetName = buildingParts[_id].streetName;
        string memory houseNumber = buildingParts[_id].houseNumber;
        string memory postalCode = buildingParts[_id].postalCode;
        string memory city = buildingParts[_id].city;
        return (owner, streetName, houseNumber, postalCode, city);
    }

    function allBuildingPartsFilled(uint _buildingIndex) private view returns(bool) {
        uint[] memory buildingPartIds = buildings[_buildingIndex].buildingPartIds;
        uint amountOfBuildingPartsFilled = 0;
        for(uint i = 0; i < buildingPartIds.length; i++) {
            if (buildingPartIds[i] > 0) {
                amountOfBuildingPartsFilled++;
            }
        }
        return amountOfBuildingPartsFilled == buildingPartIds.length ? true : false;
    }

    function destruct() external onlyDestructAuthority {
        selfdestruct(destructAuthority);
    }
}