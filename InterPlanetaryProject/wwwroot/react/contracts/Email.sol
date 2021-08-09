// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract Email {
    struct Letter {
        uint id;
        address from;
        address to;
        string theme;
        string text;
        string fileHash;
    }
    uint public letterID = 0;
    Letter[] public letters;

    function sendEmail(address _to, string memory _theme, string memory _text, string memory _fileHash) public {
        letters.push(Letter(letterID, msg.sender, _to, _theme, _text, _fileHash));
        letterID++;
    }

    function lettersToCount() public view returns(uint) {
        uint result = 0;
        for (uint i = 0; i < letters.length; i++) {
            if (letters[i].to == msg.sender) {
                result++;
            }
        }
        return result;
    }

    function getEmail() public view returns (Letter[] memory) {
        uint256 resultCount = lettersToCount();

        Letter[] memory result = new Letter[](resultCount);
        uint256 j = 0;
        for (uint i = 0; i < letters.length; i++) {
            if (letters[i].to == msg.sender) {
                result[j] = letters[i];
                j++;
            }
        }

        return result;
    }
}