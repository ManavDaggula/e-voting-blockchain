import { Web3 } from "web3";
import Ballot from "../contracts/Ballot.json";

let selectedAccount;
let provider;
let initialised = false;
let ballot;

export async function init() {
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
    });
    initialised = true;
}

export function getAccount() {
    if (!initialised) {
        init();
    }
    return selectedAccount;
}
