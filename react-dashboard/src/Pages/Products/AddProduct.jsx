import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Navbar from "../../components/Navbar/Navbar";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/system";
import { Stack } from "@mui/material";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const StyledFormControl = styled(FormControl)({
  margin: "theme.spacing(1)",
  minWidth: 120,
});

function AddProduct() {
  const [loading, setLoading] = useState(false);
  const { register, control, handleSubmit, reset } = useForm();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  const onSubmit = (data) => {
    setLoading(true);

    axios
      .post("https://fakestoreapi.com/products", {
        title: data.title,
        price: parseFloat(data.price),
        description: data.description,
        image: data.image,
        category: data.category,
      })
      .then((response) => {
        setLoading(false);
        setSuccessMessage("Product added successfully!");
        setModalOpen(true);
        reset();
      })
      .catch((error) => {
        setLoading(false);
        setErrorMessage("Error adding product. Please try again.");
        setModalOpen(true);
      });
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSuccessMessage("");
    setErrorMessage("");
  };

  return (
    <>
      <Navbar />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Stack>
            <h1>ADD PRODUCT</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={3}>
                <TextField
                  label="Title"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  {...register("title")}
                />
                <Stack direction={"row"} spacing={2}>
                  <TextField
                    label="Image"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    {...register("image")}
                    sx={{ marginBottom: "20px" }}
                  />
                  <TextField
                    label="Price"
                    type="number"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    {...register("price")}
                  />
                </Stack>
                <StyledFormControl fullWidth>
                  <InputLabel id="category-label" className="category">
                    Category
                  </InputLabel>
                  <Controller
                    render={({ field }) => (
                      <Select labelId="category-label" {...field}>
                        <MenuItem value="electronic">Electronic</MenuItem>
                        <MenuItem value="clothing">Clothing</MenuItem>
                        <MenuItem value="clothing">Groccessary</MenuItem>
                      </Select>
                    )}
                    control={control}
                    name="category"
                    defaultValue=""
                  />
                </StyledFormControl>
                <TextField
                  label="Description"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  {...register("description")}
                />
              </Stack>
              <Box textAlign="center" mt={3} mb={3}>
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  size="large"
                >
                  Add Product
                </Button>
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={loading}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
              </Box>
            </form>
          </Stack>
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

export default AddProduct;
