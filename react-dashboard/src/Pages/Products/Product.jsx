import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Box from "@mui/material/Box";
import Navbar from "../../components/Navbar/Navbar";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";

function Product() {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState([]);
  const [filteredRowData, setFilteredRowData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  // const [filterModel, setFilterModel] = useState({
  //   category: { type: "set", values: [] },
  //   price: null,
  // });

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setRowData(response.data);
        setFilteredRowData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const navigate = useNavigate();

  const getUniqueValues = (data, field) => {
    return [...new Set(data.map((item) => item[field]))];
  };

  const imageRenderer = (params) => {
    return (
      <img
        src={params.value}
        alt="image"
        loading="lazy"
        style={{ width: "60%", height: "60%", objectFit: "cover" }}
      />
    );
  };

  const handleEdit = (id) => {
    navigate(`edit/${id}`);
  };

  const handleView = (id) => {
    navigate(`detail/${id}`);
  };

  const handleDelete = (id) => {
    setLoading2(true);
    axios
      .delete(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        setLoading2(false);
        setSuccessMessage("Delete successful!");
        setModalOpen(true);
      })
      .catch((error) => {
        setLoading2(false);
        setErrorMessage("Error deleting user. Please try again.");
        setModalOpen(true);
      });
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSuccessMessage("");
    setErrorMessage("");
  };

  const ActionsRenderer = (params) => (
    <Stack direction={"row"} spacing={2}>
      <Button onClick={() => handleView(params.data.id)} size="small">
        VIEW
      </Button>
      <Button
        variant="outlined"
        onClick={() => handleEdit(params.data.id)}
        color="success"
        size="small"
      >
        EDIT
      </Button>
      <Button
        variant="outlined"
        onClick={() => handleDelete(params.data.id)}
        color="error"
        size="small"
      >
        DELETE
      </Button>
    </Stack>
  );

  const colDefs = [
    { field: "id", headerName: "ID", resizable: false, suppressMovable: true },
    { field: "title", headerName: "Title", suppressMovable: true },
    {
      field: "image",
      headerName: "Image",
      cellRenderer: imageRenderer,
      suppressSorting: false,
      suppressFilter: false,
      width: 100,
    },
    { field: "price", headerName: "Price", filter: "agNumberColumnFilter" },
    {
      field: "category",
      headerName: "Category",
      filter: "agSetColumnFilter",
      filterParams: { values: getUniqueValues(rowData, "category") },
    },
    { field: "description", headerName: "Description" },
    {
      headerName: "Actions",
      cellRenderer: ActionsRenderer,
      suppressSorting: false,
      suppressFilter: false,
      width: 260,
    },
  ];

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
    width: "50%",
    marginLeft: "auto",
    padding: "10px 20px",
    borderRadius: 5,
    outline: 0,
    marginRight: "1rem",
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
    <div className="bg">
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
            <Stack direction={"row"} spacing={2}>
              <input
                type="search"
                style={searchStyle}
                onChange={onFilterTextChange}
                placeholder="Search ..."
              />
              <Button
                variant="outlined"
                color="success"
                onClick={() => {
                  navigate("addproduct");
                }}
              >
                ADD PRODUCT
              </Button>
            </Stack>
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
          {loading2 && (
            <Backdrop
              sx={{
                color: "#fff",
                zIndex: (theme) => theme.zIndex.drawer + 1,
              }}
              open={loading2}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          )}
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
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          textAlign={"center"}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            variant="h6"
            component="div"
            gutterBottom
            color={successMessage === "Success" ? "red" : "green"}
          >
            {successMessage ? "Success" : "Error"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {successMessage || errorMessage}
          </Typography>
          <Button onClick={handleCloseModal} sx={{ color: "black" }}>
            OK
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default Product;
