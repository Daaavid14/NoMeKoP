// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Marketplace
 * @dev Simple decentralized marketplace for buying and selling Pokémon NFTs.
 * Payments can be made using PokeCoin (ERC20).
 */
contract Marketplace is Ownable {
    struct Listing {
        address seller;
        uint256 price;
    }

    IERC721 public pokemonNFT;
    IERC20 public pokeCoin;

    mapping(uint256 => Listing) public listings;
    uint256 public marketplaceFee = 5; // 5% fee
    address public feeRecipient;

    event Listed(uint256 indexed tokenId, address indexed seller, uint256 price);
    event Bought(uint256 indexed tokenId, address indexed buyer, uint256 price);
    event Delisted(uint256 indexed tokenId, address indexed seller);

    constructor(address _pokemonNFT, address _pokeCoin) Ownable(msg.sender) {
        pokemonNFT = IERC721(_pokemonNFT);
        pokeCoin = IERC20(_pokeCoin);
        feeRecipient = msg.sender;
    }

    function listPokemon(uint256 tokenId, uint256 price) external {
        require(price > 0, "Invalid price");
        require(pokemonNFT.ownerOf(tokenId) == msg.sender, "Not the owner");
        pokemonNFT.transferFrom(msg.sender, address(this), tokenId);

        listings[tokenId] = Listing({seller: msg.sender, price: price});
        emit Listed(tokenId, msg.sender, price);
    }

    function buyPokemon(uint256 tokenId) external {
        Listing memory item = listings[tokenId];
        require(item.price > 0, "Not listed");

        uint256 fee = (item.price * marketplaceFee) / 100;
        uint256 sellerAmount = item.price - fee;

        pokeCoin.transferFrom(msg.sender, item.seller, sellerAmount);
        pokeCoin.transferFrom(msg.sender, feeRecipient, fee);
        pokemonNFT.transferFrom(address(this), msg.sender, tokenId);

        delete listings[tokenId];
        emit Bought(tokenId, msg.sender, item.price);
    }

    function delistPokemon(uint256 tokenId) external {
        Listing memory item = listings[tokenId];
        require(item.seller == msg.sender, "Not the seller");

        pokemonNFT.transferFrom(address(this), msg.sender, tokenId);
        delete listings[tokenId];
        emit Delisted(tokenId, msg.sender);
    }

    function updateFee(uint256 newFee) external onlyOwner {
        require(newFee <= 20, "Fee too high");
        marketplaceFee = newFee;
    }

    function setFeeRecipient(address recipient) external onlyOwner {
        feeRecipient = recipient;
    }
}
