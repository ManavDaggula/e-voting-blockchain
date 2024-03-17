import styles from "./index.module.scss"
export default function Registration(){
    return (
        <div className={styles.registerForm}>
            <div>
                <span>Address</span>
                <span>0x1234567890....</span>
                <span>Aadhaar</span>
                <span>XXXX XXXX XXXX</span>
                <span>Name</span>
                <span>John Doe</span>
                <button>Register</button>
            </div>
        </div>
    )
}