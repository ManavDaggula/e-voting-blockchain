import { useEffect, useState } from "react";
import Registration from "../registration";
import Web3 from "web3";
import Identity from "../../contracts/Identity.json";
import Ballot from "../ballot";
import ElectoralCommittee from "../../contracts/ElectoralCommittee.json";
import Admin from "../admin";

export default function Voter({ accountAddress }) {
  const [isChairperson, setIsChairperson] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [identityContract, setIdentityContract] = useState(null);
  const [committeeContract, setCommitteeContract] = useState(null);
  const [myId, setMyId] = useState(null);

  useEffect(() => {
    (async () => {
      let web3 = new Web3(window.ethereum);
      const netId = await web3.eth.net.getId();
      // console.log(netId);
      let identity = new web3.eth.Contract(
        Identity.abi,
        Identity.networks[netId].address
      );
      setIdentityContract(identity);
      const c = await identity.methods
        .isChairperson()
        .call({ from: accountAddress.valueOf() });
      setIsChairperson(c);
      if (!c) {
        const r = await identity.methods
          .isRegistered()
          .call({ from: accountAddress.valueOf() });
        setIsRegistered(r);
        if (r) {
          const id = await identity.methods
            .getId()
            .call({ from: accountAddress.valueOf() });
          setMyId({ name: id.name, addr: id.addr, aadhaar: id.aadhaar });
        }
      }
      // let poll = new web3.eth.Contract(ElectoralPoll.abi, ElectoralPoll.networks[netId].address);
      // setPollContract(poll);

      let comm = new web3.eth.Contract(
        ElectoralCommittee.abi,
        ElectoralCommittee.networks[netId].address
      );
      setCommitteeContract(comm);
      // getPollContract = (address:String)=>new web3.eth.Contract(ElectoralPoll.abi, address);
    })();
  }, [accountAddress]);

  useEffect(() => {
    (async () => {
      if (identityContract) {
        setIsChairperson(
          await identityContract.methods
            .isChairperson()
            .call({ from: accountAddress.valueOf() })
        );
        setIsRegistered(
          await identityContract.methods
            .isRegistered()
            .call({ from: accountAddress.valueOf() })
        );
      }
    })();
  }, [accountAddress]);

  return (
    <>
      {!isChairperson && !isRegistered && (
        <Registration
          accountAddress={accountAddress}
          setRegistered={() => setIsRegistered(true)}
          identityContract={identityContract}
          setMyId={setMyId}
        />
      )}
      {!isChairperson && isRegistered && (
        <Ballot details={myId} committeeContract={committeeContract} />
      )}
      {isChairperson && (
        <Admin
          committeeContract={committeeContract}
          accountAddress={accountAddress}
        />
      )}
    </>
  );
}
