import React, { useEffect, useState } from 'react';
import './FilterProducts.css';
import 'bootstrap/dist/css/bootstrap.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { getCategory } from '../services/services';
import { useDispatch, useSelector } from 'react-redux';
import { updateCategoryList } from '../action/product.action';


export default function FilterProducts({onPress}) {

    const dispatch=useDispatch();

    useEffect(() => {
        getCategory()
            .then((res) => {
                //Printing response on console
                console.log(res)

                //To set category list using useState
                // setCat(res.data)

                // To set Category List using dispatch(Redux)
                dispatch(updateCategoryList(res.data))

            })
            .catch((err) => {
                console.log(err)
                throw err;
            })
    }, [])

    const cat=useSelector(state=>state.product.categoryData)




    return (
                <div class="Filter">
                    <Dropdown onChange={(e)=> console.log(e.target.value)}>
                        <Dropdown.Toggle variant="success" class="filterbutton">
                            Filter Product
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                        <Dropdown.Item onClick={()=>onPress(0)}>All</Dropdown.Item>
                            {cat.map((element,index)=>(
                                <Dropdown.Item key={index} onClick={()=>onPress(element.catId)}>{element.name}</Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            )
}
