import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import { Stack } from "@mui/system";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";

function Cart() {
  const [cartData, setCartData] = useState([]);
  const [filteredUserId, setFilteredUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedUserId, setEditedUserId] = useState("");
  const [editedProductList, setEditedProductList] = useState([
    { productId: "", quantity: "" },
  ]);
  const [editedProducts, setEditedProducts] = useState([]);

  const [editedDate, setEditedDate] = useState("");
  const [editingCartId, setEditingCartId] = useState(null);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/carts")
      .then((response) => {
        setCartData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cart data:", error);
      });
  }, []);

  const handleEdit = (cartId) => {
    handleOpenEditDialog(cartId);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setEditedUserId("");
    setEditedProductList([{ productId: "", quantity: "" }]);
    setEditingCartId(null);
  };

  const handleSaveEdit = () => {
    setLoading(true);
    const editedCart = {
      userId: editedUserId,
      date: editedDate,
      products: editedProductList,
    };

    axios
      .put(`https://fakestoreapi.com/carts/${editingCartId}`, editedCart)
      .then((response) => {
        setLoading(false);
        setSuccessMessage("Edit successful!");
        setEditDialogOpen(false);
        setModalOpen(true);
        // You may want to fetch the updated data here
        axios
          .get("https://fakestoreapi.com/carts")
          .then((response) => {
            setCartData(response.data);
          })
          .catch((error) => {
            console.error("Error fetching cart data:", error);
          });
      })
      .catch((error) => {
        setLoading(false);
        setErrorMessage("Error editing cart. Please try again.");
        setModalOpen(true);
      });
  };

  // ... (previous delete and filter functions)

  const handleAddProduct = () => {
    setEditedProductList([
      ...editedProductList,
      { productId: "", quantity: "" },
    ]);
  };

  const handleRemoveProduct = (index) => {
    const updatedProductList = [...editedProductList];
    updatedProductList.splice(index, 1);
    setEditedProductList(updatedProductList);
  };

  const handleProductChange = (index, field, value) => {
    const updatedProductList = [...editedProductList];
    updatedProductList[index][field] = value;
    setEditedProductList(updatedProductList);
  };

  const searchStyle = {
    width: "30%",
    marginLeft: "auto",
    padding: "10px 20px",
    borderRadius: 5,
    outline: 0,
    border: "2px #dfdfdf solid",
    fontSize: "100%",
  };

  const filteredCartData = filteredUserId
    ? cartData.filter((cart) => cart.userId === filteredUserId)
    : cartData;

  const handleCloseModal = () => {
    setModalOpen(false);
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleDelete = (cartId) => {
    setLoading(true);
    axios
      .delete(`https://fakestoreapi.com/carts/${cartId}`)
      .then((response) => {
        setLoading(false);
        setSuccessMessage("Delete successful!");
        setModalOpen(true);
      })
      .catch((error) => {
        setLoading(false);
        setErrorMessage("Error deleting cart. Please try again.");
        setModalOpen(true);
      });
  };

  const handleOpenEditDialog = (cartId) => {
    const cartToEdit = cartData.find((cart) => cart.id === cartId);
    if (cartToEdit) {
      setEditedUserId(cartToEdit.userId);
      setEditedProducts(cartToEdit.products);
      setEditedDate(cartToEdit.date);
      setEditingCartId(cartId);
      setEditDialogOpen(true);
    }
  };

  const handleFilterChange = (userId) => {
    setFilteredUserId(userId);
  };

  return (
    <div className="bg">
      <Navbar />
      <Box height={35} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <div className="flex">
            <h1>CART</h1>
            <input
              type="search"
              style={searchStyle}
              onChange={(e) => handleFilterChange(Number(e.target.value))}
              placeholder="Search by User ID..."
            />
          </div>
          {filteredCartData.length > 0 ? (
            filteredCartData.map((cart) => (
              <Card key={cart.id} sx={{ marginBottom: 2 }}>
                <CardContent>
                  <Stack
                    direction={"row"}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="h6" gutterBottom>
                      User ID: {cart.userId}
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <Stack direction={"row"} spacing={3}>
                        <Button
                          variant="outlined"
                          onClick={() => handleEdit(cart.id)}
                          color="success"
                          size="medium"
                        >
                          EDIT
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={() => handleDelete(cart.id)}
                          color="error"
                          size="medium"
                        >
                          DELETE
                        </Button>
                      </Stack>
                    </Box>
                  </Stack>
                  <Typography variant="body1" color="text.secondary">
                    Date: {cart.date}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="body1">Products:</Typography>
                  <List>
                    {cart.products.map((product, index) => (
                      <React.Fragment key={index}>
                        <ListItem>
                          <ListItemText
                            primary={`Product ID: ${product.productId}`}
                            secondary={`Quantity: ${product.quantity}`}
                          />
                        </ListItem>
                        {index < cart.products.length - 1 && (
                          <Divider variant="middle" />
                        )}
                      </React.Fragment>
                    ))}
                  </List>
                </CardContent>
              </Card>
            ))
          ) : (
            <Box textAlign={"center"}>
              <Typography variant="h" gutterBottom>
                Not Found
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
      {loading && (
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
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
      <Dialog
        open={editDialogOpen}
        onClose={handleCloseEditDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle textAlign={"center"}>EDIT CART</DialogTitle>
        <DialogContent>
          <TextField
            sx={{ marginTop: "1rem" }}
            label="User ID"
            value={editedUserId}
            onChange={(e) => setEditedUserId(e.target.value)}
            fullWidth
          />
          <Typography variant="h6" gutterBottom>
            Products:
          </Typography>
          {editedProducts.map((product, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <Stack spacing={2}>
                <TextField
                  label={`Product ID ${index + 1}`}
                  value={product.productId}
                  onChange={(e) =>
                    handleProductChange(index, "productId", e.target.value)
                  }
                  fullWidth
                />
                <TextField
                  label={`Quantity ${index + 1}`}
                  value={product.quantity}
                  onChange={(e) =>
                    handleProductChange(index, "quantity", e.target.value)
                  }
                  fullWidth
                />
              </Stack>
              <IconButton onClick={() => handleRemoveProduct(index)}>
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
          <IconButton onClick={handleAddProduct}>
            <AddIcon />
          </IconButton>
          {/* <TextField
            label="Date"
            value={editedDate}
            onChange={(e) => setEditedDate(e.target.value)}
            fullWidth
          /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button onClick={handleSaveEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Cart;
