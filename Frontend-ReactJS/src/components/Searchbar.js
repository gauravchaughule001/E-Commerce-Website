import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../pages/home.css';

export default function Searchbar({ onClick, tempText }) {

    const [searchKey, setSearchKey] = useState("")
    const navigate = useNavigate()

    let data = {}
    return (
        <div class="searchdiv">
            <div class="searchbar">
                <input class="searchinput" type="text" value={searchKey} placeholder={tempText}
                    onChange={(e) => {
                        setSearchKey(e.target.value);
                        if (!e.target.value) {

                            onClick(null,1);
                        }
                    }} />
                {/* <button class="searchbutton" onClick={() => {
                    if (searchKey.length > 0) {
                        onClick(searchKey)
                    }
                }}>Search</button> */}

                <button class="searchbutton" onClick={() => {
                    if (searchKey.length > 0) {
                        data={search:searchKey}
                        onClick(data,1)
                    }
                }}>Search</button>
            </div>
        </div>
    )
}

