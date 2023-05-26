import React, { useState } from 'react'
import { login } from '../services/services';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateLoginInfo, updateRollType } from '../action/auth.action';
import Loader from '../components/Loader';

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[loader,setLoader]=useState(true)

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const validate = () => {
    if (email && password) {
      callApi();

    }
    else {
      alert("Enter Details")
    }
  }

  const callApi = () => {
    let data = {
      email: email,
      password: password
    }

    console.log(data.email);
    console.log(data.password);

    // Sample Data set to localstorage
    // localStorage.setItem('id', JSON.stringify(data));


    login(data)
      .then((res) => {
        if (res) {
          console.log(res)
          alert("Login Successful");

          //Setting Roll Type to Local Storage
          let user = res.data
          localStorage.setItem('USER_INFO', JSON.stringify(user));
          console.log(localStorage.getItem('USER_INFO'))

          //Update Login Info in JSON to redux
          dispatch(updateLoginInfo(user))

          //Setting Roll Type to Redux
          // dispatch(updateRollType(localStorage.getItem('roll')))
          navigate("/")
        }
      })
      .catch((err) => {
        alert("Error")
        console.log(err)
        console.log(err.data)
      });



  }




  return (


    <>
      {loader ? <Loader /> :

        <div class="outer">
          <h1 style={{ color: "black" }} >Login</h1>

          <div class="form">

            <div style={{ display: "flex", flexDirection: "column" }}>

              <input onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Enter Admin ID" />
              <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter Password" />

              <button onClick={validate} class="registerbtn">Login</button>

            </div>

          </div>



        </div>
      }
    </>
  )
}
