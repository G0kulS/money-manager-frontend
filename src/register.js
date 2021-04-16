import React, { useState } from "react" ; 
import { Link } from "react-router-dom";
import {Createuser} from "./api";

export default function Register()
{
    let [type,utype] = useState("password");
    let [name,uname] = useState("");
    let [result,uresult] = useState("");
    let [email,uemail] = useState("");
    let [pass,upass] = useState("");
    return <div className="container-fluid row">
        <div className="offset-4 col-4">
            <div class="regcenter">
         <form  onSubmit={
             async (e)=>{
                 e.preventDefault();
                 let obj = {
                     name,
                     email : email , 
                     password : pass
                 }
                 let temp =  await Createuser(obj);
                 console.log(temp);
                 uresult(temp.data.message);
                 upass("");
                 uemail("");
                 uname("");
             }
         }>
         <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Enter your name</label>
        <input type="text" class="form-control" id="exampleFormControlInput1"  required value={name} onChange={
            (e)=>{
                uname(e.target.value);
                uresult("");
            }
        }/></div>       
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
        <button className="btn btn-primary see" onMouseOver={()=>{
            utype("text");
        }} onMouseLeave={()=>{utype("password")}}><i class="far fa-eye"></i></button>
        </div>
         <div> {result} </div>
         <button type="submit" class="btn btn-primary">Register</button> 
        <Link to="/"> <button type="submit" class="btn btn-primary">Back</button></Link>
        </form>
        </div>
        </div>
    </div>
}