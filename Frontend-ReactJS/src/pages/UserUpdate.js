import React, { useState } from 'react';
import { signup, updateuser } from '../services/services';
import { useDispatch, useSelector } from 'react-redux';
import { updateLoginInfo } from '../action/auth.action';

export default function UserUpdate() {


  let { loginData } = useSelector(state => state.auth)

  const [fname, setFname] = useState(loginData.firstName);
  const [lname, setLname] = useState(loginData.lastName);
  const [mail, setMail] = useState(loginData.email);
  const [password, setPassword] = useState("");
  const [pic, setPic] = useState("");
  const [id, setId] = useState(loginData.id);
  // const [pic, setPic] = useState([]);

  const validate = (e) => {

    e.preventDefault()
    if (id && fname && lname && mail && password) {
      callApi()
    }
    else {
      alert("Enter details")
    }
  }

const dispatch=useDispatch();

  const callApi = () => {

    let data = new FormData();
    data.append("id", id)
    data.append("firstName", fname);
    data.append("lastName", lname);
    data.append("email", mail);
    data.append("password", password);
    data.append("file", pic)

    console.log(pic)
    updateuser(data)
      .then((res) => {
        if (res) {

          // console.log(res)
          console.log(res.data)
          alert("Record Updated Successfully")
          //Setting Roll Type to Local Storage
          let user = res.data
          localStorage.setItem('USER_INFO', JSON.stringify(user));
          console.log(localStorage.getItem('USER_INFO'))

          //Update Login Info in JSON to redux
          dispatch(updateLoginInfo(user))

        }
      })
      .catch((err) => {
        console.log(err)
        if (err.response.status === 401) {
          alert("error")
        }
        else {
          alert("error")
        }
      });


  }

  return (
    <div class="outer">

      <div class="form">
        <h1 style={{ color: "black" }} >Update Profile</h1>

        <input class="registration-inputs" type="text" value={fname} onChange={(e) => {
          setFname(e.target.value);
        }} placeholder="Enter First Name" />
        <input class="registration-inputs" type="text" value={lname} onChange={(e) => {
          setLname(e.target.value);
        }} placeholder="Enter Last Name" />
        <input class="registration-inputs" type="email" value={mail} onChange={(e) => {
          setMail(e.target.value);
        }} placeholder="Enter Email Address" />
        <input class="registration-inputs" type="password" value={password} onChange={(e) => {
          setPassword(e.target.value);
        }} placeholder="Enter Password" />
        <input onChange={(e) => {
          if (e.target.files) {
            setPic(e.target.files[0]);
          }
        }} type="file" />

        {/* 
        <ImagePicker
          extensions={['jpg', 'jpeg', 'png']}
          dims={{ minWidth: 100, maxWidth: 500, minHeight: 100, maxHeight: 500 }}
          onChange={base64 => setPic(base64.target.value)}
    onError={errMsg => alert(errMsg)}
            /> */}

        <button onClick={validate} class="button-main">Update</button>
      </div>

    </div>
  )
}
