import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import './Pagination.css';

export default function PaginatedItems({ onClick, totalPages, currentPage }) {

    const[value,setValue]=useState("")


    let arr = [];

    for (let i = 0; i < totalPages; i++) {
        arr.push(i)
    }


    return (
        <>
            <ul class="pagination pagination-sm justify-content-center mt-4">
                <li class="page-item" style={{ cursor: "pointer" }} onClick={() => onClick(0)}><div class="page-no">First</div></li>
                <li class="page-item" style={{ cursor: "pointer" }} onClick={() => onClick("prev")}><div class="page-no"><AiOutlineArrowLeft /></div></li>
                {arr.map((element, index) => (
                    <>{currentPage > index - 2 && currentPage < index + 2 ?
                        <>{index == currentPage ?
                            <li class="page-item" key={index} style={{ cursor: "pointer" }} onClick={() => onClick(index)}><div class="currentPage">{index + 1}</div></li>
                            :
                            <li class="page-item" key={index} style={{ cursor: "pointer" }} onClick={() => onClick(index)}><div class="page-no">{index + 1}</div></li>
                        }
                        </>
                        : null
                        }
                    </>
                ))

                }
                <li class="page-item" style={{ cursor: "pointer" }} onClick={() => onClick("next")}><div class="page-no"><AiOutlineArrowRight /></div></li>
                <li class="page-item" style={{ cursor: "pointer" }} onClick={() => onClick(totalPages-1)}><div class="page-no">Last</div></li>

            </ul>
            <div class="input-div">
                <input class="page-input" onChange={(e)=>{
                    setValue(e.target.value)
                }} type="numeric"  placeholder='Jump to page'/><button onClick={()=>{
                    
                    if(value-1>totalPages-1){
                        alert("Enter Valid Page No")
                    }else{
                        onClick(value-1)
                    }
                    
                    }} class="Go-btn">Go</button>
            </div>
        </>
    );
}