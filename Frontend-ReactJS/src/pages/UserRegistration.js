import React, { useState } from 'react';
import '../pages/css/Registration.css';
import { checkUsernameAvailability, signup } from '../services/services';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';


export default function UserRegistration() {

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [pic, setPic] = useState([]);
  const [mobile, setMobile] = useState("")
  const [username, setUsername] = useState("")
  const navigate = useNavigate();
  const [usernameMessage, setUsernameMessage] = useState("")
  const [inputColor, setInputColor] = useState("black")
  const [pass, showPass] = useState("password")

  const validate = (e) => {

    e.preventDefault()
    if (fname && lname && mail && password && pic && mobile) {

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
    // data.append("photo", "");

    // let data={
    //   firstName:fname,
    //   lastName:lname,
    //   email:mail,
    //   password:password,
    //   photo:""
    // }

    console.log(data)
    signup(data)
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
    setUsernameMessage("")
    checkUsernameAvailability(value)
      .then((res) => {
        if (res.data == "This Username Is Available") {
          // setUsernameMessage(res.data)
          setInputColor("Green")
        }
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
        if (err) {
          // setUsernameMessage("Username Is Unavailable")
          setInputColor("Red")

        }
        throw err
      })
  }


  return (
    <div class="outer-registration">

      <div class="registration-form">
        <div style={{ display: "flex", justifyContent: "end" }}>
          <button class="btn-close" onClick={() => navigate('/')} />
        </div>
        <h1 style={{ color: "black" }} >Sign Up</h1>
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
                <img src={require('../Images/open.jpg')} alt="" style={{ height: "20px", width: "20px" , cursor:"pointer"}} /> :
                <img src={require('../Images/close.jpg')} alt="" style={{ height: "20px", width: "20px", marginTop:1 , cursor:"pointer"}} />
              }
            </div>

          </div>
          <select value={gender} onChange={(e) => {
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
          <input onChange={(e) => {
            if (e.target.files) {
              setPic(e.target.files[0]);
            }
          }} type="file" />



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
