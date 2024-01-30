import {Link} from "react-router-dom"
export default function Home(){
    return(
<>
        <div className="landing">
            <Link to ="/Admin" className="adminlink">Admin</Link>
            <Link to ="/Voter" className="voterlink">Voter</Link>

        </div>   

</>
    )
}


