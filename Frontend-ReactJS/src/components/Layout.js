import { Nav } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import './Layout.css'
import { useDispatch, useSelector } from 'react-redux';
import { updateLoginInfo, updateRollType } from '../action/auth.action';
import { AiOutlineLogout, AiOutlineUser, AiOutlineMenu, AiFillEdit, AiFillHome, AiOutlineAppstoreAdd, AiOutlineUserDelete, AiOutlineHistory, AiFillSetting } from "react-icons/ai";
import { BiAddToQueue, BiInfoCircle, BiLogOut } from "react-icons/bi";
import { config } from '../config/config';



const Layout = () => {

    const [confirm, setConfirm] = useState(false)

    const navigate = useNavigate();
    const [counter, setCounter] = useState(0)

    const[menu,setMenu]=useState(false)

    const dispatch = useDispatch();
    // let id = localStorage.getItem('roll')


    let { loginData } = useSelector(state => state.auth)
    let id;
    if (loginData) {
        console.log("Roll Type In loginInfo in App.js is :::", loginData.rollType)
        id = loginData.rollType;
    }



    const logout = () => {


        localStorage.clear()
        dispatch(updateLoginInfo(null))
        alert("Logout Success, Thank You, Visit Again!")
        navigate("/", { state: { counter: counter } })
    }
    return (
        <>
            <div className="navbar">
                <div className="admin-view">
                    <Nav>
                        <h3 onClick={()=>setMenu(true)} style={{ marginLeft: 20, marginRight: 20, cursor: 'pointer' }}>
                            <AiOutlineMenu />
                        </h3>
                        {/* Login Logout Show Validation */}
                        {id ?
                            <div style={{ display: "flex" }}>
                                <Nav.Item>
                                    <Nav.Link style={{ color: "white" }} as={Link} to="/">Home</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link style={{ color: "white" }} as={Link} to="/">
                                        <div onClick={logout}> <AiOutlineLogout /> Logout</div></Nav.Link>
                                </Nav.Item>
                            </div>
                            :
                            <div style={{ display: "flex" }}>
                                <Nav.Item>
                                    <Nav.Link style={{ color: "white" }} as={Link} to="/login">Login</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link style={{ color: "white" }} as={Link} to="/userregistration">User Registration</Nav.Link>
                                </Nav.Item>
                            </div>
                        }

                        {id == 500 ?
                            <div style={{ display: "flex" }}>

                                <Nav.Item>
                                    <Nav.Link style={{ color: "white" }} as={Link} to="/admin/getuserbyid">Get User</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link style={{ color: "white" }} as={Link} to="/admin/deleteuser">Delete User</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link style={{ color: "white" }} as={Link} to="/admin/addproduct">Add Product</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link style={{ color: "white" }} as={Link} to="/admin/addcategory">Add Category</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link style={{ color: "white" }} as={Link} to="/orderhistory">Order History</Nav.Link>
                                </Nav.Item>

                            </div>
                            : id ?
                                <div style={{ display: "flex" }}>
                                    <Nav.Item>
                                        <Nav.Link style={{ color: "white" }} as={Link} to="/cart">View Cart</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link style={{ color: "white" }} as={Link} to="/orderhistory">Order History</Nav.Link>
                                    </Nav.Item>
                                </div>
                                :
                                <div></div>
                        }
                        <h3 style={{ position: 'fixed', top: 10, right: 90, cursor: 'pointer' }}>
                            <AiOutlineUser />
                        </h3>
                        <h3 style={{ position: 'fixed', top: 10, right: 30, cursor: 'pointer' }}>
                            <div onClick={logout}>
                                <AiOutlineLogout />
                            </div>
                        </h3>

                    </Nav>



                </div>
            </div>

            {/* #############################        SIDE MENU   ######################### */}

            {menu?
            <div class="menu-wrapper" onClick={()=>setMenu(false)}>
            <div class="side-menu">
                <button onClick={()=>{setMenu(false)}} class="btn-close close-btn"/>

                <img class="menu-image" src={config.IMAGE_BASE_URL + "" + loginData.photo} alt=""/>
                <h5 style={{marginTop:15}}>Hi, {loginData.firstName}</h5>
                <h4 class="edit-icon"><AiFillEdit/></h4>
                <p style={{color:"white", margin:0}}>{loginData.email}</p>
                <div class="seperator"></div>
                <div class="menu-box">
                    <div class="menu-item" onClick={()=>navigate('/')}><div class="menu-icon"><AiFillHome/> </div>Home</div>
                    <div class="menu-item" onClick={()=>navigate('/admin/addproduct')}><div class="menu-icon"><AiOutlineAppstoreAdd/></div> Add Product</div>
                    <div class="menu-item" onClick={()=>navigate('/admin/addcategory')}><div class="menu-icon"><BiAddToQueue/></div> Add Category</div>
                    <div class="menu-item" onClick={()=>navigate('/admin/getuserbyid')}><div class="menu-icon"><BiInfoCircle/></div> Get User Details</div>
                    <div class="menu-item" onClick={()=>navigate('/admin/deleteuser')}><div class="menu-icon"><AiOutlineUserDelete/></div> Delete User</div>
                    <div class="menu-item" onClick={()=>navigate('/orderhistory')}><div class="menu-icon"><AiOutlineHistory/></div> Order History</div>
                    <div class="menu-item"><div class="menu-icon"><AiFillSetting/></div> Settings</div>
                </div>
                <div class="seperator"></div>
                <div class="logout-icon">
                    <h2><BiLogOut/></h2>
                </div>
            </div>
            </div>:

                null

            }

            <Outlet />
        </>
    )
}

export default Layout