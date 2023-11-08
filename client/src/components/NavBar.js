import React, { useEffect } from "react";
import { Box, Button, Card, Tooltip, Typography } from "@mui/material";
import "../styles/NavBar.css";
import HomeIcon from "@mui/icons-material/Home";
import HelpIcon from "@mui/icons-material/Help";
import { NavLink, useNavigate } from "react-router-dom";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import axios from "axios";
import { setUser } from "../redux/features/UserSlice";
import { Badge } from "antd";

const NavBar = () => {
  // const loggedIn = localStorage.getItem("token");
  const { user } = useSelector((state) => state.user);
  const isAdmin = user?.isAdmin;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //logout handler
  const handlelogout = () => {
    localStorage.clear();
    toast.success("logged out successfully");
    navigate("/login");
  };

  //fetchuserdata
  const fetchUserData = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="box">
      <Typography fontWeight={"bold"} fontSize={24}>
        <Tooltip title="tooltip" followCursor arrow>
          {" "}
          Doctor appointment
        </Tooltip>
      </Typography>
      {isAdmin ? (
        <>
          <Box display={"flex"} flexDirection={"row"}>
            <Tooltip title="home" arrow>
              <Button
                id="button"
                onClick={() => {
                  navigate("/");
                }}
              >
                <HomeIcon sx={{ color: "black" }} />
              </Button>
            </Tooltip>

            <NavLink to={"/doctors"}>
              <Button id="button" sx={{ color: "black" }}>
                doctors
              </Button>
            </NavLink>
            <Tooltip title="home" arrow>
              <Button
                id="button"
                onClick={() => {
                  navigate("/profile");
                }}
              >
                <AccountBoxIcon sx={{ color: "black" }} />
                <Typography color={"black"}>{user?.name}</Typography>
              </Button>
            </Tooltip>
            <Tooltip title="logout" arrow>
              <Button
                id="button"
                onClick={handlelogout}
                sx={{ color: "black" }}
              >
                <LogoutIcon />
              </Button>
            </Tooltip>
            <Tooltip title="notification" arrow>
              <Button
                id="button"
                sx={{ color: "black" }}
                onClick={() => {
                  navigate("/notification");
                }}
              >
                <Badge count={user && user.notification.length}>
                  <NotificationsIcon />
                </Badge>
              </Button>
            </Tooltip>
          </Box>
        </>
      ) : (
        <>
          <Box display={"flex"} flexDirection={"row"}>
            <Button
              id="button"
              onClick={() => {
                navigate("/");
              }}
            >
              <HomeIcon sx={{ color: "black" }} />
            </Button>

            <NavLink to={"/appointments"}>
              <Button id="button" sx={{ color: "black" }}>
                Appointments
              </Button>
            </NavLink>
            <NavLink to={"/apply-doctor"}>
              <Button id="button" sx={{ color: "black" }}>
                apply-doctor
              </Button>
            </NavLink>

            <NavLink to={"/help"}>
              <Button id="button" sx={{ color: "black" }}>
                <HelpIcon />
                Help
              </Button>
            </NavLink>
            <NavLink to={"/profile"}>
              <Button id="button" sx={{ color: "black" }}>
                <AccountBoxIcon /> {user?.name}
              </Button>
            </NavLink>

            <Tooltip title="logout" arrow>
              <Button
                id="button"
                onClick={handlelogout}
                sx={{ color: "black" }}
              >
                <LogoutIcon />
              </Button>
            </Tooltip>
          </Box>
        </>
      )}
    </div>
  );
};

export default NavBar;
