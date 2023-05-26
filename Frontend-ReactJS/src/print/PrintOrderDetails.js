import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { AiOutlinePrinter } from "react-icons/ai";

import { ComponentToPrint } from './ComponentToPrint';
import { useDispatch } from 'react-redux';
import { updateOrderHistory } from '../action/product.action';

const PrintOrderDetails = ({element}) => {

  const dispatch=useDispatch();

const callPrint=()=>{
  dispatch(updateOrderHistory(element))
  setTimeout(handlePrint,50)
}
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div style={{width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
      <div style={{display:"none"}}>
      <ComponentToPrint ref={componentRef} />
      </div>
        <h2 onClick={()=>callPrint()} style={{cursor:"pointer", width:"fit-content"}}><AiOutlinePrinter/></h2>
    </div>
  );
};

export default PrintOrderDetails;