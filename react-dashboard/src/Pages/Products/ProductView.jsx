import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Box from "@mui/material/Box";
import Navbar from "../../components/Navbar/Navbar";

function ProductView() {
  <>
    <Navbar />
    <Box height={30} />
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <h1>PRODUCT DETAILS</h1>
      </Box>
    </Box>
  </>;
}

export default ProductView;
