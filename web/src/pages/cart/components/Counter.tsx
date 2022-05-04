
import React from "react";

function Counter() {
  return (
    <div>
      <div className="counter flex items-center text-2xl justify-start">
        Quantity
        <div className="ml-5 shadow-md flex">
        <div className="bg-[#000] text-white w-8 flex items-center justify-center cursor-pointer pb-1">
          -
        </div>
        <div className="w-8 flex items-center justify-center border-[2px] border-[#000]">
          1
        </div>
        <div className="bg-[#000] text-white w-8 flex items-center justify-center cursor-pointer pb-1">
          +
        </div>
        </div>
      </div>
    </div>
  );
}

export default Counter;