import firstImage from "../../assets/4687760-removebg-preview 1.png";
import styles from "./index.module.scss"
export default function Homepage(){
    return (
        <div className={styles.welcomeDiv}>
            <div className={styles.left}>
                <h1>Blockchain Voting System</h1>
                <p>Every vote matters</p>
                <button>Connect Wallet</button>
            </div>
            <div className={styles.right}>
                <img src={firstImage} alt="welcome graphic" />
            </div>
        </div>
    )
}