import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
// import './components/SortByPrice.css';

export default function SortByDate({ onClick }) {

    const [from, setFrom] = useState("0000-00-00")
    const [to, setTo] = useState("0000-00-00")
    const navigate = useNavigate()


    let data;

    return (

        <div class="sortdiv">
            <div class="sortbar">

                <input class="sortinput1" type="Date" value={from} placeholder="From"
                    onChange={(e) => {
                        setFrom(e.target.value);
                        if (!e.target.value) {
                            onClick(null);
                            // navigate('/')
                        }

                    }} />
                <input class="sortinput" type="Date" value={to} placeholder="To"
                    onChange={(e) => {
                        setTo(e.target.value);
                        if (!e.target.value) {
                            onClick(null);
                            // navigate('/')
                        }
                    }} />

                <div className='d-flex align-items-center'>
                    {/* <button class="sortbutton" onClick={() => onClick(to.replaceAll("-", "/"), from.replaceAll("-", "/"))}>Filter</button> */}
                    <button class="sortbutton" onClick={() => {

                        data = {
                            from: from,
                            to: to
                        }

                        onClick(data, 2)

                    }}>Filter</button>
                </div>
            </div>
        </div>
    )
}