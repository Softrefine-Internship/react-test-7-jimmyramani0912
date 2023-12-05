import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Box from "@mui/material/Box";
import Navbar from "../../components/Navbar/Navbar";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import CircularProgress from "@mui/material/CircularProgress";

function Users() {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("https://fakestoreapi.com/users")
      .then((response) => response.json())
      .then((data) => {
        setRowData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const [colDefs, setColDefs] = useState([
    {
      field: "id",
      headerName: "ID",
      resizable: false,
      suppressMovable: true,
    },
    {
      field: "name",
      headerName: "Name",
      suppressMovable: true,
      valueGetter: (params) =>
        `${params.data.name.firstname} ${params.data.name.lastname}`,
    },
    { field: "username", headerName: "Username" },
    { field: "email", headerName: "Email" },
    { field: "phone", headerName: "Phone" },
  ]);

  const gridOptions = {
    pagination: true,
    paginationPageSize: 11,
    autoSizeStrategy: {
      type: "fitGridWidth",
      columnLimits: [
        {
          colId: "id",
          maxWidth: 80,
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

  function onGridReady(params) {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  }

  const onFilterTextChange = (e) => {
    gridApi.setQuickFilter(e.target.value);
  };

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
            <h1>USERS</h1>
            <div>
              <input
                type="search"
                style={searchStyle}
                onChange={onFilterTextChange}
                placeholder="Search ..."
              />
            </div>
          </div>
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
                rowData={rowData}
                columnDefs={colDefs}
                // defaultColDef={{ flex: 1 }}
              />
            </div>
          )}
        </Box>
      </Box>
    </>
  );
}

export default Users;
