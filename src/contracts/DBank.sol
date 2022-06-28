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
        owner = msg.sender;
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

    //Issue Rewards
    function issueTokens() public {
        require(msg.sender == owner, "The caller must be the owner");
        for(uint i = 0; i < stakers.length; i++) {
            address recipient = stakers[i];
            uint balance = (stakingBalance[recipient] / 9);
            if (balance > 0) {
            reward.transfer(recipient, balance);
            }
        }
    }

    //UnStaking Tokens
    function unstakeTokens() public {
        uint balance; 
        
        balance = stakingBalance[msg.sender];

        tether.transfer(msg.sender, balance);

        stakingBalance[msg.sender] = 0;
        isStaking[msg.sender] = false;

    }
}