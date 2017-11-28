pragma solidity ^0.4.15;

/**
 * @title Presentoken
 * @dev Contract that implements subset of ERC20 token standard
 * Is deployed by `Crowdsale.sol`, keeps track of balances, etc.
 */

contract Presentoken {
    uint256 public totalSupply;
    address public owner;

    // Maps account addresses to balances
    mapping(address => uint256) balances;
    
    modifier isOwner() {
        require(msg.sender == owner);
        _;
    }

    // Constructor
    function Presentoken(uint256 _totalSupply, address _owner) {
        owner = _owner;
        totalSupply = _totalSupply;
        balances[owner] = _totalSupply;
    }

    /// @param _owner The address from which the balance will be retrieved
    /// @return The balance
    function balanceOf(address _owner) constant returns (uint256 balance) {
        return balances[_owner];
    }

    /// @notice send `_value` token to `_to` from `msg.sender`
    /// @param _to The address of the recipient
    /// @param _value The amount of token to be transferred
    /// @return Whether the transfer was successful or not
    function transfer(address _to, uint256 _value) returns (bool success) {
        // Check senders balance, make sure transfer is positive and doesn't cause overflow
        if (balances[msg.sender] >= _value && _value > 0 && balances[_to] + _value > balances[_to]) {
            // Remove sent value from senders account first, then apply to receivers account (prevent reentrancy)
            balances[msg.sender] -= _value;
            balances[_to] += _value;
            // Trigger transfer event
            Transfer(msg.sender, _to, _value); 
            return true;
        }
        // Return false if sender lacks adequate balance
        return false;
    }


    /// @notice burn `_value` token from `msg.sender`
    /// @param _value The amount of token to be burned
    /// @return Whether the burn was successful or not
    function burn(uint256 _value) isOwner() returns (bool success) {
        // Check senders balance, make sure burn is positive and doesn't cause underflow in balance or supply
        if (balances[msg.sender] >= _value && _value > 0 && balances[msg.sender] - _value < balances[msg.sender] && totalSupply - _value < totalSupply) {
            // Remove burned value from senders account
            balances[msg.sender] -= _value;
            // Remove burned tokens from supply
            totalSupply -= _value;
            // Trigger burn event
            Burn(msg.sender, _value); 
            return true;
        }
        // Return false if sender lacks adequate balance to burn _value
        return false;
    }

    /// @notice mint `_value` token to owner
    /// @param _value The amount of token to be minted
    /// @return Whether the mint was successful or not
    function mint(uint256 _value) isOwner() returns (bool success) {
        // Prevents minting from overflowing totalSupply
        if (totalSupply + _value > totalSupply) {
            // Adds minted value to owners account
            balances[owner] += _value;
            // Adds minted tokens to supply
            totalSupply += _value;
            return true;
        }

        return false;
    }

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Burn(address indexed _owner, uint256 _value);
}
