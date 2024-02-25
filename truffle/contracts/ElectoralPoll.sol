// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//enum of possible election statuses
enum Status {PENDING, RUNNING, FINISHED }

//struct of the Candidate details
struct Candidate{
    string name;
    uint voteCount;
}

contract ElectoralPoll{
    
    Status public status; // status of the election
    address immutable chairperson; // account address of chairperson that can interact

    Candidate[] public candidates; //array of the candidates for the election
    mapping(string=>bool) candidateBoolMapper; //bool mapper used to check existence of a candidate
    Candidate[] public winners;

    mapping(address=>bool) voterAddressBoolMapper; //bool mapper for checking voter account address checking
    mapping(string=>bool) voterAadhaarBoolMapper; //bool mapper for checking voter aadhaar checking

    modifier newVoterOnly(string memory _aadhaar){
        require(!voterAddressBoolMapper[msg.sender] && !voterAadhaarBoolMapper[_aadhaar], "Voter has previously voted in this election.");
        _;
    }

    modifier newCandidateOnly(string memory _name){
        require(!candidateBoolMapper[_name], "Candidate already added to the election.");
        _;
    }
    
    modifier isChairperson{
        require (msg.sender==chairperson, "Only chairperson can do that.");
        _;
    }

    modifier electionIsPending{
        require(status==Status.PENDING, "Election not in pending state.");
        _;
    }
    modifier electionIsRunning{
        require(status==Status.RUNNING, "Election not in running state.");
        _;
    }
    modifier electionIsStopped{
        require(status==Status.FINISHED, "Election not finished yet.");
        _;
    }

    function startElection() public isChairperson electionIsPending candidatesNotEmpty{
        status = Status.RUNNING;
        emit ElectionStarted();
    }

    function stopElection() public isChairperson electionIsRunning candidatesNotEmpty(){
        status = Status.FINISHED;
        uint maxVotes = 0;
        for(uint i=0; i<candidates.length; i++){
            if(candidates[i].voteCount > maxVotes){
                maxVotes = candidates[i].voteCount;
            }
        }
        for(uint i=0; i<candidates.length; i++){
            if(candidates[i].voteCount == maxVotes){
                winners.push(candidates[i]);
            }
        }
        emit ElectionEnded(winners.length);
    }

    function addCandidate(string memory _name) public isChairperson electionIsPending newCandidateOnly(_name){
        Candidate memory c = Candidate({name: _name, voteCount: 0});
        candidates.push(c);
        candidateBoolMapper[_name] = true;
    }

    modifier candidateIndexInBound(uint i){
        require(i<candidates.length && i>=0, "Candidate index invalid.");
        _;
    }

    modifier candidatesNotEmpty{
        require(candidates.length > 0, "There are no candidates.");
        _;
    }

    function delegateVote(uint _index, string memory _aadhaar) public candidateIndexInBound(_index) electionIsRunning newVoterOnly(_aadhaar){
        voterAadhaarBoolMapper[_aadhaar] = true;
        voterAddressBoolMapper[msg.sender] = true;
        Candidate memory c = candidates[_index];
        c.voteCount++;
        candidates[_index] = c;
        emit Voted(c.name, c.voteCount);
    }

    function getCandidatesLength() public view returns(uint){
        return candidates.length;
    }

    // write winner candidate array and when election stopped then populate with winners



    constructor(address _chairperson){
        chairperson = _chairperson;
        status = Status.PENDING;
    }

    event ElectionStarted();
    event ElectionEnded(uint winnerCount);
    event Voted(string name, uint newCount);
}


// write getter functions for candidate and winners..