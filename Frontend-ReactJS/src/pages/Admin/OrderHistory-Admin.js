import React, { useState, useEffect } from 'react'
import { changeOrderStatus, getAllOrderHistory, getOrderHistory, getOrderHistoryByDate, getOrdersByCustomerName, getOrdersByFilters, getOrdersByStatus, getUserById } from '../../services/services'
import '../home.css';
import Accordion from 'react-bootstrap/Accordion';
import Searchbar from '../../components/Searchbar';
import { Row, Col, Dropdown, Modal } from 'react-bootstrap';
import Loader from '../../components/Loader';
import { AiOutlineWarning, AiFillClockCircle, AiOutlineCheck } from "react-icons/ai";
import SortByDate from './SortByDate';
import SortOrderByStatus from '../../components/SortOrderByStatus';

export default function OrderHistoryAdmin() {

    const [orderList, setOrderList] = useState([]);
    const [counter, setCounter] = useState(0);
    const [loader, setLoader] = useState(false)
    const [message, setMessage] = useState("")
    const [currentSelect, setCurrentSelect] = useState("Status")

    useEffect(() => {
        setLoader(true)
        getAllOrderHistory()
            .then((res) => {
                console.log(res)
                setMessage("")
                setOrderList(res.data)
                setLoader(false)
            })
            .catch((err) => {
                setLoader(false)
                throw err
            })
    }, [counter])


    const searchordersbyuserid = (key) => {

        setLoader(true)
        if (key == null) {
            setCounter(counter + 1)
        }

        getOrdersByCustomerName(key)
            .then((res) => {

                if (res.data.length > 0) {
                    setMessage(res.data.length + " Results Found For " + key)
                    setOrderList(res.data)
                    setLoader(false)
                }
            })
            .catch((err) => {
                if (err) {
                    setOrderList([])
                    setMessage("Orders Not Found For " + key)
                    setLoader(false)
                }
                throw err

            })



        // setLoader(true)
        // getUserById(id)
        //     .then((res) => {
        //         console.log(res.data.data)
        //         setLoader(false)
        //     })
        //     .catch((err) => {
        //         setLoader(false)
        //         throw err
        //     })

    }

    const getTotalPrice = (element) => {
        let initialSum = 0;
        let finalSum = 0;
        element.orderItems.map((item) => (
            initialSum = initialSum + (item.quantity * item.price)
        ))
        finalSum = initialSum;
        initialSum = 0;

        // return finalSum


        var res = finalSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        return res
    }

    const changeStatus = (id, status) => {

        if (status === 1 || status === 2 || status === 3) {
            setLoader(true)
            changeOrderStatus(id, status)
                .then((res) => {
                    console.log(res)
                    setCounter(counter + 1)
                    setLoader(false)
                    alert("Status Updated Successfully")
                })
                .catch((err) => {
                    setLoader(false)
                    throw err
                })
        }
        else {
            alert("Please select status")
        }
    }


    const sortByDate = (to, from) => {
        getOrderHistoryByDate(from, to)
            .then((res) => {
                setOrderList(res.data)
                console.log(res.data)
            })
            .catch((err) => { throw err })
    }

    const getByStatus = (value) => {
        if (value == 0) {
            setCurrentSelect("Sort Orders")
            setCounter(counter + 1)
        }
        getOrdersByStatus(value)
            .then((res) => {
                {
                    value == 0 ?
                        setCurrentSelect("Sort Orders")
                        :
                        setCurrentSelect(value)
                }
                setOrderList(res.data)
                console.log(res.data)
            })
            .catch((err) => {
                setCurrentSelect("Sort Orders")
                throw err
            })
    }


    const filterOrders=(values,key)=>{
        let data;
        if(values){
            if(key==1){
                alert(values.search)
                data={search:values.search}
            }
            else if(key==2){

                    data={from:values.from,to:values.to}
           
            }
            else if(key==3){
                if(values==0){
                    setCounter(counter+1)
                }
                else{
                    data={status:values}
                }
            }
            console.log(data)
            getOrdersByFilters(key,data)
            .then((res)=>{
                setOrderList(res.data.data)
                console.log(res)
            })
            .catch((err)=>{console.log(err)})
        }
        else{
            setCounter(counter+1)
        }
    }

    return (
        <>{loader ? <Loader /> :

            <div class="orderhistory-main">
                <div>

                    <div class="orderhistory-searchbar">
                    {/* <Searchbar tempText="Search Orders By Name/email/Mobile" onClick={searchordersbyuserid} /> */}
                        <Searchbar tempText="Search Orders By Name/email/Mobile" onClick={filterOrders} />
                        <div style={{ display: "inline-block", width: "50vw"}}>
                            {/* <SortByDate onClick={sortByDate} /> */}
                            <SortByDate onClick={filterOrders} />
                        </div>
                        <div style={{ marginRight: 20 }}>
                            {/* <SortOrderByStatus status={currentSelect} onPress={getByStatus} /> */}
                            <SortOrderByStatus status={currentSelect} onPress={filterOrders} />
                        </div>
                    </div>

                    {orderList.length === 0 && <h4 class="d-flex justify-content-center" style={{ marginTop: 100 }}>Order Not Found!</h4>}

                    {message.length > 1 ?

                        <h5 style={{ margin: 10, color: "grey", fontStyle: 'Italic' }}>{message}</h5>
                        : null
                    }


                    {orderList.map((element, index) => (
                        <>
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <div key={index} class="orderdiv">
                                        <Accordion.Header class="m-0">
                                            <div class="orderer-outer">
                                                <div class="orderer">
                                                    <Row>
                                                        <Col>
                                                            <div>
                                                                {element.status === "Pending" ?
                                                                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", color: "orange", fontSize: "1.6rem" }}>
                                                                        <AiOutlineWarning />
                                                                        <h3 style={{ color: "orange", margin: 10 }}>{element.status}</h3>
                                                                    </div>
                                                                    : element.status === "Processing" ?
                                                                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", color: "orange", fontSize: "1.6rem" }}>
                                                                            <AiFillClockCircle />
                                                                            <h3 style={{ color: "orange", margin: 10 }}>{element.status}</h3>
                                                                        </div>
                                                                        : element.status === "Delivered" ?
                                                                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", color: "green", fontSize: "1.6rem" }}>
                                                                                <AiOutlineCheck />
                                                                                <h3 style={{ color: "green", margin: 0 }}> {element.status}</h3>
                                                                            </div>
                                                                            : element.status === "Cancelled" ?
                                                                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", color: "red", fontSize: "1.6rem" }}>
                                                                                    <h3 style={{ color: "red", margin: 0 }}> {element.status}</h3>
                                                                                </div>
                                                                                : null
                                                                }
                                                            </div>
                                                        </Col>
                                                        <Col><p>Order Id: {element.id}</p></Col>
                                                        <Col><p>Total Price: ₹{getTotalPrice(element)}</p></Col>
                                                        <Col> <p>Order Date: {(new Date(element.lastUpdated)).toLocaleDateString()}</p></Col>
                                                        <Col><p>Name: {element.customerName}</p></Col>
                                                        <Col><p>Email: {element.customerEmail}</p></Col>
                                                        <Col><p>Mobile: {element.customerMobile}</p></Col>
                                                    </Row>
                                                </div>
                                            </div>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                                <Row style={{fontWeight:"bold"}}>
                                                    <Col>Title</Col>
                                                    <Col>Price</Col>
                                                    <Col>Quantity</Col>
                                                    <Col>Sub Total</Col>
                                                </Row>

                                            <hr />
                                            {element.orderItems.map((item, index) => (

                                                <Row key={index} style={{ height: 50 }}>
                                                    <Col>{item.name}</Col>
                                                    <Col>{'\u20b9'}{item.price}</Col>
                                                    <Col>{item.quantity}</Col>
                                                    <Col>{'\u20b9'}{item.quantity * item.price}</Col>
                                                </Row>
                                            ))}
                                            <hr />
                                            <Row>
                                                <Col></Col>
                                                <Col></Col>
                                                <Col style={{fontWeight:"bold"}}>Total Amount :</Col>
                                                <Col>{getTotalPrice(element)}</Col>
                                            </Row>
                                            <>{element.status !== "Delivered" && element.status !== "Cancelled" ?
                                                <Dropdown onChange={(e) => console.log(e.target.value)}>
                                                    <Dropdown.Toggle variant="primary" class="filterbutton">
                                                        {element.status}
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item onClick={() => changeStatus(element.id, 1)}>Processing</Dropdown.Item>
                                                        <Dropdown.Item onClick={() => changeStatus(element.id, 2)}>Delivered</Dropdown.Item>
                                                        <Dropdown.Item onClick={() => changeStatus(element.id, 3)}>Cancel</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                                : null}
                                            </>

                                        </Accordion.Body>
                                    </div>
                                </Accordion.Item>
                            </Accordion>
                        </>
                    ))}

                </div >
            </div>
        }

        </>
    )
}
