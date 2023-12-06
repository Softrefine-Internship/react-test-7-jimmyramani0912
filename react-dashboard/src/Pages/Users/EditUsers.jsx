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

function EditUsers() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const { control, handleSubmit, setValue } = useForm();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/users/${id}`)
      .then((res) => res.json())
      .then((json) => {
        // Set initial form values
        setValue("email", json.email);
        setValue("username", json.username);
        setValue("firstname", json.name.firstname);
        setValue("lastname", json.name.lastname);
        setValue("phone", json.phone);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, [id, setValue]);

  const onSubmit = (data) => {
    axios
      .put(`https://fakestoreapi.com/users/${id}`, {
        email: data.email,
        username: data.username,
        name: {
          firstname: data.firstname,
          lastname: data.lastname,
        },
        phone: data.phone,
      })
      .then((response) => {
        setSuccessMessage("User updated successfully!");
        setModalOpen(true);
      })
      .catch((error) => {
        setErrorMessage("Error updating user. Please try again.");
        setModalOpen(true);
      });
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSuccessMessage("");
    setErrorMessage("");
    navigate("/users");
  };

  return (
    <>
      <Navbar />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>EDIT USER</h1>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Email"
                      variant="outlined"
                      fullWidth
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="username"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Username"
                      variant="outlined"
                      fullWidth
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="firstname"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="First Name"
                      variant="outlined"
                      fullWidth
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="lastname"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Last Name"
                      variant="outlined"
                      fullWidth
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Phone"
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
                        navigate("/users");
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

export default EditUsers;
