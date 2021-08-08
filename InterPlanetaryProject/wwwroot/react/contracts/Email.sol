// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract Email {
    struct Letter {
        address from;
        address to;
        string theme;
        string text;
        string fileHash;
    }

    Letter[] public letters;

    function sendEmail(address _to, string memory _theme, string memory _text, string memory _fileHash) public {
        letters.push(Letter(msg.sender, _to, _theme, _text, _fileHash));
    }

    function getEmail() public view returns (Letter[] memory) {
        // Not working
        // for (uint i = 0; i < letters.length; i++) {
        //     if (address(letters[i].from) != msg.sender) { (HOW TO COMPARE 2 ADDRESSES?)
        //         return letters[i]; it's old when I tried to return 1 letter 
        //     }
        // }
        if (letters.length > 0) {
            return letters;
        }
        Letter[] memory result = new Letter[](1);
        result[0] = Letter(msg.sender, msg.sender, "FirstTest", "FirstTest", "FileHash");
        return result;
    }
}