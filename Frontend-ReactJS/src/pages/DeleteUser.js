import React, { useState } from 'react';
import { deleteUsers } from '../services/services';

export default function DeleteUser() {


  const [userid, setUserid] = useState("");

  const callApi = (userid) => {
    deleteUsers(userid).then(res => {
      if (res) {
        alert("User Deleted Successfully...!")
      }
    })
      .catch((err) => {
        console.log(err)
      });
  }

  return (
    <div class="outer">
      <div class="form">
      <h1 style={{color:"black"}} >Delete User By ID</h1>
        <input class="registration-inputs" onChange={(e) => {
          setUserid(e.target.value);
        }} type="text" placeholder="Enter User ID" />
        <button onClick={()=>callApi(userid)} class="button-main">Delete User</button>
      </div>
    </div>
  )
}
