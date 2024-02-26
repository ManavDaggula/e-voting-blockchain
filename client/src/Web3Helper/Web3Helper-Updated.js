import { Web3 } from "web3";
import ElectoralCommittee from "./../contracts/ElectoralCommittee.json"
import ElectoralPoll from "./../contracts/ElectoralPoll.json"

let provider;
let selectedAccount;
let electoralCommittee;
let electoralPoll;
let initialised=false;

export async function init(setAdmin){
    provider = window.ethereum;
    if(typeof provider === undefined){
        throw new Error("No ethereum wallet provider found.");
    }
    selectedAccount = accounts[0];
    let web3 = new Web3(provider);
    const netId = await web3.eth.net.getId();
    electoralCommittee = new web3.eth.Contract(ElectoralCommittee.abi, ElectoralCommittee.networks[netId].address)
    electoralPoll = new web3.eth.Contract(ElectoralPoll.abi, ElectoralPoll.networks[netId].address)

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

/**
 * 
 * @param {String} name 
 */
export async function addCandidate(name){
    if (!initialised) {
        await init();
    }

}