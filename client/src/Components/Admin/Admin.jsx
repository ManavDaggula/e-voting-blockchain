import { useEffect } from "react"
import styles from "./Admin.module.scss"
import { useNavigate } from "react-router-dom"
import { startElection, stopElection } from "../../Web3Helper/Web3Helper";
export default function Admin(props){
    const navigate = useNavigate();

    useEffect(()=>{
        if(!props.isChairperson){
            setTimeout(()=>navigate("/"),5000);
        }
    },[props.isChairperson])
    return(
        <>{props.isChairperson ? 
            <div className={styles.adminPage}>
                <div className={styles.electionControlWrapper}>
                    <button onClick={startElection}>Start Election</button>
                    <button onClick={stopElection}>End Election</button>
                </div>

                <form className={styles.candidateAdder}>
                    <p>To add a new Candidate</p>
                    <input type="text" name="addcanditate" className="addcandidate" placeholder="Enter name here"/>
                    <button>Add Candidate</button>
                </form>
            </div>
        : 
            <div>
                <h2>Restricted Area !</h2>
                <p>You don't have enough rights to access admin page. Admin page is only accessible by the chairperson of the election.<br/>You will be redirected to the homepage shortly...</p>
            </div>
        }
    </>
    )

}



