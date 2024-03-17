import { useState } from 'react'
import './App.css'
import Homepage from './components/homepage'
import Voter from './components/voter';

function App() {
  const [walletConnected, setWalletConnected] = useState(false);



  return (
    (!walletConnected ? <Homepage/> : <Voter/>)
  )
}

export default App
