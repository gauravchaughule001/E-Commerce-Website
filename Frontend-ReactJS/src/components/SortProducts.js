import React, { useEffect, useState } from 'react';
import './FilterProducts.css';
import 'bootstrap/dist/css/bootstrap.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { getCategory } from '../services/services';
import { useDispatch, useSelector } from 'react-redux';
import { updateCategoryList } from '../action/product.action';


export default function SortProducts({onPress}) {

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
                            Sort Product
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                        <Dropdown.Item onClick={()=>onPress("ASC")}>Price (Low To High)</Dropdown.Item>
                        <Dropdown.Item onClick={()=>onPress("DESC")}>Price (High To Low)</Dropdown.Item>
                        <Dropdown.Item onClick={()=>onPress("NAMEASC")}>Name (Ascending)</Dropdown.Item>
                        <Dropdown.Item onClick={()=>onPress("NAMEDESC")}>Name (Descending)</Dropdown.Item>
                        <Dropdown.Item onClick={()=>onPress("POPULARASC")}>Popularity (High To Low)</Dropdown.Item>
                        <Dropdown.Item onClick={()=>onPress("POPULARDESC")}>Popularity (Low To High)</Dropdown.Item>
                        <Dropdown.Item onClick={()=>onPress(0)}>Clear</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            )
}
