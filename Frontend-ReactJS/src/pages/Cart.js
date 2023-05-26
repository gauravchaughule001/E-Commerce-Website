import React, { useEffect, useState } from 'react'
import { deleteCartItem, getCartItems, getCartProducts } from '../services/services';
import { useDispatch, useSelector } from 'react-redux';
import { updateCartData } from '../action/product.action';
import { config } from '../config/config';
import { AiFillDelete, AiOutlineDoubleRight } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

export default function Cart() {

  // const [product, setProduct] = useState([]);
  const [counter, setCounter] = useState(0);
  const [loader, setLoader] = useState(false)

  const navigate = useNavigate()

  const dispatch = useDispatch()
  const product = useSelector(state => state.product.cartData)

  console.log("Products are::::",product)

  useEffect(() => {
    setLoader(true)
    getCartProducts()
      .then((res) => {
        console.log("Cart Items Here ::: ", res)
        dispatch(updateCartData(res.data))
        setLoader(false)
      })
      .catch((err) => {
        console.log(err)
        setLoader(false)
        throw err;
      })
  }, [counter]);


  const removeItem = (id) => {
    setLoader(true)
    deleteCartItem(id).then(res => {
      if (res) {
        alert("Product Successfully Removed From cart");
        setLoader(false)
        setCounter(counter => counter + 1)
      }
    })
      .catch((err) => {
        setLoader(false)
        throw err
      });
  }


  const getCartPrice = (product) => {
    let init = 0;
    product.map((element) => (
      init = init + (element.productPrice * element.quantity)
    ))
    console.log("Total of cart items is" + init)

    var res = init.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return res
  }

  return (


    <>
      {loader ?
        <Loader />

        :


        <>
          {product.length > 0 ?
            <>
              <h1>Total : {getCartPrice(product)}</h1>
              {product.length > 0 ?
                <div class="checkout-div">
                  <button class="checkout" onClick={() => navigate('/checkout')}>Checkout <AiOutlineDoubleRight /></button>
                </div>
                : null}

              <table style={{width:'95%',margin:'auto'}}>
                <tr class="main-tr">
                  <td>Product ID</td>
                  <td>Product Image</td>
                  <td>Product Name</td>
                  <td>Product Price</td>
                  <td>Quantity</td>
                  <td>Category</td>
                  <td>Action</td>
                </tr>
                {product.map((element, index) => (

                  <tr key={index}>
                    <td class="productname">{element.productId}</td>
                    <td class="productdesc"><img src={config.IMAGE_BASE_URL + "" + element.productPhoto} alt="" /></td>
                    <td class="productprice">{element.name}</td>
                    <td class="productprice">{element.productPrice}</td>
                    <td class="productprice">{element.quantity}</td>
                    <td class="productprice">{element.category}</td>
                    <td class="deleteproduct"><button onClick={() => {
                      removeItem(element.cartId)
                    }}><AiFillDelete /></button></td>
                  </tr>

                ))}
              </table>









                    {/*           GRID VIEW           */}


              {/* <h1>Products Saved in Cart</h1>
              <div class="grid-container-cart">
                {product.map((element, index) => (
                  <>

                    <div key={element.productId} className="item grid-item-cart">
                      <div key={element.productId} >
                        <img alt="" src={config.IMAGE_BASE_URL + "" + element.productPhoto}

                          class="itemimage-cart" />
                        <h4>{element.name}</h4>
                        <h2>
                          {"\u20b9"}
                          {element.productPrice}
                        </h2>
                        <h4>Quantity:{element.quantity}</h4>
                        <button class="viewproductbtn" onClick={() => navigate('/productdetails', { state: { product: element } })}>View Product</button>
                      </div>
                    </div>
                  </>
                ))}
              </div> */}




            </>

            :

            <div class="cart-empty-div">
              <img src={require('../Images/Dog.jpg')} alt="Image" />
              <h1>Your Cart Is Empty!</h1>
              <button onClick={() => navigate('/')}>Go To Home</button>
            </div>

          }
        </>
      }
    </>
  )
}
