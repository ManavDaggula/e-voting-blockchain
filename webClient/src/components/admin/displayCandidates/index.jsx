import { useEffect, useState } from "react";
import style from "./index.module.scss";

export default function DisplayCandidates({
  pollContract,
  accountAddress,
  setCurrentStatus,
  live,
}) {
  const [candidates, setCandidates] = useState([]);

  async function stopElection() {
    await pollContract?.methods
      .stopElection()
      .send({ from: accountAddress.valueOf() });
    setCurrentStatus("FINISHED");
  }

  useEffect(() => {
    (async () => {
      let x = await pollContract?.methods
        .getCandidatesLength()
        .call({ from: accountAddress.valueOf() });
      console.log(x);
      let cs = [];
      if (x) {
        for (let i = 0n; i < x?.valueOf(); i++) {
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
