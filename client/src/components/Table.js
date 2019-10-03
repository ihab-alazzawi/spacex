import React from "react";
import link from "../assets/images/link.svg";
import "./Table.css";
import TableFilter from "./TableFilter";
import moment from "moment";

const Table = ({
  rockets,
  handleChange,
  handleRefresh,
  reused,
  with_reddit,
  land_success,
  isLoading
}) => {
  if (isLoading) {
    return <p>...Loading</p>;
  }
  return (
    <div>
      <TableFilter
        filterProps={{
          handleRefresh,
          handleChange,
          reused,
          with_reddit,
          land_success
        }}
      />
      <div className="table">
        <table cellPadding="0" cellSpacing="0" border="0">
          <thead>
            <tr className="bottom-head">
              <th>Badge</th>
              <th>Rocket Name</th>
              <th>Rocket Type</th>
              <th>Launch Date</th>
              <th>Details</th>
              <th>ID</th>
              <th>Article</th>
            </tr>
          </thead>
          <tbody className="tbl-content">
            {rockets &&
              rockets.map(r => {
                return (
                  <tr key={r._id}>
                    <td>
                      <img
                        src={r.links.mission_patch_small}
                        alt=""
                        width="30px"
                        height="30px"
                      />
                    </td>
                    <td>{r.rocket.rocket_name}</td>
                    <td>{r.rocket.rocket_type}</td>
                    <td>
                      {moment.unix(r.launch_date_unix).format("MM/DD/YYYY")}
                    </td>
                    <td className="truncate">{r.details}</td>
                    <td>{r.flight_number}</td>
                    <td>
                      <a
                        href={r.links.article_link}
                        target="_blank"
                        rel="noopener noreferrer">
                        <img src={link} alt="" width="30px" height="30px" />
                      </a>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
