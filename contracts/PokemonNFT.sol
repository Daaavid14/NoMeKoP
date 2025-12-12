// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title PokemonNFT
 * @dev ERC721 token that represents unique Pokémon as NFTs.
 * Each Pokémon has a metadata URI (e.g., IPFS link) describing attributes and stats.
 */
contract PokemonNFT is ERC721URIStorage, Ownable {
    uint256 public nextTokenId;
    mapping(uint256 => uint256) public rarityLevel; // rarity for gameplay or visuals

    event PokemonMinted(address indexed owner, uint256 indexed tokenId, string tokenURI);

    constructor() ERC721("NomekopPokemon", "NPKMN") Ownable(msg.sender) {}

    /**
     * @notice Mints a new Pokémon NFT.
     * @param to Address to receive the NFT.
     * @param tokenURI IPFS or metadata URL containing Pokémon details.
     * @param rarity Pokémon rarity level (1–5).
     */
    function mintPokemon(address to, string memory tokenURI, uint256 rarity) external onlyOwner {
        require(rarity >= 1 && rarity <= 5, "Invalid rarity range");
        uint256 tokenId = nextTokenId;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
        rarityLevel[tokenId] = rarity;
        emit PokemonMinted(to, tokenId, tokenURI);
        nextTokenId++;
    }

    /**
     * @dev Returns all token IDs owned by a specific address.
     */
    function tokensOfOwner(address owner) external view returns (uint256[] memory) {
        uint256 total = nextTokenId;
        uint256 count;
        for (uint256 i = 0; i < total; i++) {
            if (_ownerOf(i) == owner) count++;
        }

        uint256[] memory tokens = new uint256[](count);
        uint256 index;
        for (uint256 i = 0; i < total; i++) {
            if (_ownerOf(i) == owner) tokens[index++] = i;
        }
        return tokens;
    }
}
