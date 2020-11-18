pragma solidity 0.7.0;

contract SimpleBuildingOwnership {

  struct Building {
    string name;
    uint[] buildingPartIds;
  }

  struct BuildingPart {
    address owner;
    string buildingPartAddress;
  }

  Building[] public buildings;
  uint totalBuildingPartsCount;
  mapping(uint => BuildingPart) buildingParts;

  function addBuilding(string memory _name, uint _partsCount) public {
  	buildings.push(Building(_name, new uint[](_partsCount)));
    for (uint i = 0; i < _partsCount; i++) {
      totalBuildingPartsCount++;
      buildings[buildings.length - 1].buildingPartIds[i] = totalBuildingPartsCount;
      buildingParts[totalBuildingPartsCount] = BuildingPart(msg.sender, string(abi.encodePacked(_name, " nr. ", uint2str(i))));
    }
  }

  function getBuilding(uint index) public view returns(string memory, uint[] memory) {
    string memory name = buildings[index].name;
    uint[] memory buildingPartIds = buildings[index].buildingPartIds;
    return (name, buildingPartIds);
  }

  function getBuildingPart(uint id) public view returns(address, string memory) {
    address owner = buildingParts[id].owner;
    string memory buildingPartAddress = buildingParts[id].buildingPartAddress;
    return (owner, buildingPartAddress);
  }

  function uint2str(uint _i) internal pure returns (string memory _uintAsString) {
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