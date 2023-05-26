import React, { useEffect, useState } from 'react';
import { updateProduct, getCategory } from '../services/services';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import './css/UpdateProduct.css';

export default function UpdateProduct() {

  const { state } = useLocation();
  const prodname = state.prodname;
  console.log("prod name =>",prodname)
  const id = state.product.productId;
  const productname = state.product.productName;
  const productprice = state.product.productPrice;
  const productdescription = state.product.productDesc;
  const categoryid = state.product.categoryId;




  const [pname, setPname] = useState(productname);
  const [price, setPrice] = useState(productprice);
  const [description, setDescription] = useState(productdescription);
  const [productPic, setProductPic] = useState("");
  const [category, setCategory] = useState([]);
  const [selectedCatId, setSelectedCatId] = useState(categoryid);


  const navigate = useNavigate();

  const validate = (e) => {

    e.preventDefault()
    callApi()
  }

  const callApi = () => {

    let data = new FormData();



    data.append("productName", pname);
    data.append("productPrice", price);
    data.append("productDesc", description);
    data.append("categoryId", selectedCatId);
    data.append("file", productPic);


    updateProduct(data, id)
      .then((res) => {
        if (res) {

          // console.log(res)
          console.log(res.data)
          alert("Product Updated Successfully")
          navigate("/")
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          alert("error")
        }
        else {
          alert("error")
        }
      });

  }

  useEffect(() => {
    getCategory()
      .then(res => {
        if (res) {
          setCategory(res.data)
          console.log(category)
        }
      })
      .catch((err) => {
        console.log(err)
      });
  }, []);

  
  return (

    <div class="outer">
      <h1 style={{color:"black"}} >Update Product</h1>
      <h3>{prodname}</h3>

      <div class="form">

        <input class="registration-inputs"   type="text" value={pname} onChange={(e) => {
          setPname(e.target.value);
        }} placeholder="Enter Product Name" />
        <input class="registration-inputs"   type="text" value={price} onChange={(e) => {
          setPrice(e.target.value);
        }} placeholder="Enter Product Price" />
        <div class="selectdiv">
          <textarea rows={4} cols={40} type="text" value={description} onChange={(e) => {
            setDescription(e.target.value);
          }} placeholder="Enter Product Description" />
        </div>

        <div class="selectdiv" style={{width:"90%"}}>
          <select value={selectedCatId} onChange={(e) => {
            console.log(e.target.value)
            setSelectedCatId(e.target.value)
          }
          }>
            <option value="notselected">Select Product Category</option>
            {category.map((element, index) => (

              <option value={element.catId} key={index}>{element.name}</option>
            ))}
          </select>
        </div>
        <input onChange={(e) => {
          if (e.target.files) {
            setProductPic(e.target.files[0]);
          }
        }} type="file" />

        <button onClick={validate} class="button-main">Update Product</button>

      </div>



    </div>

  )
}
