import styles from "./Admin.module.scss"
export default function Admin(){
    return(
        <>
        <div className={styles.adminPage}>
            <div className={styles.electionControlWrapper}>
                <button>Start Election</button>
                <button>End Election</button>
            </div>

            <form className={styles.candidateAdder}>
                <p>To add a new Candidate</p>
                <input type="text" name="addcanditate" className="addcandidate" placeholder="Enter name here"/>
                <button>Add Candidate</button>
            </form>



        </div>
    </>
    )

}



