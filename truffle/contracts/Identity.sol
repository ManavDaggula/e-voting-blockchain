// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

struct VoterId{
    address addr;
    string name;
    string aadhaar;
}

contract Identity{
    mapping(address=>VoterId) voterMapper;
    mapping(address=>bool) voterBoolMapper;
    mapping(string=>bool) aadhaarBoolMapper;

    function isRegistered() public view returns(bool){
        return voterBoolMapper[msg.sender];
    }

    function register(string memory _name, string memory _aadhaar) public {
        require(!isRegistered(), "Account holder already registered.");
        require(!aadhaarBoolMapper[_aadhaar], "Aadhar holder already registered");
        voterBoolMapper[msg.sender] = true;
        aadhaarBoolMapper[_aadhaar] = true;
        voterMapper[msg.sender] = VoterId({addr:msg.sender, name:_name, aadhaar:_aadhaar});
    }

    function getId() public view returns(VoterId memory){
        require(isRegistered());
        return voterMapper[msg.sender];
    }
}