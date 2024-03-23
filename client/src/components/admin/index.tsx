import { useState, useEffect } from "react";
import Web3, { Contract, ContractAbi } from "web3";
import Poll from "./../../contracts/ElectoralPoll.json";
import AddCandidates from "./addCandidates";
import DisplayCandidates from "./displayCandidates";

export default function Admin({
  committeeContract,
  accountAddress,
}: {
  committeeContract: Contract<ContractAbi> | null;
  accountAddress: String;
}) {
  const [electionCount, setElectionCount] = useState(0n);
  const [currentStatus, setCurrentStatus] = useState<String>("FINISHED");
  const [pollContract, setPollContract] = useState<Contract<ContractAbi>>();
  let web3 = new Web3(window.ethereum);

  async function newElection(e) {
    let p = await committeeContract?.methods
      .addBallot()
      .send({ from: accountAddress.valueOf() });
    console.log(p);
    e.target.disabled = true;
    setCurrentStatus("PENDING");
    setElectionCount((prev) => prev + 1n);
    setPollContract(new web3.eth.Contract(Poll.abi, p));
  }

  useEffect(() => {
    (async () => {
      // const web3 = new Web3(window.ethereum);
      let x: BigInt | undefined = await committeeContract?.methods
        .getCountOfElections()
        .call({ from: accountAddress.valueOf() });
      if (x) {
        setElectionCount(x.valueOf());
      }
      // console.log(x);
      if (x && x !== 0n) {
        let p = await committeeContract?.methods
          .getLatestElection()
          .call({ from: accountAddress.valueOf() });
        // console.log(p, typeof p);
        let pCon = new web3.eth.Contract(Poll.abi, p);
        setPollContract(pCon);
        let s: BigInt = await pCon.methods
          .status()
          .call({ from: accountAddress.valueOf() });
        if (s === 0n) {
          setCurrentStatus("PENDING");
        } else if (s === 1n) {
          setCurrentStatus("RUNNING");
        } else if (s === 2n) {
          setCurrentStatus("FINISHED");
        }
      }
    })();
  }, [committeeContract]);

  return (
    <>
      {/* <p>Welcome Admin</p> */}
      {currentStatus === "FINISHED" && (
        <div
          style={{
            placeSelf: "center",
            display: "flex",
            flexDirection: "column",
            gap: "2em",
          }}
        >
          {electionCount === 0n ? (
            <p>No Elections yet by the committee.</p>
          ) : (
            <>
              <DisplayCandidates
                accountAddress={accountAddress}
                pollContract={pollContract}
                setCurrentStatus={setCurrentStatus}
                live={false}
              />
            </>
          )}
          <button onClick={newElection}>Create New Election</button>
        </div>
      )}
      {electionCount !== 0n && currentStatus === "PENDING" && (
        <>
          <AddCandidates
            pollContract={pollContract}
            accountAddress={accountAddress}
            setCurrentStatus={setCurrentStatus}
          />
        </>
      )}
      {currentStatus === "RUNNING" && (
        <>
          <DisplayCandidates
            accountAddress={accountAddress}
            pollContract={pollContract}
            setCurrentStatus={setCurrentStatus}
            live={true}
          />
        </>
      )}
    </>
  );
}
