// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

contract Library {
    string hash;
    
    function setHash(string memory _hash) public {
        hash = _hash;
    }
    
    function getHash() public view returns (string memory) {
        return hash;
    }
}