import { useEffect, useState } from "react";
import { Contract, ContractAbi } from "web3";

interface Cands {
  name: string;
  voteCount: bigint;
}

export default function AddCandidates({
  pollContract,
  accountAddress,
  setCurrentStatus,
}: {
  pollContract: Contract<ContractAbi>;
  accountAddress: String;
  setCurrentStatus: React.Dispatch<React.SetStateAction<String>>;
}) {
  const [candidates, setCandidates] = useState<Cands[]>([]);
  const [newCandidate, setNewCandidate] = useState("");
  // const [currentStatus, setCurrentStatus] = useState("");

  async function addCandidate() {
    await pollContract.methods
      .addCandidate(newCandidate)
      .send({ from: accountAddress.valueOf() });
    let c: Cands = { name: newCandidate.valueOf(), voteCount: 0n };
    console.log(c);
    // let t = [...candidates];
    // t.push(c);
    // setCandidates(t);
    setCandidates([...candidates, c]);
  }

  async function startElection() {
    await pollContract.methods
      .startElection()
      .send({ from: accountAddress.valueOf() });
    setCurrentStatus("RUNNING");
  }

  useEffect(() => {
    (async () => {
      let x: BigInt = await pollContract.methods
        .getCandidatesLength()
        .call({ from: accountAddress.valueOf() });
      // console.log(x);
      let cs: Cands[] = [];
      for (let i = 0n; i < x.valueOf(); i++) {
        // console.log(x, i);
        let c: Cands = await pollContract.methods
          .candidates(i)
          .call({ from: accountAddress.valueOf() });
        // console.log(c);
        cs.push({ name: c.name, voteCount: c.voteCount });
      }
      console.log(cs);
      setCandidates(cs);
      // let s: BigInt = await pollContract.methods
      //   .status()
      //   .call({ from: accountAddress.valueOf() });
      // if (s === 0n) {
      //   setCurrentStatus("PENDING");
      // } else if (s === 1n) {
      //   setCurrentStatus("RUNNING");
      // } else if (s === 2n) {
      //   setCurrentStatus("FINISHED");
      // }
    })();
  }, [pollContract]);

  return (
    <>
      {candidates.length == 0 && <p>No Candidates Yet</p>}
      {candidates.length > 0 && (
        <table>
          <thead>
            <tr>
              <td>Sr. No.</td>
              <td>Name</td>
            </tr>
          </thead>
          <tbody>
            {candidates.map((d, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{d.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div>
        <input
          type="text"
          placeholder="Enter candidate name.."
          onChange={(e) => setNewCandidate(e.target.value.trim().toUpperCase())}
          value={newCandidate}
        />
        <button onClick={addCandidate}>Add Candidate</button>
      </div>
      {candidates.length > 0 && (
        <button onClick={startElection}>Start Election</button>
      )}
    </>
  );
}
