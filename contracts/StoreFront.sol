pragma solidity ^0.4.15;

import './Presentoken.sol';

/**
 * @title StoreFront
 * @dev Contract that deploys `Presentoken.sol`
 * Manages sale of Presentokens and owner withrdawal of ether funds
 */

contract StoreFront {
    Presentoken public presentoken;
    uint256 public tokenPrice;
	address public owner;

    modifier isOwner() {
        require(msg.sender == owner);
        _;
    }

    /* Constructor */
    function StoreFront(uint256 _initialSupply, uint256 _initialPrice) {
    	presentoken = new Presentoken(_initialSupply);
    	owner = msg.sender;
        tokenPrice = _initialPrice;
    }


    function setPrice(uint256 _price) isOwner() returns (bool success) {
    	if (_price > 0) {
    		tokenPrice = _price;
    	}
    	return false;
    }

    function purchaseCoins(uint256 _numCoins) payable {
    	if (msg.value > 0 && msg.value >= _numCoins * tokenPrice) {
    		if (presentoken.balanceOf(owner) < _numCoins) {
    			presentoken.mint(presentoken.totalSupply()); // Doubles total supply if owner out of tokens
    		} 
    		presentoken.transfer(msg.sender, _numCoins);
    	}
    }
	
    /* Allows owner to withdraw funds*/
    function withdraw() isOwner returns (bool success) {
        if (this.balance > 0) {
            owner.transfer(this.balance);
            return true;
        }
        return false;
    }

    function() payable {
        revert();
	}
}
