// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ElectoralPoll.sol";

contract ElectoralCommittee{
    ElectoralPoll[] public ballot;
    address immutable chairperson;

    constructor(){
        chairperson = msg.sender;
    }

    modifier isChairperson{
        require (msg.sender==chairperson, "Only chairperson can do that.");
        _;
    }

    function addBallot() public isChairperson{
        ElectoralPoll b = new ElectoralPoll(msg.sender);
        ballot.push(b);
        emit newBallotAdded(b);
    }

    modifier NoBallotFound{
        require(ballot.length>0, "No Ballot found.");
        _;
    }

    function getLatestElection() public view NoBallotFound returns(ElectoralPoll){
        return ballot[ballot.length-1];
    }

    function getCountOfElections() public view returns(uint count){
        return ballot.length;
    }

    function amIChairperson() public view returns(bool){
        return (chairperson==msg.sender);
    }

    event newBallotAdded(ElectoralPoll b);
}