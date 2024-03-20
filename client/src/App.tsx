import { useState } from 'react'
import './App.css'
import Homepage from './components/homepage'
import Voter from './components/voter';
import Registration from './components/registration';
import Waiting from './components/waiting';
import CastVote from './components/castVote';
import ResultVoter from './components/resultVoter';

function App() {
  const [accountAddress, setAccountAddress] = useState<null|String>(null);



  return (
    (!accountAddress ? <Homepage setAccountAddress={(address:String|null)=>setAccountAddress(address)}/> : <Voter accountAddress={accountAddress}/>)
    // <CastVote />
  )
}

export default App
