
import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import Loader from "../components/Loader";
import { placeOrder, getCartProducts, placeOrderMail } from "../services/services";
import { updateCartData } from '../action/product.action';
import EmailBody from "../Email/EmailBody";
export default function Checkout() {

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const authState = useSelector(state => state.auth)
  // const cartItems = authState.cart
  const dispatch = useDispatch()
  const [loader, setLoader] = useState(false)


  let { loginData } = useSelector(state => state.auth)
  let rollType;
  if (loginData) {
    console.log("Roll Type In loginInfo in App.js is :::", loginData.rollType)
    rollType = loginData.rollType;
  }

  const cartItems = useSelector(state => state.product.cartData)


  let userId = loginData.user.id;

  useEffect(() => {
    
    setLoader(true)
    getCartProducts()
      .then((res) => {
        dispatch(updateCartData(res.data))
        console.log("Login Data Is ::: ",loginData)
        setName(loginData.user.firstName+" "+loginData.user.lastName)
        setEmail(loginData.user.email)
        setMobile(loginData.user.mobileNumber)
        setLoader(false)
        
      })
      .catch((err) => {
        console.log(err)
        setLoader(false)
        throw err;
      })
  }, [])

  const totalAmt = () => {
    const sum = cartItems.reduce((total, element) => total + element.price, 0);
    return sum;
  };

  const onChangeInputValue = (e, type) => {
    let value = e.target.value;
    if (type === "NAME") {
      setName(value);
    } else if (type === "MOBILE") {
      setMobile(value);
    } else if (type === "EMAIL") {
      setEmail(value);
    } else if (type === "ADDRESS") {
      setAddress(value);
    }
  };

  const placeOrderItems = () => {
    setLoader(true)
    var order_items = cartItems.map((element) => {
      return {
        imageUrl: element.productPhoto,
        quantity: element.quantity,
        name: element.name,
        price: element.productPrice,
        product_id: element.productId,
        totalAmount: totalAmt()
      };
    });

    if (name && email && address && mobile) {
      let params = {
        customerName: name,
        customerAddress: address,
        customerMobile: mobile,
        customerEmail: email,
        orderItems: order_items,
      };

      console.log("#################################")
      console.log(params)

      placeOrder(params)
        .then((res) => {

          console.log(res)
          if (res.msg == "Order placed successfully") {
            // placeOrderSendMail(res.data)
          }
          alert("order placed successfully")
          setLoader(false)
          navigate("/");
        })
        .catch((err) => {
          if (err) {
            console.log(err)
          setLoader(false)
          }
        });
    }
  };

  const placeOrderSendMail = (data) => {
    let mailData = {
      recipient: data.customerEmail,
      msgBody: "",
      subject: "Order Placed",
      customerName:data.customerName,
      totalAmount:totalAmt()
    }

    console.log("Mail Data Is :::", mailData)
    placeOrderMail(mailData)
      .then((res) => {
        console.log("Mail Sent Successfully", res)
      })
      .catch((err) => {
        console.log(err)
        throw err
      })


  }

  return (

    <div style={{ padding: 40 }}>

      {loader ?
        <Loader />
        :
        <>


          {cartItems && cartItems.length > 0 ? (
            <><div style={{marginTop:30}}>
              <Row>
                <Col>Title</Col>
                <Col>Price</Col>
                <Col>Quantity</Col>
                <Col>Sub Total</Col>
              </Row>
              <hr />
              {cartItems.map((element, index) => (
                <Row key={index} style={{ height: 50 }}>
                  <Col>{element.name}</Col>
                  <Col>
                    {"\u20b9"}
                    {element.productPrice}
                  </Col>
                  <Col>{element.quantity}</Col>
                  <Col>
                    {"\u20b9"}
                    {element.quantity * element.productPrice}
                  </Col>
                </Row>
              ))}

              <hr />
              <Row style={{ height: 50 }}>
                <Col md={9} sm={9} xl={9}></Col>

                <Col
                  md={3}
                  sm={3}
                  xl={3}
                  className="d-flex justify-content-start"
                >
                  Total:{" "}
                  <b>
                    {" "}
                    {"\u20b9"}
                    {totalAmt()}
                  </b>
                </Col>
              </Row>
              <p>Delivey Information</p>
              <hr />
              <Row style={{ marginBottom: 20 }}>
                <Col md={6}>
                  <label>Name</label>
                  <input
                    value={name}
                    onChange={(e) => onChangeInputValue(e, "NAME")}
                    placeholder="Enter Name"
                    style={{ width: "100%" }}
                  />
                </Col>
                <Col md={6} >
                  <label>Mobile</label>
                  <input
                    value={mobile}
                    onChange={(e) => onChangeInputValue(e, "MOBILE")}
                    placeholder="Enter Mobile"
                    style={{ width: "100%" }}
                  />
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <label>Email Id</label>
                  <input
                    value={email}
                    onChange={(e) => onChangeInputValue(e, "EMAIL")}
                    placeholder="Enter Email Id"
                    multiple={true}
                    style={{ width: "100%" }}
                  />
                </Col>
                <Col md={6}>
                  <label>Delivery Address</label>
                  <input
                    value={address}
                    onChange={(e) => onChangeInputValue(e, "ADDRESS")}
                    placeholder="Enter Delivery Address"
                    multiple={true}
                    style={{ width: "100%" }}
                  />
                </Col>
              </Row>

              <center>

                <button class="checkout" onClick={placeOrderItems}>Place Order</button>

              </center>
              </div>
            </>
          ) : (
            <h1 class="d-flex justify-content-center">Data not found</h1>
          )}

        </>
      }

    </div>
  );
}
