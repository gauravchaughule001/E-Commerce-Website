import React, { useEffect, useState } from 'react';
import './FilterProducts.css';
import 'bootstrap/dist/css/bootstrap.css';
import Dropdown from 'react-bootstrap/Dropdown';


export default function SortOrderByStatus({onPress, status}) {

    return (
                <div class="Filter">
                    <Dropdown onChange={(e)=> console.log(e.target.value)}>
                        <Dropdown.Toggle variant="success" class="filterbutton">
                            {status}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                        <Dropdown.Item onClick={()=>onPress(0)}>All</Dropdown.Item>
                        <Dropdown.Item onClick={()=>onPress("Pending",3)}>Pending</Dropdown.Item>
                        <Dropdown.Item onClick={()=>onPress("Processing",3)}>Processing</Dropdown.Item>
                        <Dropdown.Item onClick={()=>onPress("Delivered",3)}>Delivered</Dropdown.Item>
                        <Dropdown.Item onClick={()=>onPress("Cancelled",3)}>Cancelled</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            )
}
