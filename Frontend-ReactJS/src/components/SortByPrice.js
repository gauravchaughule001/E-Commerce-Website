import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../components/SortByPrice.css';

export default function SortByPrice({ onClick }) {

    const [min, setMin] = useState("")
    const [max, setMax] = useState("")
    const navigate = useNavigate()

    return (

        <div class="sortdiv">
            <div class="sortbar">

                <input class="sortinput1" type="text" value={min} placeholder="Min Price"
                    onChange={(e) => {
                        setMin(e.target.value);
                        if (!e.target.value) {
                            onClick(null);
                            // navigate('/')
                        }

                    }} />
                <input class="sortinput" type="text" value={max} placeholder="Max Price"
                    onChange={(e) => {
                        setMax(e.target.value);
                        if (!e.target.value) {
                            onClick(null);
                            // navigate('/')
                        }
                    }} />

                <div>
                    <button class="sortbutton" onClick={() => onClick(min, max)}>Filter</button>
                </div>
            </div>
            {/* <div class="btn-close-div">
                    <button class="btn-close"/>
                    <div>Close</div>
            </div> */}
        </div>
    )
}

