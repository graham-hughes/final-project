pragma solidity ^0.4.15;

import './Queue.sol';
import './Presentoken.sol';

/**
 * @title StoreFront
 * @dev Contract that deploys `Presentoken.sol`
 * Manages sale of Presentokens and owner withrdawal of ether funds
 */

contract StoreFront {
    Presentoken private presentoken;
    uint256 private tokenPrice;
	address public owner;

    modifier isOwner() {
        require(msg.sender == owner);
        _;
    }

    /* Constructor */
    function StoreFront(uint256 _initialSupply, uint256 _initialPrice) {
    	presentoken = new Presentoken(_initialSupply)
    	owner = msg.sender;
    }


    function setPrice(uint256 _price) isOwner() returns (bool success) {
    	if (price > 0) {
    		tokenPrice = _price;
    	}
    	return false;
    }

    function purchaseCoins(_uint256 numCoins) {
    	if (msg.value > 0 && msg.value >= numCoins * tokenPrice) {
    		if (presentoken.balanceOf(owner) < numCoins) {
    			presentoken.mint(presentoken.totalSupply) // Doubles total supply if owner out of tokens
    		} 
    		presentoken.transfer(msg.sender, numCoins);
    	}
    }
	
    /* Allows owner to withdraw funds*/
    function withdraw() isOwner returns (bool success) {
        owner.transfer(this.balance);
        return true;
    }

    function() payable {
        revert();
	}
}
