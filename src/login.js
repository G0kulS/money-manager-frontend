import { render } from "@testing-library/react";
import React, { useState } from "react" ; 
import { Link, Redirect, useHistory } from "react-router-dom";
import {Createuser, Getuser} from "./api";

export default function Login()
{   
    let history = useHistory();
    let [type,utype] = useState("password");
    let [result,uresult] = useState("");
    let [email,uemail] = useState("");
    let [pass,upass] = useState("");
    let [id,uid] = useState("");
    return <div className="container-fluid row">
        <div className="offset-4 col-4">
            <div class="regcenter">
         <form  onSubmit={
             async (e)=>{
                 e.preventDefault();
                 let obj = {
                     email : email , 
                     password : pass
                 }
                 let temp =  await Getuser(obj);
                 console.log(temp);
                 uresult(temp.data.message);
                 upass("");
                 uemail("");
                 console.log(temp.data.userid);
                 console.log(temp.data.token);
                 uid(temp.data.userid);
                 window.localStorage.setItem("app_token",temp.data.token);
                 if(temp.data.message==="Allowed")
                 {
                 history.push("/dashboard/"+temp.data.userid);
                 //console.log("hell0");
                 }
             }
         }>   
        <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Email address</label>
        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" required value={email} onChange={
            (e)=>{
                uemail(e.target.value);
                uresult("");
            }
        }/></div>
        <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Password</label>
        <input type={type} class="form-control" id="exampleFormControlInput1" placeholder="minimum 8 character" minLength="8" required value={pass} onChange={
            (e)=>{
                upass(e.target.value);
                uresult("");
            }
        }/>
        <button className="btn btn-primary see-l" onMouseOver={()=>{
            utype("text");
        }} onMouseLeave={()=>{utype("password")}}><i class="far fa-eye"></i></button>
        </div>
         <div> {result} </div>
        <button type="submit" class="btn btn-primary">Login</button>
        
        </form>
        </div>
        </div>
    </div>
}