import React from 'react'
import './footer.css';
import { BsGooglePlay, BsInstagram, BsFacebook, BsTwitter,BsLinkedin } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { Link} from "react-router-dom";

export default function Footer() {

  const navigate=useNavigate()

  return (
    <div class="footer-main">
      <h7>All Rights Reserved © 2023</h7>
      <div class="links">
        <div><BsGooglePlay/></div>
        <div><BsInstagram/></div>
        <div><BsFacebook/></div>
        <div><BsTwitter/></div>
        <div><BsLinkedin/></div>
      </div>
      <div class="contact-area">
        <p>Contact : +91-9512369875</p>
        <p>Mail : abc@gmail.com</p>
      </div>
    </div>
  )
}
