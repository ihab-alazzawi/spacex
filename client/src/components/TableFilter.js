import React from "react";
import Checkbox from "./Checkbox";
import Refresh from "./Refresh";

const TableFilter = (props) => {
  const {
    handleChange,
    handleRefresh,
    reused,
    with_reddit,
    land_success
  } = props.filterProps;
  return (
    <div className="tbl-header">
      <ul>
        <li>
          <Refresh handleRefresh={handleRefresh} />
        </li>
        <li>
          <Checkbox
            className="checkbox"
            handleChange={handleChange}
            id={"land_success"}
            label="land success"
            isChecked={land_success}
          />
        </li>
        <li>
          <Checkbox
            className="checkbox"
            handleChange={handleChange}
            id={"reused"}
            label={"reused"}
            isChecked={reused}
          />
        </li>
        <li>
          <Checkbox
            className="checkbox"
            handleChange={handleChange}
            id={"with_reddit"}
            label={"with reddit"}
            isChecked={with_reddit}
          />
        </li>
      </ul>
    </div>
  );
};

export default TableFilter;
