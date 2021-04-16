import React from "react";
import axios from "axios";

export function Createuser(obj)
{
   return axios.post("https://moneymangergoku.herokuapp.com/register",obj);
}

export function Getuser(obj)
{
    return axios.post("https://moneymangergoku.herokuapp.com/login",obj);
}
export function Getuserbyid(id)
{
    return axios.get(`https://moneymangergoku.herokuapp.com/user/${id}`);
}
export function Addincome(id,obj)
{
    return axios.put(`https://moneymangergoku.herokuapp.com/income/${id}`,obj);
}
export function Addexpense(id,obj)
{
    return axios.put(`https://moneymangergoku.herokuapp.com/expense/${id}`,obj);
}