// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BlackOwlToken is ERC20, Ownable {
    constructor(address initialRecipient) ERC20("Black Owl", "BO") {
        uint256 total = 18_000_000 * (10 ** decimals());
        _mint(address(this), total);
        uint256 initial = 3_000_000 * (10 ** decimals());
        _transfer(address(this), initialRecipient, initial);
        uint256 remainder = total - initial;
        _transfer(address(this), msg.sender, remainder);
    }
}
