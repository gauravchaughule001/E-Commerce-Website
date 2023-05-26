import React, { useState} from 'react'
import './LoginModal.css';
import { login } from '../services/services';
import { updateLoginInfo, updateRollType } from '../action/auth.action';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
export default function LoginModal({ show, onClose, children }) {




  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


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
      username: email,
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
          let user=res;
          localStorage.setItem('USER_INFO',JSON.stringify(user));
          console.log(localStorage.getItem('USER_INFO'))

          //Update Login Info in JSON to redux
          dispatch(updateLoginInfo(user))

          //Setting Roll Type to Redux
          // dispatch(updateRollType(localStorage.getItem('roll')))
          navigate("/")
        }
      })
      .catch((err) => {
        if(err.response.data.msg==="Invalid username or password !!"){
          alert("Invalid Credentials")
        }
        else{
          alert("Error in login")
        }
        throw err
      });



  }


  if (!show) {
    return null;
  }




  return (
    <div class="modal-body">
      <div class=" modal-box">
        <button onClick={onClose} className="close-btn btn-close" />
        <div>
          <div class="login-input-div">

            <input class="modal-input" onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Enter Username" />
            <input class="modal-input" onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter Password" />

            <button onClick={validate} class="login-btn button-main">Login</button>
          </div>

        </div>
      </div>
    </div>
  )
}
