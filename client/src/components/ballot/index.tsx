import { useEffect, useState } from "react";
import style from "./index.module.scss";
import Web3, { Contract, ContractAbi } from "web3";
import Poll from "./../../contracts/ElectoralPoll.json";

interface userDetails {
  name: String;
  addr: String;
  aadhaar: String;
}

export default function Ballot({
  details,
  committeeContract,
}: {
  details: userDetails;
  committeeContract: Contract<ContractAbi> | null;
}) {
  const [electionCount, setElectionCount] = useState(0n);
  const [currentStatus, setCurrentStatus] = useState<String>();
  const [pollContract, setPollContract] = useState<Contract<ContractAbi>>();

  // const [comm, setComm] = useState<Contract<ContractAbi>|null>(committeeContract)

  let web3 = new Web3(window.ethereum);

  useEffect(() => {
    (async () => {
      //   console.log(details);
      // const web3 = new Web3(window.ethereum);
      let x: BigInt = await committeeContract?.methods
        .getCountOfElections()
        .call({ from: details.addr.valueOf() });
      setElectionCount(x);
      //   console.log(x);
      if (x && x !== 0n) {
        let p = await committeeContract?.methods
          .getLatestElection()
          .call({ from: details.addr.valueOf() });
        console.log(p, typeof p);
        let pCon = new web3.eth.Contract(Poll.abi, p);
        setPollContract(pCon);
        let s: BigInt = await pCon.methods
          .status()
          .call({ from: details.addr.valueOf() });
        if (s === 0n) {
          setCurrentStatus("PENDING");
        } else if (s === 1n) {
          setCurrentStatus("RUNNING");
        } else if (s === 2n) {
          setCurrentStatus("FINISHED");
        }
      }
    })();
  }, [committeeContract, details]);

  return (
    <div
      style={{
        height: "100%",
        placeSelf: "center",
        display: "grid",
        placeItems: "center",
      }}
    >
      {electionCount === 0n && (
        <div className={style.container}>
          <p>No Elections yet by the committee.</p>
        </div>
      )}
      {electionCount !== 0n && currentStatus === "PENDING" && (
        <>
          <p>New election will start soon.</p>
        </>
      )}
    </div>
  );
}
