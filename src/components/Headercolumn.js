import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ReactPaginate from "react-paginate";
// import Card from "@material-ui/core/Card";
// import CardContent from "@material-ui/core/CardContent";
// import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const HeaderColumn = () => {
  // const classes = useStyles();
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
  const fetchComments = async (currentPage) => {
    const res = await fetch(
      `https://admindevapi.wowtalent.live/api/admin/dashboard/installstatasticlist?fromdate=2022-04-01&todate=2022-08-24&page=${currentPage}&limit=10`
      // `https://jsonplaceholder.typicode.com/comments?_page=${currentPage}&_limit=${limit}`
    );
    const data = await res.json();
    return data;
  };
  const handlePageClick = async (data) => {
    console.log(data.selected);

    let currentPage = data.selected + 1;

    const commentsFormServer = await fetchComments(currentPage);

    setData(commentsFormServer);
    // scroll to the top
    //window.scrollTo(0, 0)
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
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
        <tbody>
          {data.data.data.map((item) => (
            <tr key={item.created_At}>
              <td>{item.created_At}</td>
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
        // pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        // containerClassName={"pagination justify-content-center"}
        // pageClassName={"page-item"}
        // pageLinkClassName={"page-link"}
        // previousClassName={"page-item"}
        // previousLinkClassName={"page-link"}
        // nextClassName={"page-item"}
        // nextLinkClassName={"page-link"}
        // breakClassName={"page-item"}
        // breakLinkClassName={"page-link"}
        // activeClassName={"active"}
      />
    </div>
  );
};

export default HeaderColumn;
