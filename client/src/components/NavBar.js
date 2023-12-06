import React, { useEffect, useState } from "react";
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
import { Badge } from "antd";

const NavBar = () => {
  // const loggedIn = localStorage.getItem("token");
  const { user } = useSelector((state) => state.user);
  const isAdmin = user?.isAdmin;
  const isDoctor = user?.isdoctor;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //logout handler
  const handlelogout = () => {
    localStorage.clear();
    toast.success("logged out successfully");
    navigate("/login");
  };

  return (
    <div className="box">
      <Typography fontWeight={"bold"} fontSize={24}>
        {" "}
        Doctor Appointment App
      </Typography>
      {/* Toggle sidebar from this button */}
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

            <NavLink to={"/admin/doctors"}>
              <Button id="button" sx={{ color: "black" }}>
                doctors
              </Button>
            </NavLink>
            <NavLink to={"/admin/users"}>
              <Button id="button" sx={{ color: "black" }}>
                users
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
      ) : isDoctor ? (
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

            <NavLink to={"/doctor-appointments"}>
              <Button id="button" sx={{ color: "black" }}>
                Appointments
              </Button>
            </NavLink>

            <NavLink to={"/help"}>
              <Button id="button" sx={{ color: "black" }}>
                <HelpIcon />
                Help
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
      ) : (
        <>
          <Box display={"flex"} flexDirection={"row"}>
            <Button
              id="button"
              onClick={() => {
                navigate("/");
              }}
              sx={{ flexGrow: 0 }}
            >
              <HomeIcon sx={{ color: "black" }} />
            </Button>

            <NavLink to={"/appointments"}>
              <Button id="button" sx={{ color: "black", flexGrow: 0 }}>
                Appointments
              </Button>
            </NavLink>
            <NavLink to={"/apply-doctor"}>
              <Button id="button" sx={{ color: "black", flexGrow: 0 }}>
                apply-doctor
              </Button>
            </NavLink>

            <NavLink to={"/help"}>
              <Button id="button" sx={{ color: "black", flexGrow: 0 }}>
                <HelpIcon />
                Help
              </Button>
            </NavLink>

            <Tooltip title="logout" arrow>
              <Button
                id="button"
                onClick={handlelogout}
                sx={{ color: "black", flexGrow: 0 }}
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
