import React, { useState, useEffect } from 'react'
import { changeOrderStatus, getAllOrderHistory, getOrderHistory, getOrderHistoryPages, getUserById } from '../services/services'
import './home.css';
import Accordion from 'react-bootstrap/Accordion';

import Searchbar from '../components/Searchbar';

import { Row, Col } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import PrintOrderDetails from '../print/PrintOrderDetails';
import { updateOrderHistory } from '../action/product.action';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { AiOutlineWarning, AiFillClockCircle, AiOutlineCheck } from "react-icons/ai";
import PaginatedItems from '../components/PaginatedItems';

export default function OrderHistory() {

    const [orderList, setOrderList] = useState([]);
    const [counter, setCounter] = useState(0);
    const [loader, setLoader] = useState(false)

    let userId = useSelector(state => state.auth.loginData.id);

    let processing_style = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "orange",
        fontSize: "1.6rem",
        h3_style: {
            margin: 10
        }
    }

    let delivered_style = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "green",
        fontSize: "1.6rem",
        h3_style: {
            margin: 10
        }
    }

    let cancel_style = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "red",
        fontSize: "1.6rem",
        h3_style: {
            margin: 10
        }
    }

    useEffect(() => {
        setLoader(true)
        getOrderHistory()
            .then((res) => {
                console.log(res)
                setOrderList(res.data)
                setLoader(false)
            })
            .catch((err) => {
                setLoader(false)
                throw err
            })

    }, [counter])


    const getTotalPrice = (element) => {
        let initialSum = 0;
        let finalSum = 0;
        element.orderItems.map((item) => (
            initialSum = initialSum + (item.quantity * item.price)
        ))
        finalSum = initialSum;
        initialSum = 0;
        var res = finalSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        return res
    }


    return (
        <>{loader ? <Loader /> :
            <div class="orderhistory-main">
                {orderList.length === 0 && <h4 class="d-flex justify-content-center" style={{ marginTop: 100 }}>Order Not Found!</h4>}

                {/* Search Order */}
                {/* <div class="orderhistory-searchbar">
                            <Searchbar tempText="Search Order By User ID" onClick={searchordersbyuserid} />
                        </div> */}

                {orderList.map((element, index) => (
                    <>
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <div key={index} class="orderdiv">
                                    <Accordion.Header class="m-0">
                                        <Row>
                                            <div class="orderer">
                                                <Col>
                                                    {element.status == "Pending" ?
                                                        <div style={processing_style}>
                                                            <AiOutlineWarning />
                                                            <h3 style={{ color: "orange", margin: 10 }}>{element.status}</h3>
                                                        </div>
                                                        : element.status == "Processing" ?
                                                            <div style={processing_style}>
                                                                <AiFillClockCircle />
                                                                <h3 style={processing_style.h3_style}>{element.status}</h3>
                                                            </div>
                                                            : element.status == "Delivered" ?
                                                                <div style={delivered_style}>
                                                                    <AiOutlineCheck />
                                                                    <h3 style={delivered_style.h3_style}> {element.status}</h3>
                                                                </div>
                                                                : element.status == "Cancelled" ?
                                                                    <div style={cancel_style}>
                                                                        <h3 style={cancel_style.h3_style}> {element.status}</h3>
                                                                    </div>
                                                                    : null
                                                    }
                                                </Col>
                                                <Col><p>Name: {element.customerName}</p></Col>
                                                <Col><p>Address: {element.customerAddress}</p></Col>
                                                <Col> <p>Order Date: {(new Date(element.lastUpdated)).toLocaleDateString()}</p></Col>
                                            </div>
                                        </Row>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <Row>
                                            <div class="orderer">
                                                <Col><p>Order Id: {element.id}</p></Col>
                                                <Col><p>Total Price: ₹{getTotalPrice(element)}</p></Col>
                                                <Col><p>Email: {element.customerEmail}</p></Col>
                                                <Col><p>Mobile: {element.customerMobile}</p></Col>
                                                {element.status == "Delivered" ?
                                                    <Col>
                                                        <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'start' }}>
                                                            <div><PrintOrderDetails element={element} /></div>
                                                        </div>
                                                    </Col>
                                                    : null
                                                }
                                            </div>
                                        </Row>
                                        <Row>
                                            <Col>Title</Col>
                                            <Col>Price</Col>
                                            <Col>Quantity</Col>
                                            <Col>Sub Total</Col>
                                        </Row>
                                        {element.orderItems.map((item, index) => (

                                            <Row key={index} style={{ height: 50 }}>
                                                <Col>{item.name}</Col>
                                                <Col>{'\u20b9'}{item.price}</Col>
                                                <Col>{item.quantity}</Col>
                                                <Col>{'\u20b9'}{item.quantity * item.price}</Col>
                                            </Row>
                                        ))}
                                    </Accordion.Body>
                                </div>
                            </Accordion.Item>
                        </Accordion>
                    </>
                ))}

            </div >

        }

        </>
    )
}
