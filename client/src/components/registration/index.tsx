import { useState } from "react";
import styles from "./index.module.scss";
import { Contract, ContractAbi } from "web3";
export default function Registration({
  accountAddress,
  setRegistered,
  identityContract,
  setMyId,
}: {
  accountAddress: String;
  setRegistered: () => void;
  identityContract: Contract<ContractAbi> | null;
  setMyId: React.Dispatch<React.SetStateAction<Object | null>>;
}) {
  const [aadhaar, setAadhaar] = useState<String>("");
  const [name, setName] = useState<String>("");

  function validator(): boolean {
    if (aadhaar.length !== 12) {
      window.alert("Aadhaar should be numeric. (12-digit)");
      return false;
    }
    if (!aadhaar.match(/[0-9]{12}/g)) {
      window.alert("Aadhaar should be numeric. (12-digit)");
      return false;
    }
    if (!name.match(/[A-Z]{1,}/g)) {
      window.alert("Name should be alphabetic only.");
      return false;
    }
    return true;
  }

  async function register() {
    if (validator()) {
      await identityContract?.methods
        .register(name, aadhaar)
        .send({ from: accountAddress.valueOf() });
      setRegistered();
      setMyId({
        name: name,
        addr: accountAddress,
        aadhaar: aadhaar,
      });
    }
  }

  return (
    <div className={styles.registerForm}>
      {/* <span>Account : {accountAddress}</span> */}
      <div>
        <span>Address</span>
        <input value={accountAddress.valueOf()} disabled></input>
        <span>Aadhaar</span>
        <input
          type="text"
          value={aadhaar.valueOf()}
          onChange={(e) => {
            let newAadhaar = e.target.value.trim().replace(" ", "");
            // console.log(newAadhaar)
            // newAadhaar = newAadhaar.match(/[0-9]/g) ? newAadhaar.match(/[0-9]{12}/g).join(" ") : "";
            // console.log(newAadhaar)
            setAadhaar(newAadhaar);
          }}
        ></input>
        <span>Name</span>
        <input
          type="text"
          value={name.valueOf()}
          onChange={(e) => {
            setName(e.target.value.trim().toUpperCase());
          }}
        ></input>
        <button onClick={register}>Register</button>
      </div>
    </div>
  );
}
