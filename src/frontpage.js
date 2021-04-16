import React from "react" ; 
import { Link } from "react-router-dom";


export default function Frontpage()
{
    return <div className="container-fluid row">
        <div className="offset-5 col-2">
         <Link to ="/login"><div className="btcenter"> <button className="btn btn-primary wid">Login</button></div></Link> 
           <Link to="/register" > <div className="btcenter-n"> <button className="btn btn-primary wid">Register</button></div></Link>
        </div>
    </div>
}