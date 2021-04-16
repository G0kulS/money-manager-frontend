import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Getuserbyid } from "./api";

export default function Main()
{    
     let { id } = useParams();
     
     let arr = [];
     let [a,ua] = useState([]);
     useEffect(async()=>{
        let user = (await Getuserbyid(id)).dat
        
                   
     },[])
//      console.log(arr);
    return  <>
     
</>    
}