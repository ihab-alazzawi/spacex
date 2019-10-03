import React from "react";
import refresh from "../assets/images/refresh.svg";
import "./Refresh.css";

function Refresh({handleRefresh}) {
  return (
    <div>
      <button onClick={handleRefresh} className="refresh-btn">
        <img className="refresh-img" src={refresh} alt="" width='20px' height='20px'/>
      </button>
    </div>
  );
}

export default Refresh;
