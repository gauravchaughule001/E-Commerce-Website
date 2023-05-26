import React, { useState } from 'react';
import '../css/Registration.css';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { signupCustom, checkUsernameAvailability } from '../../services/services';


export default function UserRegistrationAdmin() {

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [pic, setPic] = useState([]);
  const [mobile, setMobile] = useState("")
  const [role, setRole] = useState("501")

  const [pass, showPass] = useState("password")

  const navigate=useNavigate()

  const validate = (e) => {

    e.preventDefault()
    if (fname && lname && mail && password && pic && mobile && role != "NA") {

      callApi()
    }
    else {
      alert("Enter details")
    }
  }

  const callApi = () => {

    let data = new FormData();
    data.append("firstName", fname);
    data.append("lastName", lname);
    data.append("email", mail);
    data.append("password", password);
    data.append("gender", gender);
    data.append("mobileNumber", mobile);
    data.append("file", pic);
    data.append("role", role);
    // data.append("photo", "");

    // let data={
    //   firstName:fname,
    //   lastName:lname,
    //   email:mail,
    //   password:password,
    //   photo:""
    // }

    console.log(data)
    signupCustom(data)
      .then((res) => {
        if (res) {

          // console.log(res)
          console.log(res)
          alert("Registration Success")
          // navigate('/')

        }
      })
      .catch((err) => {
        console.log(err)
        throw err
      }
      );



  }

  const checkUsername = (value) => {
    checkUsernameAvailability(value)
      .then((res) => {
        if (res.data == "This Username Is Available") {
          // setUsernameMessage(res.data)
        }
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
        if (err) {
          // setUsernameMessage("Username Is Unavailable")
        }
        throw err
      })
  }


  return (
    <div class="outer-registration">

      <div class="registration-form">
      <button class="btn-close" onClick={()=>navigate('/')}/>
        <h1 style={{ color: "black" }} >Add new user</h1>
        <div class="input-container">
          <input class="registration-inputs" style={{ color: "black" }} type="text" value={fname} onChange={(e) => {
            setFname(e.target.value);
          }} placeholder="Enter First Name" />
          <input class="registration-inputs" style={{ color: "black" }} type="text" value={lname} onChange={(e) => {
            setLname(e.target.value);
          }} placeholder="Enter Last Name" />
        </div>
        <div class="input-container">
          <input class="registration-inputs" style={{ color: "black" }} type="text" value={mobile} onChange={(e) => {
            setMobile(e.target.value);
          }} placeholder="Enter Mobile Number" />
          <input class="registration-inputs" style={{ color: "black" }} type="email" value={mail} onChange={(e) => {
            setMail(e.target.value);
          }} placeholder="Enter Email Address" />
        </div>


        <div class="input-container">
          <div style={{ width: "93%", display: "flex" }}>
            <input class="registration-inputs" style={{ color: "black", width: "90%", marginRight: 0 }} type={pass} value={password} onChange={(e) => {
              setPassword(e.target.value);
            }} placeholder="Enter Password" />
            <div style={{ width: "10%", marginLeft: 0, color: "black" }} type="checkbox" onClick={() => {
              if (pass == "password") {
                showPass("text")
              }
              else {
                showPass("password")
              }
            }} class="password-checkbox">
              {pass == "password" ?
                <img src={require('../../Images/open.jpg')} alt="" style={{ height: "20px", width: "20px" }} /> :
                <img src={require('../../Images/close.jpg')} alt="" style={{ height: "20px", width: "20px", marginTop: 1 }} />
              }
            </div>

          </div>
          <select style={{ width: "90%" }} value={gender} onChange={(e) => {
            console.log(e.target.value)
            setGender(e.target.value)
          }
          }>
            <option value="NA">Select Gender</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="T">Transgender</option>
            <option value="N">Prefer not to respond</option>
          </select>
        </div>


        <div class="input-container">
          <input class="file-input" onChange={(e) => {
            if (e.target.files) {
              setPic(e.target.files[0]);
            }
          }} type="file" />
          <select value={role} onChange={(e) => {
            console.log(e.target.value)
            setRole(e.target.value)
          }
          }>
            <option value="NA">Select User Type</option>
            <option value="500">Admin</option>
            <option value="501">Normal</option>
          </select>


          {/*
          <input class="registration-inputs" style={{ color:inputColor }} type="email" value={username} onChange={(e) => {
            // setUsernameMessage("")
            setInputColor("Black")
            setUsername(e.target.value);
          }} placeholder="Create Username" />
          <Button onClick={() => {
            //      Valid Username Check
            // if((username.endsWith(".com") || username.endsWith(".in")|| username.endsWith(".org"))){
            //   checkUsername(username)
            // }
            checkUsername(username)
            }}>Check Availability</Button> */}







        </div>
        {/* {usernameMessage=="This Username Is Available"?
          <h5 style={{ color: "green" }}>{usernameMessage}</h5>:
          <h5 style={{ color: "red" }}>{usernameMessage}</h5>
        } */}



        <div class="selectdiv">
        </div>


        <div style={{ width: "25vw", margin: "auto" }}>
          <button onClick={validate} class="button-main ">Sign Up</button>
        </div>
      </div>

    </div>
  )
}
