import styles from "./Voter.module.scss"
export default function Voter(){
    return(
        <>
        <form className={styles.voterPage}>
            <div className={styles.aadhaarContainer}>
                {/* <p>Enter your adhaar no.</p> */}
                <input type="text" className="adhaar_no." placeholder="Enter Adhaar Here" pattern="([\0\s]*[0-9][\0\s]*){12}"/>
            </div>
            <div className={styles.candidateList}>
                <p>Candidates</p>
                <ul>
                    {candidates.map((candidate,index) =>
                    <li key={index}>
                        <input type="radio" name="candidateId" id="" value={index}/>
                        <span>{candidate.name}</span>
                        <span>{candidate.voteCount}</span>
                    </li>)}
                </ul>
            </div>
            <button className="submitadhaar">Cast Your Vote</button>
        </form>

        </>
    )
}

const candidates = [
    { name: "Manav", voteCount: 2},
    { name: "Dipti", voteCount: 10},
    { name: "Bhakti", voteCount: 0},
    { name: "Aditya", voteCount: 0},
]