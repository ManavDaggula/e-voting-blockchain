import { useEffect, useState } from "react";
import style from "./index.module.scss";
import Web3 from "web3";
import Poll from "../../contracts/ElectoralPoll.json";
import ResultVoter from "../resultVoter";
import CastVote from "../castVote";
import Waiting from "../waiting";

export default function Ballot({ details, committeeContract }) {
  const [electionCount, setElectionCount] = useState(0n);
  const [currentStatus, setCurrentStatus] = useState("");
  const [pollContract, setPollContract] = useState();

  // const [comm, setComm] = useState<Contract<ContractAbi>|null>(committeeContract)

  let web3 = new Web3(window.ethereum);

  useEffect(() => {
    (async () => {
      committeeContract?.events.newBallotAdded().on("data", (e) => {
        console.log(e.returnValues);
        let pCon = new web3.eth.Contract(Poll.abi, e.returnValues.b);
        setPollContract(pCon);
        setElectionCount((prev) => prev + 1n);
        setCurrentStatus("PENDING");
        pCon.events.ElectionStarted().on("data", (e) => {
          setCurrentStatus("RUNNING");
        });
        pCon.events.ElectionEnded().on("data", (e) => {
          setCurrentStatus("FINISHED");
        });
      });
      //   console.log(details);
      // const web3 = new Web3(window.ethereum);
      let x = await committeeContract?.methods
        .getCountOfElections()
        .call({ from: details.addr.valueOf() });
      if (x) {
        setElectionCount(x.valueOf());
      }
      console.log(x);
      if (x && x !== 0n) {
        let p = await committeeContract?.methods
          .getLatestElection()
          .call({ from: details.addr.valueOf() });
        // console.log(p, typeof p);
        let pCon = new web3.eth.Contract(Poll.abi, p);
        setPollContract(pCon);
        let s = await pCon.methods
          .status()
          .call({ from: details.addr.valueOf() });
        if (s === 0n) {
          setCurrentStatus("PENDING");
          pCon.events.ElectionStarted().on("data", (e) => {
            setCurrentStatus("RUNNING");
          });
          pCon.events.ElectionEnded().on("data", (e) => {
            setCurrentStatus("FINISHED");
          });
        } else if (s === 1n) {
          setCurrentStatus("RUNNING");
          pCon.events.ElectionEnded().on("data", (e) => {
            setCurrentStatus("FINISHED");
          });
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
      {electionCount !== 0n && currentStatus === "FINISHED" && (
        <ResultVoter
          pollContract={pollContract}
          accountAddress={details.addr}
        />
      )}
      {currentStatus === "PENDING" && (
        <>
          <Waiting msg={"New Election will start soon."} />
        </>
      )}
      {currentStatus === "RUNNING" && (
        <>
          <CastVote
            pollContract={pollContract}
            accountAddress={details.addr}
            aadhaar={details.aadhaar}
          />
        </>
      )}
    </div>
  );
}
