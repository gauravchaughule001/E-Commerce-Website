import React, { useEffect, useState } from 'react'
import { getUserById } from '../services/services';
import { config } from '../config/config';
import { useSelector } from 'react-redux';

export default function GetUser() {

    const [id, setId] = useState(0);

    const [userData, setUserData] = useState([])

    const user=useSelector(state=>state.auth.loginData.id)
    const callApi = () => {
        if (id) {
            getUserById(id)
                .then((res) => {
                    console.log(res.data.data)
                    setUserData(res.data.data)
                    alert("user information getted")
                })
                .catch((err) => {
                    throw err
                })
        }
        else {
            alert("Enter User Id First")
        }
    }


    return (
        <div class="outer">

            <div class="form">
            <h1 style={{color:"black"}} >Get user details by ID</h1>

                <div style={{ display: "flex", flexDirection: "column" }}>

                    <input class="registration-inputs" type="text" onChange={(e) => setId(e.target.value)} placeholder="Enter User ID" />

                    <button onClick={callApi} class="button-main">Login</button>

                </div>

            </div>
            <hr />
            {userData.id ?
                <div class="user-details">
                    <h1>User Details</h1>
                    <img style={{ height: 100, width: 100, margin: "auto", borderRadius: "50%" }} src={config.IMAGE_BASE_URL + "" + userData.photo} />
                    <h2 style={{ color: "#fff" }}>Name: {userData.firstName} {userData.lastName}</h2>
                    {userData.roles[0].id==500?
                    
                        <h2 style={{ color: "#fff" }}>Role : Admin</h2>
                        :
                    <h2 style={{ color: "#fff" }}>Type : Normal User</h2>
                    }
                    
                </div>
                :
                null
            }

        </div>
    )
}
