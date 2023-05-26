import React from 'react'

export default function UserByID() {
  return (
    <div class="outer">
      <h1 style={{color:"black"}} >Search User By ID</h1>

      <div class="form">

        <input type="text" placeholder="Enter User ID"/>
        <button onClick={()=>alert("This feature is not enabled")} class="registerbtn">Search</button>

      </div>



    </div>
  )
}
