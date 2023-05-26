import { Button, Nav } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import './Layout.css'
import { useDispatch, useSelector } from 'react-redux';
import { updateLoginInfo, updateRollType } from '../action/auth.action';
import { AiOutlineLogout, AiFillExclamationCircle, AiOutlineUser, AiOutlineMenu, AiOutlineUserAdd, AiFillEdit, AiFillHome, AiOutlineAppstoreAdd, AiOutlineUserDelete, AiOutlineHistory, AiFillSetting } from "react-icons/ai";
import { BiAddToQueue, BiInfoCircle, BiLogOut } from "react-icons/bi";
import { config } from '../config/config';
import { IoMdCart } from "react-icons/io";
import UserRegistration from '../pages/UserRegistration';
import Clock from './Clock';

export default function LayoutAdmin() {
    const [profile, setProfile] = useState(false)
    const [menu, setMenu] = useState(false)
    const [confirm, setConfirm] = useState("confirm-window")
    const [counter, setCounter] = useState(0)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    let { loginData } = useSelector(state => state.auth)
    let id;
    if (loginData) {
        console.log("Roll Type In loginInfo in App.js is :::", loginData.rollType)
        id = loginData.rollType;
    }

    const logout = () => {
        localStorage.clear()
        dispatch(updateLoginInfo(null))
        navigate("/", { state: { counter: counter } })
    }


    return (
        <>
            <div class={confirm}>
                <div class="confirm-box">
                    <div class="confirm-message">
                        <h1>
                            <AiFillExclamationCircle />
                        </h1>
                        <h3>Are You Sure Want To Logout?</h3>
                    </div>
                    <div class="actionbtn">
                        <button class="confirm-no" onClick={() => {
                            setConfirm("confirm-window")
                        }}>No</button>
                        <button onClick={() => {
                            logout()
                            setConfirm("confirm-window")
                        }} class="confirm-yes">Yes</button>
                    </div>
                </div>
            </div>

            <div style={{ zIndex: 3 }} className="navbar">
                <div className="admin-view">
                    <Nav>
                        <h3 onClick={() => setMenu(true)} style={{ marginLeft: 20, marginRight: 20, cursor: 'pointer' }}>
                            <AiOutlineMenu />
                        </h3>
                        <h2 class="Main-Heading" onClick={() => navigate('/')}>
                            <IoMdCart /> ShopEasy
                        </h2>

                        <h3 class="nav-button-fixed nav-fixed-1" onClick={() => {
                            { profile ? setProfile(false) : setProfile(true) }
                        }}><AiOutlineUser />

                        </h3>
                        <h3 class="nav-button-fixed nav-fixed-3">
                            <Clock/>
                        </h3>
                        <h3 class="nav-button-fixed nav-fixed-2" style={{ position: 'fixed', top: 10, right: 30, cursor: 'pointer' }}>
                            <div onClick={() => setConfirm("confirm-window-on")}
                            >
                                <AiOutlineLogout />
                            </div>
                        </h3>
                    </Nav>
                </div>
            </div>

            {/* #############################        SIDE MENU   ######################### */}

            {menu ?
                <div style={{ zIndex: 3 }} class="menu-wrapper">
                    <div class="side-menu">
                        <button onClick={() => { setMenu(false) }} class="btn-close close-btn" />
                        <img class="menu-image" src={config.IMAGE_BASE_URL + "" + loginData.user.photo} alt="" />
                        <h5 style={{ marginTop: 15 }}>Hi, {loginData.user.firstName}</h5>
                        <h4 class="edit-icon" onClick={() => { navigate('/updateuser'); setMenu(false) }}><AiFillEdit /></h4>
                        <p style={{ color: "white", margin: 0 }}>{loginData.user.email}</p>
                        <div class="seperator"></div>
                        <div class="menu-box">
                            <div class="menu-item" onClick={() => {
                                navigate('/')
                                setMenu(false)
                            }}><div class="menu-icon"><AiFillHome /></div>Home</div>

                            <div class="menu-item" onClick={() => {
                                navigate("/addnewuser")
                                setMenu(false)
                            }}><div class="menu-icon"><AiOutlineUserAdd /></div>Add New User</div>

                            <div class="menu-item" onClick={() => {
                                navigate('/admin/addproduct')
                                setMenu(false)
                            }}><div class="menu-icon"><AiOutlineAppstoreAdd /></div> Add Product</div>

                            <div class="menu-item" onClick={() => {
                                navigate('/admin/addcategory')
                                setMenu(false)
                            }}><div class="menu-icon"><BiAddToQueue /></div> Add Category</div>

                            <div class="menu-item" onClick={() => {
                                navigate('/admin/getuserbyid')
                                setMenu(false)
                            }}><div class="menu-icon"><BiInfoCircle /></div> Get User Details</div>

                            <div class="menu-item" onClick={() => {
                                navigate('/admin/deleteuser')
                                setMenu(false)
                            }}><div class="menu-icon"><AiOutlineUserDelete /></div> Delete User</div>

                            <div class="menu-item" onClick={() => {
                                navigate('/orderhistory')
                                setMenu(false)
                            }}><div class="menu-icon"><AiOutlineHistory /></div> Order History</div>

                            <div class="menu-item" onClick={() => {
                                navigate('/settings')
                                setMenu(false)
                            }}><div class="menu-icon"><AiFillSetting /></div> Settings</div>

                        </div>
                        <div class="seperator"></div>
                    </div>
                    <div class="bin-div" onClick={() => setMenu(false)}></div>
                </div> :

                null

            }
            {profile ?
                <div class="profile-wrapper">
                    <div class="profile-div">
                        <button class="btn-close close-btn" onClick={() => setProfile(false)} />
                        <img class="menu-image" src={config.IMAGE_BASE_URL + "" + loginData.photo} alt="" />
                        <h1>{loginData.user.firstName + " " + loginData.user.lastName}</h1>
                        <p>{loginData.user.email}</p>
                        <Button className="m-2 btn-outline-primary" variant="">Edit Profile</Button>
                        <Button className="m-2" variant="danger" onClick={() => {
                            setConfirm("confirm-window-on")
                            setProfile(false)
                        }}>Logout</Button>
                    </div>
                </div>

                :
                null

            }

            <Outlet />
        </>
    )
}
