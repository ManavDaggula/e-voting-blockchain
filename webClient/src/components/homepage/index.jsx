import firstImage from "../../assets/4687760-removebg-preview 1.png";
import styles from "./index.module.scss";
export default function Homepage({ setAccountAddress }) {
  function connectWallet() {
    if (typeof window.ethereum === undefined) {
      window.alert(
        "No ethereum wallet found. Please install a wallet provider to use this system."
      );
      return;
    }
    // console.log("wallet provider found");

    window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((accounts) => {
        // console.log(accounts)
        setAccountAddress(accounts[0]);
      });

    window.ethereum.on("accountsChanged", (accounts) => {
      // console.log(accounts)
      setAccountAddress(accounts[0]);
    });
  }

  // useEffect(() => {
  //   connectWallet();
  // }, []);

  return (
    <div className={styles.welcomeDiv}>
      <div className={styles.left}>
        <h1>Blockchain Voting System</h1>
        <p>Every vote matters</p>
        <button onClick={connectWallet}>Connect Wallet</button>
      </div>
      <div className={styles.right}>
        <img src={firstImage} alt="welcome graphic" />
      </div>
    </div>
  );
}
