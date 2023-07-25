import React from "react";

const TableSearch = ({ column, filter_data, onChange, value, data }) => {
  let d = filter_data?.length > 0 ? true : false
  if (!d) {
    if (data?.type === "date") {
      return (
        <input
          type="date"
          className="tableHeadSearch"
          name={column}
          onChange={onChange}
          value={value}
        />
      );
    } else {
      return (
        <input
          type="search"
          className="tableHeadSearch"
          size="15"
          name={column}
          onChange={onChange}
          value={value}
        />
      );
    }

  } else {
    return (
      <select
        className="tableHeadSearch"
        name={column}
        onChange={onChange}
        value={value}
        style={{ width: "140px" }}
      >
        <option value="">All</option>
        {filter_data?.length && filter_data.map((el) => (
          <option key={el.id} value={el.id}>
            {el.name}
          </option>
        ))}
      </select>
    );
  }
};

export default TableSearch;
