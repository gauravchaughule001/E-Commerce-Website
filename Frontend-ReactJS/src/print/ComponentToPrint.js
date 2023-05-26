import React, { forwardRef } from "react";
import Sample from "./Sample";

export const ComponentToPrint = forwardRef((props, ref) => {
    return (
      <div ref={ref}>
            <div>
            <Sample/>
            </div>
        
        </div>
    );
  });