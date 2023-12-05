import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Box from "@mui/material/Box";
import Navbar from "../../components/Navbar/Navbar";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import CircularProgress from "@mui/material/CircularProgress";

function Product() {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState([]);
  const [filteredRowData, setFilteredRowData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterModel, setFilterModel] = useState({
    category: { type: "set", values: [] },
    price: null,
  });

  // Helper function to get unique values for a specific column
  const getUniqueValues = (data, field) => {
    return [...new Set(data.map((item) => item[field]))];
  };

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setRowData(data);
        setFilteredRowData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const imageRenderer = (params) => {
    return params.value
      ? `<img src="${params.value}" alt="Product Image" style="width: 50px; height: 50px;" />`
      : null;
  };

  const colDefs = [
    { field: "id", headerName: "ID", resizable: false, suppressMovable: true },
    { field: "image", headerName: "Image", cellRenderer: imageRenderer },
    { field: "title", headerName: "Title", suppressMovable: true },
    { field: "price", headerName: "Price", filter: "agNumberColumnFilter" },
    {
      field: "category",
      headerName: "Category",
      filter: "agSetColumnFilter",
      filterParams: { values: getUniqueValues(rowData, "category") },
    },
    { field: "description", headerName: "Description" },
  ];

  const gridOptions = {
    pagination: true,
    paginationPageSize: 11,
    autoSizeStrategy: {
      type: "fitGridWidth",
      columnLimits: [
        {
          colId: "id",
          maxWidth: 50,
        },
      ],
    },
  };

  const searchStyle = {
    width: "100%",
    padding: "10px 20px",
    borderRadius: 5,
    outline: 0,
    border: "2px #dfdfdf solid",
    fontSize: "100%",
  };

  // const filterDivStyle = { paddingBottom: 10, display: "flex" };
  // const filterStyle = {
  //   marginRight: 20,
  //   padding: "10px 20px",
  //   borderRadius: 5,
  //   outline: 0,
  //   border: "2px #dfdfdf solid",
  //   fontSize: "100%",
  // };

  function onGridReady(params) {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  }

  const onFilterTextChange = (e) => {
    gridApi.setQuickFilter(e.target.value);
  };

  // const onCategoryFilterChange = (e) => {
  //   const selectedCategory = e.target.value;
  //   const newFilteredRowData = selectedCategory
  //     ? rowData.filter((item) => item.category === selectedCategory)
  //     : rowData;

  //   setFilterModel({
  //     ...filterModel,
  //     category: {
  //       type: "set",
  //       values: selectedCategory ? [selectedCategory] : [],
  //     },
  //   });

  //   setFilteredRowData(newFilteredRowData);
  // };

  return (
    <>
      <Navbar />
      <Box height={35} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
          }}
        >
          <div className="flex">
            <h1>PRODUCTS</h1>
            <div>
              <input
                type="search"
                style={searchStyle}
                onChange={onFilterTextChange}
                placeholder="Search ..."
              />
            </div>
          </div>
          {/* <div style={filterDivStyle}>
            <select style={filterStyle} onChange={onCategoryFilterChange}>
              <option value="">All Categories</option>
              {getUniqueValues(rowData, "category").map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div> */}
          {loading ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress size={60} style={{ color: "grey" }} />
            </div>
          ) : (
            <div
              className="ag-theme-quartz"
              style={{ height: 561, width: "100%" }}
            >
              <AgGridReact
                onGridReady={onGridReady}
                gridOptions={gridOptions}
                rowData={filteredRowData}
                columnDefs={colDefs}
                domLayout="autoHeight"
              />
            </div>
          )}
        </Box>
      </Box>
    </>
  );
}

export default Product;
