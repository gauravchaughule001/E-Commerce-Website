import React, { useEffect, useState } from 'react'
import './css/Settings.css'
import { updateLoginInfo } from '../action/auth.action';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {AiFillExclamationCircle} from "react-icons/ai";
import axios from 'axios';
import ScreenDimentions from '../components/Sample/ScreenDimentions';
export default function Settings() {

    const[show, setShow]=useState(false)

    const dispatch=useDispatch();

    const navigate=useNavigate();

    const[counter, setCounter]=useState(0)
    
    const [confirm, setConfirm] = useState("confirm-window")

    const[width,setWidth]=useState(window.innerWidth)
    const[height,setHeight]=useState(window.innerHeight)

    const logout = () => {
        localStorage.clear()
        dispatch(updateLoginInfo(null))
        navigate("/", { state: { counter: counter } })
    }

    // IP ADRESS SECTION
    const [ip, setIP] = useState("");

  //creating function to load ip address from the API
  const getData = async () => {
    const res = await axios.get("https://geolocation-db.com/json/");
    console.log(res.data);
    setIP(res.data.IPv4);
  };

useEffect(() => {
    window.addEventListener("resize", updateWidthAndHeight);
    return () => window.removeEventListener("resize", updateWidthAndHeight);
});

  const updateWidthAndHeight = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };



  return (
    <div class="settings-body">

<div class={confirm}>
                <div class="confirm-box">
                    <div class="confirm-message">
                        <h1>
                            <AiFillExclamationCircle />
                        </h1>
                        <h3>Are You Sure Want To Logout?</h3>
                    </div>
                    <div class="actionbtn">
                        <button class="confirm-no" onClick={() => {
                            setConfirm("confirm-window")
                        }}>No</button>
                        <button onClick={() => {
                            logout()
                            setConfirm("confirm-window")
                        }} class="confirm-yes">Yes</button>
                    </div>
                </div>
            </div>


        <h1>Settings</h1>
        <ul class="option-div">
            <li class="setting-option" onClick={()=>navigate('/profile')}>Profile</li>
            <li class="setting-option">Change Theme</li>
            <li class="setting-option">Change Language</li>
            <li class="setting-option">Account Settings</li>
            <li class="setting-option" onClick={()=>setConfirm("confirm-window-on")}>Logout</li>
        </ul>
        {/* <ScreenDimentions data={data}/> */}
        <ScreenDimentions data={

                <h1 style={{color:"red"}}>Gaurav Chaughule</h1>

        }/>

        <h1>{"Screen Width : "+width}</h1>
        <h1>{"Screen Height : "+height}</h1>
    </div>
  )
}
