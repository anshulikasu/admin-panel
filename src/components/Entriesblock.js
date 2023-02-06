import React, { useState, useEffect } from "react";

import ReactPaginate from "react-paginate";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./Headercolumn.css";
//calendar import
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";

const HeaderColumn = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch(
      "https://admindevapi.wowtalent.live/api/admin/dashboard/installstatasticlist?fromdate=2022-04-01&todate=2022-08-24&page=1&limit=10"
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        console.log(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);
  const fetchComments = async (startDate, endDate, currentPage) => {
    const res = await fetch(
      `https://admindevapi.wowtalent.live/api/admin/dashboard/installstatasticlist?fromdate=${startDate}&todate=${endDate}&page=${currentPage}&limit=10`
      // `https://jsonplaceholder.typicode.com/comments?_page=${currentPage}&_limit=${limit}`
    );
    const data = await res.json();
    return data;
  };
  const handlePageClick = async (data) => {
    console.log(data.selected);
    let currentPage = data.selected + 1;

    const commentsFromServer = await fetchComments(currentPage);
    setData(commentsFromServer);
    // scroll to the top
    // window.scrollTo(0, 0)
  };
  const changeFormat = (data) => {
    const date = new Date(data);

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const simpleFormat = date.toLocaleDateString("en-US", options);
    return simpleFormat;
  };

  if (loading) {
    return <CircularProgress />;
  }
  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  };
  return (
    <div className="main-table">
      <DateRangePicker ranges={[selectionRange]} onChange={this.handleSelect} />
      <table className="base-table">
        <thead className="table-header">
          <tr className="table-headerrow">
            <th>Date</th>
            <th>iOS Installs</th>
            <th>Android Installs</th>
            <th>iOS Uninstalls</th>
            <th>Android Uninstalls</th>
            <th>Total Installs</th>
            <th>Total Uninstalls</th>
            <th>iOS Churn</th>
            <th>Android Churn</th>
            <th>Total Churn</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {data.data.data.map((item) => (
            <tr key={item.created_At}>
              <td>{changeFormat(item.created_At)}</td>
              {console.log(typeof item.created_At)}
              <td>{item.ios_install}</td>

              <td>{item.android_install}</td>
              <td>{item.ios_uninstall}</td>
              <td>{item.android_uninstall}</td>
              <td>{item.totalinstall}</td>
              <td>{item.totaluninstall}</td>
              <td>{item.ios_churn}</td>
              <td>{item.android_churn}</td>
              <td>{item.totalchurn}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={12}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-end"}
        pageClassName={"page-item bg-dark"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default HeaderColumn;
