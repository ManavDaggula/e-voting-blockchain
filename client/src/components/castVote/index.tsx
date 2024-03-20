
import { useState } from "react";
import style from "./index.module.scss";

export default function CastVote(){

    let candidates = ["John Doe", "Jane Doe", "John Doe", "Jane Doe", "John Doe", "Jane Doe", "John Doe", "Jane Doe",];
    const [candidateIndex, setCandidateIndex] = useState<null|Number>(null)

    function sendVote(){
        if(candidateIndex!==null){
            console.log(`sending vote to ${candidateIndex} : ${candidates[candidateIndex.valueOf()]}`)
        }
        else{
            window.alert("Select a candidate to register vote.");
        }
    }

    return(
        <div className={style.voteDiv}>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Sr. No.</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {candidates.map((d,index)=><tr key={d}>
                        <td><input type="radio" name="candidate" onClick={()=>setCandidateIndex(index)}/></td>
                        <td>{index+1}</td>
                        <td>{d}</td>
                    </tr>)}
                </tbody>
            </table>
            <button onClick={sendVote} disabled={candidateIndex===null}>Cast your vote</button>
        </div>
    )
}