pragma solidity ^0.5.0;

import './Tether.sol';
import './Reward.sol';

contract DBank {
    string public name = "Decentral Bank";
    address public owner;
    Tether public tether;
    Reward public reward;

    address[] public stakers;

    mapping (address => uint256) public stakingBalance;
    mapping (address => bool) public hasStaked;
    mapping (address => bool) public isStaking;

    constructor (Reward _reward, Tether _tether) public {
        reward = _reward;
        tether = _tether;
    }

    function depositTokens (uint _amount) public {
        require (_amount > 0, "amount must be greater than 0");
        // Transfer tokens to contrack address for staking
        tether.transferFrom(msg.sender, address(this), _amount); 
        
        // Update staking balance
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        if(!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }
        // Update staking balance
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }
}