import { useEffect, useState } from "react";
import Web3, { Contract, ContractAbi } from "web3";
import EventContract from "./../../../contracts/EventEmitter.json";

interface Cands {
  name: string;
  voteCount: bigint;
}

export default function DisplayCandidates({
  pollContract,
  accountAddress,
}: {
  pollContract: Contract<ContractAbi>;
  accountAddress: String;
}) {
  const [candidates, setCandidates] = useState<Cands[]>([]);

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
      let eC = getEventContract();
      eC.events["NewEvent"]({}, (error, event) => {
        if (error) {
          console.error("Error:", error);
          return;
        }

        console.log("New event received:");
        console.log(event.returnValues);
      });
    })();
  }, []);

  function getEventContract() {
    let web3 = new Web3(window.ethereum);
    return new web3.eth.Contract(
      EventContract.abi,
      "0x6e64b363532968D18C630930C4Cc690EC1469D0A"
    );
  }

  return (
    <>
      {/* <p>Displaying candidates for running election</p> */}
      <table>
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
    </>
  );
}
