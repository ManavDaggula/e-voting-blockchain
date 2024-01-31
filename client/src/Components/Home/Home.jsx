import {Link} from "react-router-dom"
import styles from "./Home.module.scss"
export default function Home(){
    return(

        <div className={styles.home}>
            <p>Cast your precious vote by clinking the link below.</p>
            <Link to={"/voter"}>Cast your vote</Link>
        </div>
    )
}


