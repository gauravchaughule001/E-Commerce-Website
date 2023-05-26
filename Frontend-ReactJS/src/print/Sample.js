import React from 'react'
import { Row,Col } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { IoMdCart } from "react-icons/io";
export default function Sample() {
    const element=useSelector(state=>state.product.orderData)
    const rollType=useSelector(state=>state.auth.loginData.rollType)
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
    if(element.length==0){
        <h1>No data available</h1>
    }
else{
    return (
        <div class="bill-main">
            <h1><IoMdCart />ShopEasy.com</h1>
        <div class="orderdiv-bill" style={{ marginBottom: 30 }}>
                        <div class="orderer-bill">
                            <Row>
                                <Col><p>Name: {element.customerName}</p></Col>
                            </Row>
                            <Row>
                                <Col><p>Email: {element.customerEmail}</p></Col>
                            </Row>
                            <Row>
                                <Col><p>Mobile: {element.customerMobile}</p></Col>
                            </Row>
                            <Row>
                                <Col><p>Order Id: {element.id}</p></Col>
                            </Row>
                            <Row>
                                <Col><p>Total Price: ₹{getTotalPrice(element)}</p></Col>
                            </Row>
                            <Row>
                                <Col> <p>Order Date: {(new Date(element.lastUpdated)).toLocaleDateString()}</p></Col>
                            </Row>
                        </div>
                        <hr />
                        <Row>
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
<Row>
    <Col aria-colspan={4}>Total :{getTotalPrice(element)}</Col>
</Row>
                    </div>

        <h4>Electronic Bill : Does Not Requires Validation</h4>
    </div>
    )
}
}