//SPDX-License-Identifier: UNLICENSED
pragma solidity 0.6.0;

import "github.com/provable-things/ethereum-api/provableAPI_0.6.sol";

contract SimpleBuildingOwnership is usingProvable {
  
  event NewBuilding(uint index, uint amountOfParts, address fillPartsAuthority);

  modifier onlyBuildingAuthority(uint _buildingIndex) {
    require(msg.sender == buildings[_buildingIndex].fillPartsAuthority);
    _;
  }

  modifier onlyEmptyBuildingPart(uint _buildingIndex, uint _buildingPartIndex) {
    require(buildings[_buildingIndex].buildingPartIds[_buildingPartIndex] == 0);
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
  }

  Building[] private buildings;
  uint private totalBuildingPartsCount;
  mapping(uint => BuildingPart) private buildingParts;

  function __callback(bytes32, string memory result) override public {
    if (msg.sender != provable_cbAddress()) revert();
    //do stuff
  }

  function addBuilding(string memory _name, uint _partsCount) public returns (uint) {
  	buildings.push(Building(_name, new uint[](_partsCount), msg.sender));
    emit NewBuilding(buildings.length - 1, _partsCount, msg.sender);
    return buildings.length - 1;
  }

  function fillBuildingPart(uint _buildingIndex, uint _buildingPartIndex, string memory _buildingPartStreet, string memory _buildingPartNumber, 
    string memory _buildingPartPostalCode address _buildingPartOwner) public payable 
    onlyBuildingAuthority(_buildingIndex) onlyEmptyBuildingPart(_buildingIndex, _buildingPartIndex) returns (uint) {
    
    uint memory priceOfUrl = provable_getPrice("URL");
    require (address(this).balance >= priceOfUrl,
        "please add some ETH to cover for the query fee");
    provable_query("URL", 
        "json(https://geodata.nationaalgeoregister.nl/locatieserver/v3/suggest?q="+_buildingPartStreet+"%20"+_buildingPartNumber+","+_buildingPartPostalCode+").response");

    totalBuildingPartsCount++;
    buildingParts[totalBuildingPartsCount] = BuildingPart(_buildingPartOwner, _buildingPartStreet, _buildingPartNumber, _buildingPartPostalCode);
    buildings[_buildingIndex].buildingPartIds[_buildingPartIndex] = totalBuildingPartsCount;
    if (allBuildingPartsFilled(_buildingIndex)) {
      buildings[_buildingIndex].fillPartsAuthority = address(0);
    }
    return totalBuildingPartsCount;
  }
  
  function getBuilding(uint _index) public view returns(string memory, uint[] memory, address) {
    string memory name = buildings[_index].name;
    uint[] memory buildingPartIds = buildings[_index].buildingPartIds;
    address fillPartsAuthority = buildings[_index].fillPartsAuthority;
    return (name, buildingPartIds, fillPartsAuthority);
  }

  function getBuildingPart(uint _id) public view returns(address, string memory) {
    address owner = buildingParts[_id].owner;
    string memory buildingPartAddress = buildingParts[_id].buildingPartAddress;
    return (owner, buildingPartAddress);
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

  function uint2str(uint _i) internal pure returns(string memory _uintAsString) {
    if (_i == 0) {
        return "0";
    }
    uint j = _i;
    uint len;
    while (j != 0) {
        len++;
        j /= 10;
    }
    bytes memory bstr = new bytes(len);
    uint k = len - 1;
    while (_i != 0) {
        bstr[k--] = byte(uint8(48 + _i % 10));
        _i /= 10;
    }
    return string(bstr);
  }
}