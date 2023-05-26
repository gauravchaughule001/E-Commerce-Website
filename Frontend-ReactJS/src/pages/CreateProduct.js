import React, { useEffect, useState } from 'react';
import '../pages/css/Registration.css';
import { createProduct, getCategory, updateProduct } from '../services/services';
import { useLocation, useNavigate } from 'react-router-dom';


export default function CreateProduct() {

  const [pname, setPname] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [productPic, setProductPic] = useState("");
  const [category, setCategory] = useState([]);
  const [selectedCatId, setSelectedCatId] = useState("");

  const navigate = useNavigate();

  const setDefault=()=>{
    setPname("")
    setPrice("")
    setDescription("")
    setProductPic("")
    setSelectedCatId("")
  }

  const validate = (e) => {

    e.preventDefault()
    if (pname && price && description && selectedCatId != "notselected" && productPic) {
      callApi()
    }
    else {
      alert("Please Enter All Details")
    }
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


  const callApi = () => {

    let data = new FormData();
    // data.append("categoryId", catId);
    data.append("categoryId", selectedCatId)
    data.append("productName", pname);
    data.append("productPrice", price);
    data.append("productDesc", description);
    data.append("file", productPic);



    createProduct(data)
      .then((res) => {
        if (res) {

          // console.log(res)
          console.log(res.data)
          alert("Product Successfully Added")
          setDefault()
          // navigate("/")
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





  return (
    <div class="outer">


      <div class="form">
      <h1 style={{color:"black"}} >Add New Product</h1>

        <input class="registration-inputs"  type="text" value={pname} onChange={(e) => {
          setPname(e.target.value);
        }} required placeholder="Enter Product Name" />
        <input class="registration-inputs"  type="text" value={price} onChange={(e) => {
          setPrice(e.target.value);
        }} required placeholder="Enter Product Price" />
        {/* <input type="text" value={description} onChange={(e) => {
          setDescription(e.target.value);
        }} required placeholder="Enter Product Description" /> */}


        <div class="selectdiv">
          <textarea rows={4} cols={40} value={description} onChange={(e) => {
            setDescription(e.target.value);
          }} required placeholder="Enter Product Description" />
        </div>

        <div class="selectdiv">
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

        <button onClick={validate} class="registerbtn button-main">Add Product</button>

      </div>

    </div>
  )
}
