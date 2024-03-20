import style from "./index.module.scss";
import waitImg from "./../../assets/6800261.webp";
export default function Waiting(){
    return(
        <div className={style.waitingPage}>
            <img src={waitImg} alt="Image of a person patiently waiting with a sand-clock on their head" />
            <p>Please wait Patiently</p>
        </div>
    )
}