import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { Component, useState } from "react";

import './account.scss'
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axios';

interface AuthAccountInterface {
    authenticated: boolean,
    setAuthenticated: (authenticated : boolean) => void;
}

function logout(navigate:any){
    
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    axiosInstance.defaults.headers.common["Authorization"] = "";
    navigate("/login");
}

function AuthAccount() {
    const navigate = useNavigate();
    const authenticated = localStorage.getItem("access_token")
    console.log()
    return (
        <div className="b96-account">
            {authenticated != null
                ? <button className="b96-login" onClick={()=>logout(navigate)}>Log Out</button>
                : <><Link to="/login" className="b96-login">Log In</Link><Link to="/register" className="b96-signup">Sign Up</Link></>}
        </div>
        );
}

export default AuthAccount;