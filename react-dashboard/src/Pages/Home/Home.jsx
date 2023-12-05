import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import "../../css/dashboard.css";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { FaCircleUser } from "react-icons/fa6";
import { FaCreditCard } from "react-icons/fa6";
import { FaBagShopping } from "react-icons/fa6";
import CountUp from "react-countup";

function Home() {
  return (
    <div className="bg">
      <Navbar />
      <Box height={65} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={6} md={8}>
                <Stack spacing={2} direction={"row"}>
                  <Card
                    sx={{ minWidth: 49 + "%", height: 170 }}
                    className="gradient"
                  >
                    <CardContent>
                      <div>
                        <FaCreditCard
                          className="iconstylewhite"
                          style={{ fontSize: "2rem", marginBottom: "1.8rem" }}
                        />
                      </div>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        className="iconstylewhite"
                      >
                        $
                        <CountUp delay={0.2} end={500} duration={0.8} />
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="body2"
                        component="div"
                        className="iconstylewhite"
                      >
                        TOTAL EARNING
                      </Typography>
                    </CardContent>
                  </Card>
                  <Card
                    sx={{ minWidth: 49 + "%", height: 170 }}
                    className="gradientlight"
                  >
                    <CardContent>
                      <div>
                        <FaBagShopping
                          style={{ fontSize: "2rem", marginBottom: "1.8rem" }}
                          className="iconstylewhite"
                        />
                      </div>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        className="iconstylewhite"
                      >
                        $ <CountUp delay={0.2} end={900} duration={0.8} />
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="body2"
                        component="div"
                        className="iconstylewhite"
                      >
                        TOTAL ORDER
                      </Typography>
                    </CardContent>
                  </Card>
                </Stack>
              </Grid>
              <Grid item xs={4}>
                <Stack spacing={2}>
                  <Card className="gradientlight">
                    <Stack direction={"row"}>
                      <div className="iconstyle iconstylewhite">
                        <FaCircleUser style={{ fontSize: "2rem" }} />
                        <div className="paddingall">
                          <span className="userpricetitle">200K</span>
                          <br />
                          <span className="userpricesubtitle">TOTAL USERS</span>
                        </div>
                      </div>
                    </Stack>
                  </Card>
                  <Card>
                    <Stack direction={"row"}>
                      <div className="iconstyle">
                        <FaMoneyBill1Wave style={{ fontSize: "2rem" }} />
                        <div className="paddingall">
                          <span className="userpricetitle">$203K</span>
                          <br />
                          <span className="userpricesubtitle">
                            TOTAL INCOME
                          </span>
                        </div>
                      </div>
                    </Stack>
                  </Card>
                </Stack>
              </Grid>
              <Box height={20} />
              <Grid item xs={6} md={8}>
                <Card sx={{ height: 60 + "vh" }}>
                  <CardContent></CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} md={4}>
                <Card sx={{ height: 60 + "vh" }}>
                  <CardContent></CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default Home;
