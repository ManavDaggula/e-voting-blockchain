// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EventEmitter {
    function emitEvent(string memory t) public {
        emit NewEvent(t);
    }
    event NewEvent(string);
}
