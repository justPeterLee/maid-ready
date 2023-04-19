import React from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";
import { useSelector } from "react-redux";
import { MdOutlineCleaningServices } from 'react-icons/md';
import { GrContact, GrInfo } from 'react-icons/gr'

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <Link to="/home">
        {/* <h2 className="nav-title">Maid!Ready!</h2> */}
        
      </Link>
      <div style={{display:"flex", alignItems:"center"}}>

        <p style={{marginRight:"3rem"}}>account type: {user.account_type}</p>

        <Link className="navLink" to="/why-us">
          Why Us
        </Link>

        <Link className="navLink" to="/service">
          <MdOutlineCleaningServices/>
        </Link>

        <Link className="navLink" to="/about">
        <GrInfo/>
        </Link>

        <Link className="navLink" to="/contact">
          <GrContact/>
        </Link>

        {/* If no user is logged in, show these links */}
        {!user.id ? (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login/selection">
            Sign in
          </Link>
        ) : (
          // <Link className="navLink" to="/user">
          //     User
          //   </Link>
          <LogOutButton className="navLink" />
          
        )}
      </div>
    </div>
  );
}

export default Nav;
