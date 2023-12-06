import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Box from "@mui/material/Box";
import Navbar from "../../components/Navbar/Navbar";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import Button from "@mui/material/Button";
import { Stack } from "@mui/system";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";

function Users() {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/users")
      .then((response) => {
        setRowData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`edit/${id}`);
  };

  const handleView = (id) => {
    navigate(`detail/${id}`);
  };

  const handleDelete = (id) => {
    setLoading2(true);
    axios
      .delete(`https://fakestoreapi.com/users/${id}`)
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
    {
      headerName: "Actions",
      cellRenderer: ActionsRenderer,
      suppressSorting: false,
      suppressFilter: false,
      width: 220,
    },
  ]);

  // const frameworkComponents = {
  //   actionsRenderer: (params) => (
  //     <div>
  //       <button onClick={() => handleEdit(params.data.id)}>Edit</button>
  //       <button onClick={() => handleView(params.data.id)}>View</button>
  //       <button onClick={() => handleDelete(params.data.id)}>Delete</button>
  //     </div>
  //   ),
  // };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSuccessMessage("");
    setErrorMessage("");
  };

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
            <h1>USERS</h1>
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
                  navigate("adduser");
                }}
              >
                ADD USER
              </Button>
            </Stack>
          </div>
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
                rowData={rowData}
                columnDefs={colDefs}
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

export default Users;
