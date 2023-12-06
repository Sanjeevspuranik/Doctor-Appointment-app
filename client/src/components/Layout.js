import React from "react";
import "../styles/LayoutStyle.css";
import { SideBarMenu } from "../data/Data";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Box, Button, Card, Tooltip, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { useSelector } from "react-redux";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Badge } from "antd";

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <Card
              sx={{ p: 1, m: 1, boxShadow: 5, borderRadius: 3 }}
              className="menu-item"
            >
              <Link to={`/user/profile/${user?._id}`}>
                <Typography sx={{ m: 1, p: 1 }} className="link">
                  {" "}
                  <AccountBoxIcon /> {user?.name}
                </Typography>
                <Divider variant="middle" component="div" role="presentation" />

                <Typography sx={{ m: 1, p: 1 }} className="link">
                  {user?.phone}
                </Typography>
              </Link>
            </Card>
            {SideBarMenu.map((menu) => {
              return (
                <>
                  <div className="menu-item">
                    <Box className="menu-card">
                      <Link to={menu.path}>
                        <Typography fontWeight={"bold"} className="link">
                          <i className="menu-icon">{menu.icon}</i>
                          {menu.name}
                        </Typography>
                      </Link>
                    </Box>
                    <Divider
                      variant="middle"
                      component="div"
                      role="presentation"
                    />
                  </div>
                </>
              );
            })}
          </div>

          <div className="content">
            <div className="header">
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
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
