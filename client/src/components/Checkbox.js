import React from "react";
import './Checkbox.css'
function Checkbox(props) {
  const { handleChange, isChecked, id, label } = props;
  return (
    <div>
      <input type="checkbox" id={id} onChange={handleChange} checked={isChecked} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

export default Checkbox;
