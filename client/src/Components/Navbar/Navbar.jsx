import React, { useState } from 'react'
import {Link} from "react-router-dom"
import styles from "./Navbar.module.scss"

function Navbar(props) {
  
  return (
    <nav className={styles.nav}>
        <Link to="/"><span>Logo</span></Link>
        <ul>
            <li><Link to="/voter">Vote</Link></li>
            <li><Link to="/admin">Admin</Link></li>
            <li>{
              props.electionStatus ? 
                <span className={`${styles.circle} ${styles.green}`}></span> 
                :
                <span className={`${styles.circle} ${styles.red}`}></span>}</li>
        </ul>
    </nav>
  )
}

export default Navbar