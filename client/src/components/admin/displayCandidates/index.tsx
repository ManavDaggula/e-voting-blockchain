import { useEffect, useState } from "react";
import Web3, { Contract, ContractAbi } from "web3";
import EventContract from "./../../../contracts/EventEmitter.json";
import style from "./index.module.scss";

interface Cands {
  name: string;
  voteCount: bigint;
}

export default function DisplayCandidates({
  pollContract,
  accountAddress,
  setCurrentStatus,
  live,
}: {
  pollContract: Contract<ContractAbi> | null;
  accountAddress: String;
  setCurrentStatus: React.Dispatch<React.SetStateAction<String>>;
  live: boolean;
}) {
  const [candidates, setCandidates] = useState<Cands[]>([]);

  async function stopElection() {
    await pollContract.methods
      .stopElection()
      .send({ from: accountAddress.valueOf() });
    setCurrentStatus("FINISHED");
  }

  useEffect(() => {
    (async () => {
      let x: bigint | undefined = await pollContract?.methods
        .getCandidatesLength()
        .call({ from: accountAddress.valueOf() });
      console.log(x);
      let cs: Cands[] = [];
      for (let i = 0n; i < x?.valueOf(); i++) {
        // console.log(x, i);
        let c: Cands = await pollContract?.methods
          .candidates(i)
          .call({ from: accountAddress.valueOf() });
        // console.log(c);
        cs.push({ name: c.name, voteCount: c.voteCount });
      }
      //   console.log(cs);
      setCandidates(cs);
      if (live) {
        pollContract?.events["Voted"]().on("data", (e) => {
          console.log(e.returnValues);
          for (let i = 0; i < cs.length; i++) {
            if (cs[i].name == e.returnValues.name) {
              cs[i].voteCount = e.returnValues.newCount;
            }
          }
          console.log(cs);
          setCandidates(cs);
        });
      }
    })();
  }, [pollContract]);

  return (
    <div className={style.displayCandidates}>
      {/* <p>Displaying candidates for running election</p> */}
      <table className={style.table}>
        <thead>
          <tr>
            <td>Sr. No.</td>
            <td>Name</td>
            <td>Votes</td>
          </tr>
        </thead>
        <tbody>
          {candidates.map((d, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{d.name}</td>
              <td>{d.voteCount.toString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {live && <button onClick={stopElection}>Stop Election</button>}
    </div>
  );
}
