pragma solidity ^0.5.0;

import './Tether.sol';
import './Reward.sol';

contract DBank {
    string public name = "Decentral Bank";
    address public owner;
    Tether public tether;
    Reward public reward;

    constructor (Reward _reward, Tether _tether) public {
        reward = _reward;
        tether = _tether;
    }
}