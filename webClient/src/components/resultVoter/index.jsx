import style from "./index.module.scss";
import { useEffect, useState } from "react";

export default function ResultVoter({ pollContract, accountAddress }) {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    (async () => {
      let x = await pollContract?.methods
        .getCandidatesLength()
        .call({ from: accountAddress.valueOf() });
      console.log(x);
      let cs = [];
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
      //   console.log(cs);
      setCandidates(cs);
    })();
  }, []);

  return (
    <div className={style.resultDiv}>
      <p>Results of the latest Ballot</p>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Votes</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((d, index) => (
            <tr key={index}>
              <td>{d.name}</td>
              <td>{d.voteCount.toString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
