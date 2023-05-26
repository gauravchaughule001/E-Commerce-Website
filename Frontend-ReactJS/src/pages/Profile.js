import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import './css/Profile.css'
import { config } from '../config/config'

export default function Profile() {

  let { loginData } = useSelector(state => state.auth)
  useEffect(() => {
    console.log(loginData)
  }, [])

  return (
    <div class="profile-body m-5 p-5">
      <div class="d-flex align-items-center">
        <div class="">
          <img class="rounded-circle" style={{height:"250px"}} src={config.IMAGE_BASE_URL + "" + loginData.user.photo} />
        </div>
        <div class="info-div">
          <div>
            <h5 class="info-sec text-dark">Name</h5>
            <h5 class="info-sec text-dark">Email</h5>
            <h5 class="info-sec text-dark">RoleType</h5>
          </div>
          <div>
            <h5 class="info-data text-dark">{loginData.user.firstName + " " + loginData.user.lastName}</h5>
            <h5 class="info-data text-dark">{loginData.user.email}</h5>
            <h5 class="info-data text-dark">{loginData.user.roles[0].name}</h5>
          </div>
            
        </div>
      </div>
    </div>
  )
}
