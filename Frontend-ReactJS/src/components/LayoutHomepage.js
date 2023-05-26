import React, { useState } from 'react'
import { Outlet, link, useNavigate } from 'react-router-dom'
import './navbar-home.css';
import LoginModal from '../components/LoginModal';
import Login from '../pages/Login';
import UserRegistration from '../pages/UserRegistration';

export default function LayoutHomepage() {

    const [show, setShow] = useState(false)

    const [registration, setRegistration] = useState(false)

    const navigate = useNavigate()

    return (
        <>
            <div class="home-page-nav-main">
                <div class="homepage-navbar">
                    <a><button onClick={() => {
                        // navigate("/login")
                        navigate('/')
                        setShow(true)
                    }} class="home-nav-tab">Login</button></a>



                    <a><button onClick={() => {
                        setShow(false)
                        navigate("/userregistration")
                    }} class="home-nav-tab">Sign up</button></a>
                </div>
            </div>
            <LoginModal onClose={() => {
                setShow(false)
            }} show={show} />

            <Outlet />
        </>
    )
}
