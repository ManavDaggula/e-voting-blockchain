import { useEffect, useState } from 'react'
import "react-router-dom"
import './App.css'
import Voter from './Components/Voter/Voter'
import Admin from './Components/Admin/Admin'
import Home from './Components/Home/Home'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Ballot from "./contracts/Ballot.json"

import Web3 from 'web3';
import Navbar from './Components/Navbar/Navbar'
import { getAccount, init, getIsChairperson, getCandidates, getElectionStatus } from './Web3Helper/Web3Helper'

function App() {

  // const [account, setAccount] = useState(null);
  const [isChairperson, setIsChairperson] = useState(false);
  const [electionStatus, setElectionStatus] = useState(false);
  const [candidates, setCandidates] = useState([]);

  // async function connectWeb3(){
  //   let provider = window.ethereum;
  //   if(typeof provider === undefined){
  //     window.alert("Please install metamask to use.");
  //     return;
  //   }
  //   // window.alert("metamask found.")
  //   console.log("wallet found. (metamask)")
  //   try{
  //     let acc = await window.ethereum.request({method: "eth_requestAccounts"})
  //     console.log(`Wallet account : ${acc[0]}`)
  //     setAccount(acc[0]);

  //     const web3 = new Web3(provider || "http://127.0.0.1:7545");
  //     const netId = await web3.eth.net.getId();
  //     console.log(netId)

  //     // console.log(Ballot.networks)
  //     const ballot = new web3.eth.Contract(Ballot.abi, Ballot.networks[netId].address)
  //     // console.log(ballot)
  //     ballot.methods.isElectionRunning().call().then(setElectionStatus)
  //     const delay = s => new Promise(res => setTimeout(res, s*1000));
  //     console.log("Now trying to do stuff")
      

  //   }
  //   catch (err){
  //     window.alert("An error occurred while initialising web3 script. (see console for more details)")
  //     console.error(err);
  //   }

  //   window.ethereum.on("accountsChanged",(accounts)=>{
  //     console.log(`account changed to ${accounts[0]}`);
  //     setAccount(accounts[0]);
  //   })
      

  // }

  useEffect(()=>{
    (async () =>{
      await init(setIsChairperson);
      setIsChairperson(await getIsChairperson());
      setElectionStatus(await getElectionStatus());
      let c = await getCandidates();
      c = c.map(candidate=>{
        return {name: candidate.name, voteCount: candidate.voteCount}
      })
      setCandidates(c);
      // console.log(await getCandidates())
      // console.log(getAccount())
    })()
  },[])

  return (
    <>
    {/* <p>{electionStatus ? "Election is currently running" : "Election is currently stopped"}</p> */}
      
      <BrowserRouter>
      <Navbar electionStatus={electionStatus} isChairperson={isChairperson}/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/Admin" element={<Admin isChairperson={isChairperson}/>} />
          <Route path="/Voter" element={<Voter candidates={candidates} electionStatus={electionStatus}/>} />

        </Routes>
      
      </BrowserRouter>
    </>
  )
}

export default App
