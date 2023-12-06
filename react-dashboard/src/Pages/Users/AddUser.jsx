import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Navbar from "../../components/Navbar/Navbar";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

function AddUser() {
  const [loading, setLoading] = useState(false);
  const { register, control, handleSubmit, reset } = useForm();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  const onSubmit = (data) => {
    setLoading(true);
    axios
      .post("https://fakestoreapi.com/users", {
        email: data.email,
        username: data.username,
        password: data.password,
        name: {
          firstname: data.firstname,
          lastname: data.lastname,
        },
        address: {
          city: data.city,
          street: data.street,
          number: parseInt(data.number),
          zipcode: data.zipcode,
          geolocation: {
            lat: data.lat,
            long: data.long,
          },
        },
        phone: data.phone,
      })
      .then((response) => {
        setLoading(false);
        setSuccessMessage("User added successfully!");
        setModalOpen(true);
        reset();
      })
      .catch((error) => {
        setLoading(false);
        setErrorMessage("Error adding user. Please try again.");
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
            <h1>ADD USER</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={3}>
                <Stack direction={"row"} spacing={2}>
                  <TextField
                    label="First Name"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    {...register("firstname")}
                  />
                  <TextField
                    label="Last Name"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    {...register("lastname")}
                  />
                </Stack>
                <TextField
                  label="Username"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  {...register("username")}
                />
                <TextField
                  label="Email"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  {...register("email")}
                />

                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  {...register("password")}
                />
                <Stack direction={"row"} spacing={2}>
                  <TextField
                    label="City"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    {...register("city")}
                  />
                  <TextField
                    label="Street"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    {...register("street")}
                  />
                  <TextField
                    label="Number"
                    type="number"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    {...register("number")}
                  />
                  <TextField
                    label="Zipcode"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    {...register("zipcode")}
                  />
                </Stack>

                <Stack direction={"row"} spacing={2}>
                  <TextField
                    label="Latitude"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    {...register("lat")}
                  />
                  <TextField
                    label="Longitude"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    {...register("long")}
                  />
                </Stack>
                <TextField
                  label="Phone"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  {...register("phone")}
                />
              </Stack>
              <Box textAlign="center" mt={3} mb={3}>
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  size="large"
                >
                  Add User
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

export default AddUser;
