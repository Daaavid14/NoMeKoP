// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title PokeCoin
 * @dev ERC20 token to simulate in-game currency.
 * Used for trades, rewards, and P2E features.
 */
contract PokeCoin is ERC20, Ownable {
    constructor() ERC20("PokeCoin", "PKC") Ownable(msg.sender) {
        _mint(msg.sender, 1_000_000 * 10 ** decimals()); // initial supply
    }

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) external onlyOwner {
        _burn(from, amount);
    }
}
