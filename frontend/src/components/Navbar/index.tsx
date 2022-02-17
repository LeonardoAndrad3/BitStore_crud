import React from 'react';
import { Link } from 'react-router-dom';
import {ReactComponent as Logo} from "../../assets/img/Ellipse.svg";  
import './index.css';


export default function Navbar(){
    return(
        <>
           <nav className="nav navbar-fixed-bottom">
           <Logo className='Logo'/>
           <Link className="a" to={"/"}><h2> BitStore </h2> </Link>
            
           </nav>
        </>
    );
}