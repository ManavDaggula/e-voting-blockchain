import { useState } from "react"
import styles from "./Voter.module.scss"
import {vote} from "./../../Web3Helper/Web3Helper"
export default function Voter(props){
    const [aadhaar, setAadhaar] = useState("");
    const [candidateIndex, setCandidateIndex] = useState(null);
    function validateInputs(){
        if(aadhaar.trim()===""){
            window.alert("Please enter your aadhaar");
            return false;
        }
        if(!aadhaar.trim().match(/[0-9]{12}/)){
            window.alert("aadhaar invalid");
            return false;
        }
        if(candidateIndex===null){
            window.alert("please select a candidate.");
            return false;
        }
        console.log(aadhaar, candidateIndex);
        return true;
    }

    async function castVote(){
        if(validateInputs()){
            let res = await vote(aadhaar, candidateIndex);
            console.log(res);
        }
    }

    return(
        <>
        {props.electionStatus ? 
        <form className={styles.voterPage}>
            <div className={styles.aadhaarContainer}>
                {/* <p>Enter your adhaar no.</p> */}
                <input type="text" className="adhaar_no." placeholder="Enter Adhaar Here" pattern="([\0\s]*[0-9][\0\s]*){12}" onChange={e=>setAadhaar(e.target.value)}/>
            </div>
            <div className={styles.candidateList}>
                <p>Candidates</p>
                <ul>
                    {props.candidates.map((candidate,index) =>
                    <li key={index}>
                        <input type="radio" name="candidateId" id="" value={index} onClick={e=>setCandidateIndex(e.target.value)}/>
                        <span>{candidate.name}</span>
                        <span>{"" + candidate.voteCount}</span>
                    </li>)}
                </ul>
            </div>
            <button className="submitadhaar" onClick={(e)=>{
                e.preventDefault();
                castVote();
            }}>Cast Your Vote</button>
        </form>
        :
        <div>
            <h2>Election is currently not running.</h2>
            <p>You can only vote when the election is running. Please come back again later when election starts.</p>
        </div>
        }

        </>
    )
}

// const candidates = [
//     { name: "Manav", voteCount: 2},
//     { name: "Dipti", voteCount: 10},
//     { name: "Bhakti", voteCount: 0},
//     { name: "Aditya", voteCount: 0},
// ]