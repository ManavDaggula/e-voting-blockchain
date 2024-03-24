import { useEffect, useState } from "react";
import style from "./index.module.scss";

export default function AddCandidates({
  pollContract,
  accountAddress,
  setCurrentStatus,
}) {
  const [candidates, setCandidates] = useState([]);
  const [newCandidate, setNewCandidate] = useState("");
  // const [currentStatus, setCurrentStatus] = useState("");

  async function addCandidate() {
    if (newCandidate === "") {
      window.alert("Please enter name for new candidate.");
      return;
    }
    if (!/^[A-Z ]+$/.test(newCandidate)) {
      window.alert("Please enter alphabetic name.");
      return;
    }
    await pollContract?.methods
      .addCandidate(newCandidate)
      .send({ from: accountAddress.valueOf() });
    let c = { name: newCandidate.valueOf(), voteCount: 0n };
    console.log(c);
    // let t = [...candidates];
    // t.push(c);
    // setCandidates(t);
    setCandidates([...candidates, c]);
  }

  async function startElection() {
    await pollContract?.methods
      .startElection()
      .send({ from: accountAddress.valueOf() });
    setCurrentStatus("RUNNING");
  }

  useEffect(() => {
    (async () => {
      let x = await pollContract?.methods
        .getCandidatesLength()
        .call({ from: accountAddress.valueOf() });
      // console.log(x);
      let cs = [];
      if (x) {
        for (let i = 0n; i < x.valueOf(); i++) {
          // console.log(x, i);
          let c = await pollContract?.methods
            .candidates(i)
            .call({ from: accountAddress.valueOf() });
          // console.log(c);
          if (c) {
            cs.push({ name: c.name, voteCount: c.voteCount });
          }
        }
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
      // pollContract.events["NewCandidate"]().on("connected", (id) => {
      //   console.log(id);
      // });
      // pollContract.events["NewCandidate"]().on("data", (e) => {
      //   console.log("Event:", e);
      // });
      // pollContract.events["NewCandidate"]().on("error", (err) => {
      //   console.error(err);
      // });
    })();
  }, [pollContract]);

  return (
    <div className={style.addCandidate}>
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
      <div className={style.form}>
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
    </div>
  );
}
