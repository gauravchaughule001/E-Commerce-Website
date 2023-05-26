import React, { useEffect, useState } from 'react';
import './home.css';
import { deleteProducts, getProducts, getProductByCatId, getProductsByName, sortProductsByRequirement, findPriceBetween, getProductsPage } from '../services/services';
import { config } from '../config/config';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader'
import Searchbar from '../components/Searchbar';
import Filter from '../components/Filter';
import { useDispatch, useSelector } from 'react-redux';
import { updateCategoryList, updateProducts } from '../action/product.action';
import { AiFillEdit, AiFillFilter, AiOutlineMenu, AiFillDelete, AiFillExclamationCircle } from "react-icons/ai";
import FilterProducts from '../components/FilterProducts';
import SortProducts from '../components/SortProducts';
import { BiGridSmall } from "react-icons/bi";
import SortByPrice from '../components/SortByPrice';
import { Row, Col } from 'react-bootstrap';
import PaginatedItems from '../components/PaginatedItems';
// import PrintComponent from '../print/PrintComponent';
import PrintOrderDetails from '../print/PrintOrderDetails';
import Footer from '../components/Footer';
import { motion } from "framer-motion";
import Clock from '../components/Clock';

export default function Home() {

  // const [product, setProducts] = useState([]);
  let [counter, setCounter] = useState(0);
  const [cat, setCat] = useState([]);
  const [selectedCatId, setSelectedCatId] = useState(0);
  const [loader, setLoader] = useState(false);
  const [confirm, setConfirm] = useState("confirm-window")
  const [flag, setFlag] = useState(0)
  const navigate = useNavigate();
  const [grid, setGrid] = useState(true)
  const [actionBar, setActionBar] = useState(false)
  const [filter, setFilter] = useState(false)


  const dispatch = useDispatch();

  const [totalPages, setTotalPages] = useState(0);
  const [pageNo, setPageNo] = useState(0)
  const [value, setValue] = useState(0);



  // To get data From reducers (state from prod.reducer, product from store, productData from prod.reducer)
  const product_list = useSelector(state => state.product.productData)

  let { loginData } = useSelector(state => state.auth)
  console.log("Login Data Authenticated is", loginData)
  let rollType;
  if (loginData) {
    console.log("Roll Type In loginInfo in App.js is :::", loginData.rollType)
    rollType = loginData.user.roles[0].id;
  }

  // alert(rollType)


  useEffect(() => {
    setFilter(false)
    getProductPages(pageNo);

  }, [counter, pageNo]);

  const onPageChange = (value) => {

    if (value == "prev") {
      if (pageNo > 0) {
        setPageNo(pageNo - 1)
      }
    }
    else if (value == "next") {
      if (pageNo < totalPages - 1) {
        setPageNo(pageNo + 1)
      }
    }
    else if (value == "first") {
      setPageNo(0)
    }
    else if (value == "last") {
      setPageNo(totalPages - 1)
    }
    else {
      if (value < totalPages && value >= 0) {
        setPageNo(value)
      }
    }

  }

  const getProductPages = (pageNo) => {
    setLoader(true)

    getProductsPage(pageNo)
      .then((res) => {
        dispatch(updateProducts(res.data))
        setTotalPages(res.totalPages)
        console.log("Pages Response:::", res)
        setTimeout(setLoader(false), 1000)
      })
      .catch((err) => {
        console.log(err)
        setLoader(false)
        throw err
      }
      )
  }

  const callApi = () => {
    setLoader(true)
    getProducts().then((res) => {
      if (res) {
        // Set products list using useState
        // setProducts(res.data)

        // Set products List using Reducers(Redux)
        dispatch(updateProducts(res.data))
        setLoader(false)
      }
    })
      .catch((err) => {
        console.log(err)
        setLoader(false)
      });
  }



  const deleteProduct = (id) => {
    setLoader(true)
    deleteProducts(id).then(res => {
      if (res) {
        alert("Product Successfully Deleted");
        setCounter(counter + 1)
        setFlag(0)
        setLoader(false)
      }
    })
      .catch((err) => {
        alert("Error in deleting Item")
        setFlag(0)
        throw err;
        setLoader(false)
      });
    callApi()
  }


  const getproductsbycatid = (id) => {

    setFilter(true)

    if (id == 0) {
      setCounter(counter + 1)
    }

    getProductByCatId(id)
      .then(res => {
        if (res) {
          //Printing Response On Console
          // console.log("Products From API Are Here...")

          //Set Filtered Product Using useState
          // setProducts(res.data)

          // Set products List using Reducers(Redux)
          dispatch(updateProducts(res.data))
        }
      })
      .catch((err) => {
        console.log(err)
      });
  }

  const searchproductsbyname = (value) => {
    setFilter(true)
    if (value === null) {
      setCounter(counter + 1)
    }
    else {
      getProductsByName(value.search)
        .then((res) => {
          dispatch(updateProducts(res))
        })
        .catch((err) => {
          console.log(err)
          throw err;
        })
    }
  }


  const sortProducts = (value) => {
    setFilter(true)
    setLoader(true)
    if (value == 0) {
      setCounter(counter + 1)
      setLoader(false)
    }
    sortProductsByRequirement(value)
      .then((res) => {
        console.log(res.data)
        dispatch(updateProducts(res.data))
        setLoader(false)
      })
      .catch((err) => {
        throw err
      })
  }




  const findByPrice = (min, max) => {
    setFilter(true)
    findPriceBetween(min, max)
      .then((res) => {
        dispatch(updateProducts(res.data))
      })
      .catch((err) => {
        throw err
      })
  }


  const trimLine = (string, value) => {
    return string.substring(0, value)
  }


  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i) => {
      const delay = 1 + i * 0.5;
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
          opacity: { delay, duration: 0.01 }
        }
      };
    }
  };


  return (

    <div style={{ paddingTop: 20 }}>






      {loader ?
        <div class="loader-div">
          <Loader />
        </div>
        :
        <>
          <motion.div
            animate={{
              translateX: [1000, 0],
            }}
            transition={{
              duration: 1,
              ease: "easeOut",
              times: [0, 0.2, 0.5, 0.9, 1]
            }}
          >
            <div class="homemain">
              <div class={confirm}>
                <div class="confirm-box">
                  <div class="confirm-message">
                    <h1>
                      <AiFillExclamationCircle />
                    </h1>
                    <h3>Are You Sure Want To Delete This Product?</h3>
                  </div>
                  <div class="actionbtn">
                    <button class="confirm-no" onClick={() => {
                      setConfirm("confirm-window")
                    }}>No</button>
                    <button onClick={() => {
                      deleteProduct(flag)
                      setConfirm("confirm-window")
                    }} class="confirm-yes">Yes</button>
                  </div>
                </div>
              </div>



              <div class="actionbar">
                <Searchbar tempText={"Search Product"} onClick={searchproductsbyname} />
                <div class="bar-list-button-div">
                  {actionBar ?
                    <div class="show-bar-btn" onClick={() => setActionBar(false)}>
                      <div class="filter-logo"><AiFillFilter /></div>Hide Filters </div>
                    :
                    <div class="show-bar-btn" onClick={() => setActionBar(true)}>
                      <div class="filter-logo"><AiFillFilter /></div>Show Filters</div>
                  }
                  <div class="bar-list-button-div">
                    {grid ?
                      <div class="show-bar-btn" onClick={() => setGrid(false)}><AiOutlineMenu /> List View</div> :
                      <div class="show-bar-btn" onClick={() => setGrid(true)}><BiGridSmall /> Grid View</div>
                    }
                  </div>

                </div>

              </div>


              {
                actionBar ?
                  <div class="filter-actions">
                    <Row>
                      <Col><SortByPrice onClick={findByPrice} /></Col>
                      <Col><SortProducts onPress={sortProducts} /></Col>
                      <Col><FilterProducts onPress={getproductsbycatid} /></Col>
                    </Row>
                  </div>
                  :
                  null
              }





              {product_list.length != 0 ?

                <>
                  {!grid ?
                    <table class="ptable">
                      {rollType == 500 ?
                        <tr class="main-tr">
                          <td>Product Image</td>
                          <td>Product Name</td>
                          <td>Product Price</td>
                          {rollType == 500 ?
                            <td colSpan={2}>Actions</td>
                            :
                            <td colSpan={2}>View Product</td>
                          }
                        </tr>
                        : null}
                      {product_list.map((element, index) => (

                        <tr key={index}>
                          <td class="productimage"><img onClick={() => navigate('/productdetails', { state: { product: element } })} src={config.IMAGE_BASE_URL + "" + element.productPhoto} alt="" /></td>
                          <td class="productname">{element.productName}</td>
                          <td class="productprice">{element.productPrice}</td>

                          {rollType == 500 ?
                            <>
                              <td class="editproduct"><button onClick={() => {
                                navigate('/admin/updateproduct', { state: { id: element.productId, prodname: element.productName, product: element } })
                              }}> <AiFillEdit /></button></td>


                              <td class="deleteproduct"><button onClick={() => {
                                setFlag(element.productId)
                                setConfirm("confirm-window-on")
                              }}> <AiFillDelete /></button></td>
                            </>
                            :
                            <td>
                              <button class="viewproductbtn" onClick={() => navigate('/productdetails', { state: { product: element } })}>View Product</button>
                            </td>
                          }
                        </tr>
                      ))}
                    </table>
                    :
                    <>
                      <div class="grid-container">
                        {product_list.map((element, index) => (
                          <>
                            <div class="card" style={{ width: "18rem", margin: "1rem" }}>
                              <img style={{ height: "15rem", width: "15rem", margin: "auto" }} class="card-img-top" alt="" src={config.IMAGE_BASE_URL + "" + element.productPhoto} />
                              <div class="card-body">
                                <h4 class="card-title"> {trimLine(element.productName, 17)}...</h4>
                                <h4 class="card-text">{"\u20b9"}{element.productPrice}</h4>
                                <a href="" onClick={() => navigate('/productdetails', { state: { product: element } })} class="btn btn-primary">View Product</a>
                              </div>
                            </div>
                          </>
                        ))}
                      </div>
                    </>
                  }
                </>
                :
                <>
                  <h1>No Product Found</h1>
                </>
              }
            </div>
          </motion.div>
        </>
      }

      {totalPages > 1 && !filter ?

        <PaginatedItems currentPage={pageNo} totalPages={totalPages} onClick={(e) => {
          onPageChange(e)
        }} />
        :
        null}



      <Footer />


    </div >
  )
}
