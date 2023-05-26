import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './css/Homepage.css'
import MyCarousal from '../components/MyCarousal';
import { getCategory, getCategoryHomePage, getProducts, getProductsHomePage, updateProduct } from '../services/services';
import { config } from '../config/config';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { updateCategoryList, updateProducts } from '../action/product.action';
import LoginModal from '../components/LoginModal';

export default function HomePage() {

    // const [cat, setCat] = useState([])

    const navigate = useNavigate()

    const [counter, setCounter] = useState(0)


    const dispatch = useDispatch()
    const rollId = useSelector(state => state.auth)
    console.log(rollId)

    const loginInfo = useSelector(state => state.auth.loginData)
    console.log("LOGIN_DATA_IS:::", loginInfo)


    //Getting Category Saved in redux
    const cat = useSelector(state => state.product.categoryData)
    console.log(cat)
    const products = useSelector(state => state.product.productData)
    console.log(products)


    useEffect(() => {
        getCategoryHomePage()
            .then((res) => {
                // Setting Category in redux
                dispatch(updateCategoryList(res.data))
            })
            .catch((err) => {
                console.log(err)
                throw err
            })

            getProductsHomePage().then((res) => {
            if (res) {
                // Set products list using useState
                // setProducts(res.data)

                // Set products List using Reducers(Redux)
                dispatch(updateProducts(res.data))
            }
        })
            .catch((err) => {
                console.log(err)
            });

    }, [rollId])

    return (
        <div class="homepage-body">

            <MyCarousal />

            <div class="products-category">
                <h3>Shop By Category</h3>
                <div class="overflow-auto category-div">
                    {cat.length > 0 ?
                        cat.map((element) => (
                            <div class="category-items">
                                {element.name.substring(0, 17)}
                                <img src={config.IMAGE_BASE_URL + "" + element.photo} alt="" />
                                <div class="view-btn">View</div>
                            </div>
                        ))
                        :
                        <>
                            <div class="category-items">Laptops</div>
                            <div class="category-items">TV</div>
                            <div class="category-items">Earphones</div>
                            <div class="category-items">Chargers</div>
                        </>
                    }
                </div>
            </div>
            <div class="products-main">
                <h3 class="product-heading">Buy Trending One's</h3>
                <h4 class="trending-header">Buy Now</h4>
                <div class="products-div">
                    {products.map((element, index) => (
                        <>

                            {/* Trending items (New items added in product list shown here) */}
                            {index>products.length-4?

                                <div class="product-div-dis">
                                    <div key={element._id} class="product-item" style={{ width: 280, margin: 20, marginBottom: 20 }}>
                                        <div key={element._id} >
                                            <img alt="" src={config.IMAGE_BASE_URL + "" + element.productPhoto}

                                                class="product-image" />
                                            <h4>{element.productName.substring(0, 17)}...</h4>
                                            <h2>
                                                {"\u20b9"}
                                                {element.productPrice}
                                            </h2>
                                        </div>
                                    </div>
                                </div>

                                : null

                            }
                        </>
                    ))}
                </div>
                {/* <iframe style={{ height: "50vh", width: "50vw", margin: "auto" }} src="https://media.w3.org/2010/05/sintel/trailer.mp4" autoplay title="description"></iframe> */}


            </div>



            <Footer />

        </div>
    )
}
