import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Box from "@mui/material/Box";
import Navbar from "../../components/Navbar/Navbar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm, Controller } from "react-hook-form";
import { Stack } from "@mui/material";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

function EditProduct() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const { control, handleSubmit, setValue } = useForm();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((json) => {
        // Set initial form values
        setValue("title", json.title);
        setValue("price", json.price);
        setValue("description", json.description);
        setValue("image", json.image);
        setValue("category", json.category);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
        setLoading(false);
      });
  }, [id, setValue]);

  const onSubmit = (data) => {
    axios
      .put(`https://fakestoreapi.com/products/${id}`, {
        title: data.title,
        price: parseFloat(data.price),
        description: data.description,
        image: data.image,
        category: data.category,
      })
      .then((response) => {
        setSuccessMessage("Product updated successfully!");
        setModalOpen(true);
      })
      .catch((error) => {
        setErrorMessage("Error updating product. Please try again.");
        setModalOpen(true);
      });
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSuccessMessage("");
    setErrorMessage("");
    navigate("/products");
  };

  return (
    <>
      <Navbar />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>EDIT PRODUCT</h1>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2}>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Title"
                      variant="outlined"
                      fullWidth
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="price"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Price"
                      type="number"
                      variant="outlined"
                      fullWidth
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Description"
                      variant="outlined"
                      fullWidth
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="image"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Image"
                      variant="outlined"
                      fullWidth
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Category"
                      variant="outlined"
                      fullWidth
                      {...field}
                    />
                  )}
                />
                <Box textAlign="center">
                  <Stack direction={"row"} spacing={2}>
                    <Button type="submit" variant="outlined" color="success">
                      UPDATE
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => {
                        navigate("/products");
                      }}
                    >
                      CANCEL
                    </Button>
                  </Stack>
                </Box>
              </Stack>
            </form>
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
    </>
  );
}

export default EditProduct;
