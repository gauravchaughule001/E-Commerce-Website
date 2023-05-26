import React, { useEffect, useState } from 'react'
import { getCategory } from '../services/services';
import { useDispatch, useSelector } from 'react-redux';
import { updateCategoryList } from '../action/product.action';

export default function Filter({ onPress, onChange}) {

    const [selectedCatId, setSelectedCatId] = useState(0);
    // const [cat, setCat] = useState([]);

    const dispatch=useDispatch();
    const cat=useSelector(state=>state.product.categoryData)


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




    return (


        <div class="selectdiv2">
            <select class="selectfilter" onChangeCapture={() => onChange()} value={selectedCatId} onChange={(e) => {
                // setCounter(counter + 1)
                console.log(e.target.value)
                setSelectedCatId(e.target.value)
            }
            }>
                <option value={0}>All</option>
                {cat.map((element, index) => (
                    <option style={{backgroundColor:"black",color:"white"}} value={element.catId} key={index} >{element.name}</option>
                ))}
            </select>
            {selectedCatId != 0 ?
                <button class="filterbutton"
                 onClick={() => {
                    onPress(selectedCatId)
                }}
                >Apply</button> :
                <button class="filterbutton">Filter</button>
            }
        </div>

    )
}
