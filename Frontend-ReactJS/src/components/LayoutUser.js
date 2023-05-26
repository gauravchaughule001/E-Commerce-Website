import { Nav } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import './Layout.css'
import { useDispatch, useSelector } from 'react-redux';
import { updateLoginInfo, updateRollType } from '../action/auth.action';
import { AiOutlineShoppingCart, AiFillExclamationCircle, AiOutlineLogout, AiOutlineUser, AiOutlineMenu, AiFillEdit, AiFillHome, AiOutlineAppstoreAdd, AiOutlineUserDelete, AiOutlineHistory, AiFillSetting } from "react-icons/ai";
import { BiAddToQueue, BiInfoCircle, BiLogOut } from "react-icons/bi";
import { IoMdCart } from "react-icons/io";
import { config } from '../config/config';

export default function LayoutUser() {

    const [profile, setProfile] = useState(false)
    const [menu, setMenu] = useState(false)
    const [counter, setCounter] = useState(0)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [confirm, setConfirm] = useState("confirm-window")

    let { loginData } = useSelector(state => state.auth)
    let id;
    if (loginData) {
        console.log("Roll Type In loginInfo in App.js is :::", loginData.user.roles[0].id)
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
            <div className="navbar">
                <div className="admin-view">
                    <Nav>
                        <h3 onClick={() => setMenu(true)} style={{ marginLeft: 20, marginRight: 20, cursor: 'pointer' }}>
                            <AiOutlineMenu />
                        </h3>

                        <h2 class="Main-Heading" onClick={() => navigate('/')}>

                            <IoMdCart />ShopEasy

                        </h2>
                        <div class="navitems">
                            {/* Display None Default in Layout.css */}


                            <Nav.Item>
                                <Nav.Link style={{ color: "white" }} as={Link} to="/">Home</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link style={{ color: "white" }} as={Link} to="/">
                                    <div onClick={logout}> <AiOutlineLogout /> Logout</div></Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link style={{ color: "white" }} as={Link} to="/cart">View Cart</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link style={{ color: "white" }} as={Link} to="/orderhistory">Order History</Nav.Link>
                            </Nav.Item>
                        </div>

                        <h3 class="nav-button-fixed nav-fixed-1" onClick={() => {
                            { profile ? setProfile(false) : setProfile(true) }
                        }}><AiOutlineUser />

                        </h3>
                        <h3 class="nav-button-fixed nav-fixed-2">
                            <div onClick={() => setConfirm("confirm-window-on")}>
                                <AiOutlineLogout />
                            </div>
                        </h3>
                    </Nav>
                </div>
            </div>

            {/* #############################        SIDE MENU   ######################### */}

            {menu ?
                <div class="menu-wrapper" onClick={() => setMenu(false)}>
                    <div class="side-menu">
                        <button onClick={() => { setMenu(false) }} class="btn-close close-btn" />

                        <img class="menu-image" src={config.IMAGE_BASE_URL + "" + loginData.user.photo} alt="" />
                        <h5 style={{ marginTop: 15 }}>Hi, {loginData.user.firstName}</h5>
                        <h4 class="edit-icon"><AiFillEdit /></h4>
                        <p style={{ color: "white", margin: 0 }}>{loginData.user.email}</p>
                        <div class="seperator"></div>
                        <div class="menu-box">
                            <div class="menu-item" onClick={() => navigate('/')}><div class="menu-icon"><AiFillHome /> </div>Home</div>
                            <div class="menu-item" onClick={() => navigate('/cart')}><div class="menu-icon"><AiOutlineShoppingCart /></div> View Cart</div>
                            <div class="menu-item" onClick={() => navigate('/orderhistory')}><div class="menu-icon"><AiOutlineHistory /></div> Order History</div>
                            <div class="menu-item" onClick={() => navigate('/settings')}><div class="menu-icon"><AiFillSetting /></div> Settings</div>
                        </div>
                        <div class="seperator"></div>
                        <div class="logout-icon">
                            <h2><BiLogOut /></h2>
                        </div>
                    </div>
                </div> :

                null

            }
            {profile ?
                <div class="profile-wrapper">
                    <div class="profile-div">
                        <button class="btn-close close-btn" onClick={() => setProfile(false)} />
                        <img class="menu-image" src={config.IMAGE_BASE_URL + "" + loginData.user.photo} alt="" />
                        <h1>{loginData.user.firstName + " " + loginData.user.lastName}</h1>
                        <p>{loginData.email}</p>
                        <button class="log-out-modal">Logout</button>
                    </div>
                </div>

                :
                null

            }

            <Outlet />
        </>
    )
}
