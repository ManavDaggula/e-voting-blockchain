import React, { useState } from 'react'
import {Link} from "react-router-dom"
import styles from "./Navbar.module.scss"

function Navbar(props) {
  
  return (
    <nav className={styles.nav} style={{"--status-color":props.electionStatus ? "green" : "red"}}>
        <Link to="/"><span>Logo</span></Link>
        <ul>
            <li><Link to="/voter">Vote</Link></li>
            {props.isChairperson ? <li><Link to="/admin">Admin</Link></li> : <></>}
            {/* <li><span className={`${styles.circle} ${props.electionStatus ? styles.green : styles.red}`}></span></li> */}
            <li style={{filter: "blur(2px)"}}><span className={styles.circle}></span></li>
        </ul>
    </nav>
  )
}

export default Navbar