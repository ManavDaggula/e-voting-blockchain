import { Web3 } from "web3";
import Ballot from "../contracts/Ballot.json";

let selectedAccount;
let provider;
let initialised = false;
let ballot;

export async function init(setChairperson) {
    console.log("init called");
    provider = window.ethereum;
    if (typeof provider === undefined) {
        throw new Error("No ethereum wallet provider found.");
    }
    let accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
    });
    selectedAccount = accounts[0];
    let web3 = new Web3(provider);
    const netId = await web3.eth.net.getId();
    ballot = new web3.eth.Contract(Ballot.abi, Ballot.networks[netId].address);

    window.ethereum.on("accountsChanged", (accounts) => {
        console.log(`account changed to ${accounts[0]}`);
        selectedAccount = accounts[0];
        getIsChairperson().then(stat=>{
            console.log("Account is chairperson : "+  stat)
            setChairperson(stat);
        })
    });
    initialised = true;
}

export async function getIsChairperson(){
    if (!initialised) {
        await init();
    }
    let stat = await ballot.methods.checkIfChairperson().call({from : selectedAccount})
    return stat;
}

export async function getAccount() {
    if (!initialised) {
        init();
    }
    return selectedAccount;
}

export async function startElection() {
    if (!initialised) {
        init();
    }
    console.log(await ballot.methods.startElection().send({from: selectedAccount}))
}

export async function stopElection() {
    if (!initialised) {
        init();
    }
    console.log(await ballot.methods.stopElection().send({from: selectedAccount}))
}

export async function getCandidates() {
    if (!initialised) {
        init();
    }
    let candidatesLength = await ballot.methods.getCandidateLength().call({from: selectedAccount});
    candidatesLength = Number(candidatesLength);
    console.log(candidatesLength)
    let candidates = [];
    let candidate;
    for(let i=0; i<candidatesLength; i++){
        candidate = await ballot.methods.candidates(i).call({from: selectedAccount})
        candidates.push(candidate)
    }
    return candidates;
}

export async function getElectionStatus(){
    if (!initialised) {
        init();
    }
    let stat = await ballot.methods.isElectionRunning().call({from: selectedAccount})
    return stat;
}

export async function addCandidate(name){
    if (!initialised) {
        init();
    }
    let res = await ballot.methods.addCandidate(name).send({from: selectedAccount});
    console.log(res);
}