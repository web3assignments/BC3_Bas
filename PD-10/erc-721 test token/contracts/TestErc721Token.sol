//SPDX-License-Identifier: MIT
pragma solidity 0.7.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract TestErc721Token is ERC721 {
    
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct House {
        string postalCode;
    }

    mapping(uint256 => House) private houses;

    constructor() public ERC721("House", "HS") {}

    function addHouse(address owner, string memory postalCode)
        public
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(owner, newItemId);
        houses[newItemId] = House(postalCode);

        return newItemId;
    }
}