import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { config } from '../config/config';
import './home.css';
import { addToCart, getProductByUserId } from '../services/services';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { Button } from 'react-bootstrap';
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

export default function ProductDetails() {

  const { state } = useLocation();
  // const product = state.product;

  const [product, setProduct] = useState([])
  const [cartId, setCartId] = useState(null);
  const [qty, setQty] = useState(1);

  const [loader, setLoader] = useState(false)

  const navigate = useNavigate()

  let pid = state.product.productId;

  let { loginData } = useSelector(state => state.auth)
  console.log("Login Data Authenticated is", loginData)
  let rollType;
  if (loginData) {
    console.log("Roll Type In loginInfo in App.js is :::", loginData.rollType)
    rollType = loginData.user.roles[0].id;
  }

  let userId = useSelector(state => state.auth.loginData.user.id);

  useEffect(() => {
    setLoader(true)
    getProductByUserId(userId, pid)
      .then((res) => {
        setProduct(res.data)
        if (res.data.quantity) {
          setQty(res.data.quantity)
          setLoader(false)
        }
        else {
          setQty(1)
          setLoader(false)
        }
        console.log("Product By User Id Is Here", res.data)
        if (res.data.quantity && res.data.cartId) {
          setCartId(res.data.cartId)
          setLoader(false)
        }
        else {
          setCartId(null)
          setLoader(false)
        }
      })
      .catch((err) => {
        setLoader(false)
        console.log(err)
        throw err

      })
  }, [])

  const validate = () => {

    if (qty > 0) {

      if (pid && qty) {
        callApi()
      }
      else {
        alert("Error At Client Side")
      }
    }
    else {
      alert("Quantity cannot be less than 1")
      setQty(1)
    }
  }

  const callApi = () => {
    setLoader(true)

    let data;
    if (cartId == null) {
      data = {
        userId: userId,
        productId: pid,
        quantity: qty
      }
    }
    else {
      data = {
        productId: pid,
        userId: userId,
        quantity: qty,
        cartId: cartId
      }
    }


    console.log("Cart Saving Data Is Here:::", data)
    addToCart(data)
      .then((res) => {

        console.log(res)
        if (res) {
          alert("Product Successfully Added Into Cart")
          setLoader(false)
        }
      })
      .catch((err) => {
        console.log(err.data)
        setLoader(false)
        throw err
      })


  }




  return (

    <>
      {loader ?
        <Loader />

        :

        <div style={{ marginTop: 100 }} class="details-body">
          <img class="details-img" src={config.IMAGE_BASE_URL + "" + product.productPhoto} />
          <div>
            <h1 style={{ marginTop: 50, color: "black" }}>{product.productName}</h1>
            <p class="pdesc">{product.productDesc}</p>
            <h3 style={{ display: "block" }}>₹{product.productPrice}</h3>
            <div style={{ color: "orange", fontSize:"2rem" }}>
              <AiFillStar onClick={()=>alert("Rated 1")} style={{cursor:"pointer"}} />
              <AiFillStar onClick={()=>alert("Rated 2")} style={{cursor:"pointer"}} />
              <AiFillStar onClick={()=>alert("Rated 3")} style={{cursor:"pointer"}} />
              <AiOutlineStar onClick={()=>alert("Rated 4")} style={{cursor:"pointer"}} />
              <AiOutlineStar onClick={()=>alert("Rated 5")} style={{cursor:"pointer"}} />
            </div>
            <div class="cartdiv">
              {rollType != 500 ?
                <>
                  <input value={qty} type="number" min="1" max="10" onChange={(e) => {
                    setQty(e.target.value)
                  }} />
                  {!product.quantity ?
                    <button onClick={validate} class="addtocart">Add to cart</button> :
                    <button onClick={validate} class="addtocart">Update Cart</button>
                  }

                </>
                :

                <Button onClick={() => {
                  navigate('/admin/updateproduct', { state: { id: product.productId, prodname: product.productName, product: product } })
                }} variant="primary" >Edit Product</Button>
              }


            </div>
          </div>

        </div>


      }

    </>

  )
}
