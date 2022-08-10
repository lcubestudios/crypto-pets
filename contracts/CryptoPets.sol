//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract CryptoPets is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _petsIds;
    Counters.Counter private _petsSold;
    address payable owner;
    struct Pet {
        uint256 id;
        address payable seller;
        address payable owner;
        bool isLost;
        bool isAvailableForAdoption;
        bool isSold;
    }

    struct PetOnSale {
        uint256 id;
        uint256 price;
        address payable owner;
        address payable seller;
    }

    event PetCreated(
        uint256 indexed id,
        uint256 price,
        address seller,
        address owner,
        bool isLost,
        bool isAvailableForAdoption,
        bool isSold
    );
    mapping(uint256 => Pet) public pets;
    mapping(uint256 => PetOnSale) public petsOnMarket;

    constructor() ERC721("Crypto Pets", "PETS") {
        owner = payable(msg.sender);
    }

    // get the total number of pets
    function getTotalPets() public view returns (uint256) {
        return _petsIds.current();
    }

    // Create a new pet
    function createPet(
        string memory tokenURI,
        bool isLost,
        bool isAvailableForAdoption
    ) public payable returns (uint256) {
        _petsIds.increment();
        uint256 newPetId = _petsIds.current();
        _mint(msg.sender, newPetId);
        _setTokenURI(newPetId, tokenURI);
        pets[newPetId] = Pet(
            newPetId,
            payable(msg.sender),
            payable(msg.sender),
            isLost,
            isAvailableForAdoption,
            false
        );
        return newPetId;
    }

    function listForSale(
        uint256 petId,
        uint256 price,
        bool isLost,
        bool isAvailableForAdoption
    ) public payable {
        require(price >= 0, "Price must be greater than zero");
        require(
            !pets[petId].isAvailableForAdoption,
            "Pet is already available for adoption"
        );
        require(!pets[petId].isLost, "Pet is Marked asLost");
        // creating our market item
        petsOnMarket[petId] = PetOnSale({
            id: petId,
            price: price,
            owner: payable(msg.sender),
            seller: payable(msg.sender)
        });
        // transfering ownership of token from seller to marketplace
        _transfer(msg.sender, address(this), petId);

        emit PetCreated(
            petId,
            price,
            msg.sender,
            address(this),
            isLost,
            isAvailableForAdoption,
            false
        );
    }

    // 4. Allow someone to resell a token they have purchased
    function resellToken(uint256 petId, uint256 price) public payable {
        // require ...
        // Only the item owner can resell the item
        // Transaction value must pass the list price
        require(
            petsOnMarket[petId].owner == msg.sender,
            "Only the item owner can call this function"
        );

        // reset market item values
        petsOnMarket[petId].seller = payable(msg.sender);
        petsOnMarket[petId].owner = payable(address(this));
        petsOnMarket[petId].price = price;
        pets[petId].isSold = false;

        // decrementing the total number of items sold
        _petsSold.decrement();

        // transfering ownership of token from seller to marketplace
        _transfer(msg.sender, address(this), petId);
    }

    // 5. Create the sale of a marketplace item
    function createMarketSale(uint256 petId) public payable {
        uint256 price = petsOnMarket[petId].price;
        address seller = petsOnMarket[petId].seller;
        // require ...
        // transaction value must pass the price of the item (asking price)
        require(msg.value == price, "Submit asking price to complete purchase");
        petsOnMarket[petId].owner = payable(msg.sender);
        pets[petId].isSold = true;
        // b/c there is no seller
        petsOnMarket[petId].seller = payable(address(0));
        _petsSold.increment();
        // transfer NFT from marketplace to buyer
        _transfer(address(this), msg.sender, petId);

        // transfer $ to seller
        payable(seller).transfer(msg.value);
    }

    // Check if a pet is available for adoption
    function isAvailableForAdoption(uint256 petId) public view returns (bool) {
        return pets[petId].isAvailableForAdoption;
    }

    // Check if a pet is marked as lost

    function isLost(uint256 petId) public view returns (bool) {
        return pets[petId].isLost;
    }

    // mark a pet as lost
    function markAsLost(uint256 petId) public {
        require(!pets[petId].isLost, "Pet is already Marked as Lost");
        pets[petId].isLost = true;
    }

    // mark a pet as available for adoption
    function markAsAvailableForAdoption(uint256 petId) public {
        require(!pets[petId].isLost, "Pet is Marked as Lost");
        require(
            !pets[petId].isAvailableForAdoption,
            "Pet is already available for adoption"
        );

        pets[petId].isAvailableForAdoption = true;
    }
}
