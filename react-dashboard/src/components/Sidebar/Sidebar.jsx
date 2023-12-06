import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate, useLocation } from "react-router-dom"; // Move useLocation here
import { useAppStore } from "../../appStore";
import { FaBagShopping, FaCircleInfo, FaHouse, FaUsers } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Sidebar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const open = useAppStore((state) => state.dopen);
  const isCurrentRoute = (route) => location.pathname === route;

  return (
    <Box sx={{ display: "flex" }}>
      <Box height={30} />
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => {
              navigate("/");
            }}
          >
            <ListItemButton
              selected={isCurrentRoute("/")}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                background: isCurrentRoute("/") ? "#ECEFF1" : "transparent",
                backgroundImage: isCurrentRoute("/")
                  ? "linear-gradient(158deg, rgb(224, 224, 224) 0%, rgb(233, 237, 254) 100%)"
                  : "none",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <FaHouse fontSize={"1.6rem"} />
              </ListItemIcon>
              <ListItemText primary={"HOME"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => {
              navigate("/users");
            }}
          >
            <ListItemButton
              selected={isCurrentRoute("/users")}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                background: isCurrentRoute("/users")
                  ? "#ECEFF1"
                  : "transparent",
                backgroundImage: isCurrentRoute("/users")
                  ? "linear-gradient(158deg, rgb(224, 224, 224) 0%, rgb(233, 237, 254) 100%)"
                  : "none",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <FaUsers fontSize={"1.6rem"} />
              </ListItemIcon>
              <ListItemText primary={"USERS"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => {
              navigate("/products");
            }}
          >
            <ListItemButton
              selected={isCurrentRoute("/products")}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                background: isCurrentRoute("/products")
                  ? "#ECEFF1"
                  : "transparent",
                backgroundImage: isCurrentRoute("/products")
                  ? "linear-gradient(158deg, rgb(224, 224, 224) 0%, rgb(233, 237, 254) 100%)"
                  : "none",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <FaBagShopping fontSize={"1.6rem"} />
              </ListItemIcon>
              <ListItemText
                primary={"PRODUCTS"}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => {
              navigate("/cart");
            }}
          >
            <ListItemButton
              selected={isCurrentRoute("/cart")}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                background: isCurrentRoute("/cart") ? "#ECEFF1" : "transparent",
                backgroundImage: isCurrentRoute("/cart")
                  ? "linear-gradient(158deg, rgb(224, 224, 224) 0%, rgb(233, 237, 254) 100%)"
                  : "none",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <FaCartShopping fontSize={"1.6rem"} />
              </ListItemIcon>
              <ListItemText primary={"CART"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => {
              navigate("/about");
            }}
          >
            <ListItemButton
              selected={isCurrentRoute("/about")}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                background: isCurrentRoute("/about")
                  ? "#ECEFF1"
                  : "transparent",
                backgroundImage: isCurrentRoute("/about")
                  ? "linear-gradient(158deg, rgb(224, 224, 224) 0%, rgb(233, 237, 254) 100%)"
                  : "none",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <FaCircleInfo fontSize={"1.6rem"} />
              </ListItemIcon>
              <ListItemText primary={"ABOUT"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
        <ListItem
          disablePadding
          sx={{ display: "block" }}
          onClick={() => {
            navigate("/setting");
          }}
        >
          <ListItemButton
            selected={isCurrentRoute("/setting")}
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
              background: isCurrentRoute("/setting")
                ? "#ECEFF1"
                : "transparent",
              backgroundImage: isCurrentRoute("/setting")
                ? "linear-gradient(158deg, rgb(224, 224, 224) 0%, rgb(233, 237, 254) 100%)"
                : "none",
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <IoIosSettings fontSize={"1.6rem"} />
            </ListItemIcon>
            <ListItemText primary={"SETTING"} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      </Drawer>
    </Box>
  );
}
