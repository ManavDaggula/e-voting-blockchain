// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Ballot{
    address public chairperson;
    bool public isElectionRunning;

    modifier isChairperson{
        require(msg.sender==chairperson, "Only chairperson can do that.");
        _;
    }
    modifier checkRunningElection{
        require(isElectionRunning, "Election is stopped.");
        _;
    }
    modifier checkStoppedElection{
        require(!isElectionRunning, "Election is currently running.");
        _;
    }
    function startElection() public isChairperson checkStoppedElection{
        isElectionRunning = true;
    }

    function stopElection() public isChairperson checkRunningElection{
        isElectionRunning = false;
    }

    function checkIfChairperson() public view returns(bool){
        return chairperson==msg.sender;
    }
    

    // below candidate data and functions
    struct Candidate {
        string name;
        uint voteCount;
    }
    // below variables help to keep track of the voted addresses and aadhaars
    mapping (string => bool) candidateBoolMap;
    Candidate[] public candidates ;

    // checks if candidate exists already
    modifier candidateDoesNotExist(string memory _name){
        require(!candidateBoolMap[_name]);
        _;
    }

    modifier indexInCandidatesBound(uint _index){
        require(_index < candidates.length);
        _;
    }
    modifier candidatesNotEmpty{
        require(candidates.length > 0);
        _;
    }

    // adds candidate to the list and map
    function addCandidate(string memory _name) public candidateDoesNotExist(_name) isChairperson{
        Candidate memory c = Candidate({name: _name, voteCount: 0});
        candidates.push(c);
        candidateBoolMap[_name] = true;
    }

    //function to get candidates array length i.e. number of candidates
    function getCandidateLength() public view returns(uint){
        return candidates.length;
    }

    // function increaseVote(uint _index) public indexInCandidatesBound(_index){
    //     Candidate storage c = candidates[_index];
    //     c.voteCount++;
    //     candidates[_index] = c;
    // }

    function getWinner() public candidatesNotEmpty checkStoppedElection view returns (Candidate memory) {
        uint maxCount = candidates[0].voteCount;
        uint maxIndex = 0;
        for (uint256 i = 1; i < candidates.length; i++) {
            if(maxCount < candidates[i].voteCount){
                maxCount = candidates[i].voteCount;
                maxIndex = i;
            }
        }
        return candidates[maxIndex];
   }

    // below  voter data and functions
    // below maps help to keep track of the voted addresses and aadhaars
    mapping (string => bool) voterAadharBoolMap;
    mapping (address => bool) voterAddressBoolMap;

    // below modifier checks that the voter has not already voted
    modifier notVoted(string memory _aadhaar){
        require(!voterAddressBoolMap[msg.sender] && !voterAadharBoolMap[_aadhaar], "Voter has already voted.");
        _;
    }

    // function addVoter(string memory _aadhaar) public notVoted(_aadhaar){
    //     voterAadharBoolMap[_aadhaar] = true;
    //     voterAddressBoolMap[msg.sender] = true;
    // }

    function registerVote(string memory _aadhaar, uint _index) public notVoted(_aadhaar) indexInCandidatesBound(_index) checkRunningElection{
        voterAadharBoolMap[_aadhaar] = true;
        voterAddressBoolMap[msg.sender] = true;
        Candidate storage c = candidates[_index];
        c.voteCount++;
        candidates[_index] = c;
    }

    constructor(){
        chairperson = msg.sender;
    }
    
}