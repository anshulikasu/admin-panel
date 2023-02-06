import React, { useState, useEffect } from "react";

import ReactPaginate from "react-paginate";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./Headercolumn.css";
//calendar import
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
// import { Button } from "@material-ui/core";

const HeaderColumn = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [currentPage, setCurrentPage] = useState();
  const [showDatePicker, setDatePicker] = useState(false);
  const [limit, setLimit] = useState();

  useEffect(() => {
    setLoading(true);

    fetch(
      "https://admindevapi.wowtalent.live/api/admin/dashboard/installstatasticlist?fromdate=2022-04-01&todate=2022-08-24&page=1&limit=20"
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

  const handleChange = (event) => {
    setLimit(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const dataFlow = await fetchComments({ limit });
      setData(dataFlow);
    };
    fetchData();
  }, [limit]);

  const fetchComments = async ({ startDate, endDate, currentPage }) => {
    // console.log("fetch comments");
    const URL_CONST = `https://admindevapi.wowtalent.live/api/admin/dashboard/installstatasticlist?${
      startDate ? `fromdate=${startDate}` : "fromdate=2022-04-01"
    }${endDate ? `&todate=${endDate}` : "&todate=2022-08-24"}&page=${
      currentPage ? currentPage : "1"
    }&limit=${limit ? limit : "20"}`;
    console.log(URL_CONST);
    const res = await fetch(
      URL_CONST
      // `https://jsonplaceholder.typicode.com/comments?_page=${currentPage}&_limit=${limit}`
    );
    const data = await res.json();
    console.log(data);
    return data;
  };
  const handlePageClick = async (data) => {
    // console.log(data.selected);
    let currentPage = data.selected + 1;
    setCurrentPage(currentPage);

    const commentsFromServer = await fetchComments({
      currentPage,
    });
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
  const handleSelect = async (date) => {
    setStartDate(date.selection.startDate);
    setEndDate(date.selection.endDate);

    // console.log(typeof startDate);

    console.log(date.selection.startDate, date.selection.endDate);
    // console.log(endDate);
    const dataFromServer = await fetchComments({
      startDate: new Date(date.selection.startDate).toISOString().split("T")[0],
      endDate: new Date(date.selection.endDate).toISOString().split("T")[0],
      currentPage,
    });
    setData(dataFromServer);
  };
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };
  // const handleChange = async (event) => {
  //   console.log(event.target);
  //   setLimit(event.target.value);
  //   const dataFlow = await fetchComments({
  //     limit,
  //   });
  //   setData(dataFlow);

  //   console.log("value is:", event.target.value);
  // };

  return (
    <div>
      <div className="nav-pnl">
        <div className="button">
          <span>Show</span>
          <input
            className="button-sub"
            type="text"
            id="message"
            name="message"
            onChange={handleChange}
            value={limit}
            autoComplete="off"
          />
        </div>

        <div className="calendar-d">
          <button
            className="button-cl"
            onClick={() => setDatePicker(!showDatePicker)}
          >
            {showDatePicker ? "Hide Calendar" : "Show Calendar"}
          </button>
          {showDatePicker && (
            <DateRangePicker
              ranges={[selectionRange]}
              onChange={handleSelect}
            />
          )}
        </div>
      </div>
      <div className="main-table">
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
                {/* {console.log(typeof item.created_At)} */}
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
    </div>
  );
};

export default HeaderColumn;
