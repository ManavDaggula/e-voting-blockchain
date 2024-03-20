
import style from "./index.module.scss";

export default function ResultVoter(){

    let candidates = [{name:"John Doe", voteCount:10}, {name:"Jane Doe", voteCount:12}, {name:"John Doe", voteCount:10}, {name:"Jane Doe", voteCount:12}, {name:"John Doe", voteCount:10}, {name:"Jane Doe", voteCount:12}, {name:"John Doe", voteCount:10}, {name:"Jane Doe", voteCount:12}, {name:"John Doe", voteCount:10}, {name:"Jane Doe", voteCount:12}, {name:"John Doe", voteCount:10}, {name:"Jane Doe", voteCount:12}, {name:"John Doe", voteCount:10}, {name:"Jane Doe", voteCount:12}, ]

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
                    {candidates.map((d,index)=><tr key={d.name}>
                        <td>{d.name}</td>
                        <td>{d.voteCount}</td>
                    </tr>)}
                </tbody>
            </table>
            
        </div>
    )
}