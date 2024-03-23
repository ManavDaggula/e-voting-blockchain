import { useState, useEffect } from "react";
import style from "./index.module.scss";
import Waiting from "../waiting";

interface Cands {
  name: string;
  voteCount: bigint;
}

export default function CastVote({
  pollContract,
  accountAddress,
  aadhaar,
}: {
  pollContract: Contract<ContractAbi>;
  accountAddress: String;
  aadhaar: String;
}) {
  // let candidates = ["John Doe", "Jane Doe", "John Doe", "Jane Doe", "John Doe", "Jane Doe", "John Doe", "Jane Doe",];
  const [candidates, setCandidates] = useState<Cands[]>([]);
  const [candidateIndex, setCandidateIndex] = useState<null | BigInt>(null);
  const [previouslyVoted, setPreviouslyVoted] = useState<Boolean>(false);

  async function sendVote() {
    if (candidateIndex !== null) {
      console.log(
        `sending vote to ${candidateIndex} : `,
        candidates[candidateIndex.valueOf()]
      );
      await pollContract.methods
        .delegateVote(candidateIndex.valueOf(), aadhaar.valueOf())
        .send({ from: accountAddress.valueOf() });
      setPreviouslyVoted(true);
    } else {
      window.alert("Select a candidate to register vote.");
    }
  }
  useEffect(() => {
    (async () => {
      let x: bigint = await pollContract.methods
        .getCandidatesLength()
        .call({ from: accountAddress.valueOf() });
      console.log(x);
      let cs: Cands[] = [];
      for (let i = 0n; i < x.valueOf(); i++) {
        // console.log(x, i);
        let c: Cands = await pollContract.methods
          .candidates(i)
          .call({ from: accountAddress.valueOf() });
        // console.log(c);
        cs.push({ name: c.name, voteCount: c.voteCount });
      }
      //   console.log(cs);
      setCandidates(cs);
      setPreviouslyVoted(
        await pollContract.methods
          .isVoted()
          .call({ from: accountAddress.valueOf() })
      );
    })();
  }, []);

  return (
    <div className={style.voteDiv}>
      {!previouslyVoted && (
        <>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Sr. No.</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((d, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="radio"
                      name="candidate"
                      onClick={() => setCandidateIndex(BigInt(index))}
                    />
                  </td>
                  <td>{index + 1}</td>
                  <td>{d.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={sendVote} disabled={candidateIndex === null}>
            Cast your vote
          </button>
        </>
      )}
      {previouslyVoted && (
        <Waiting
          msg={"You have already voted. Please wait for the ballot to end."}
        />
      )}
    </div>
  );
}
