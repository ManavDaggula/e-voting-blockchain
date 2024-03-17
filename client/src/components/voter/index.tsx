import { useState } from "react";
import Registration from "../registration";

export default function Voter(){
    const [isChairperson, setIsChairperson] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);

    return(
        (!isChairperson && !isRegistered && <Registration/>)
    )
}