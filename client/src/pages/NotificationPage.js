import { Box, Button, Card, Paper, Typography } from "@mui/material";
import React from "react";
import "../styles/styles.css";
import { useSelector, useDispatch } from "react-redux";
import { Tabs, message } from "antd";
import { toast } from "react-hot-toast";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {} from "../";

const NotificationPage = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // handle delete all notification
  const handledeleteall = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/delete-all-notification",
        { userId: user._id },
        {
          headers: { Authorization: `bearer ${localStorage.getItem("token")}` },
        }
      );

      if (res.data.success) {
        window.location.reload();
        dispatch(hideLoading());
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      toast.error(error.message);
    }
  };

  // fucntion to handle read all notifications
  const handlereadall = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/get-all-notification",
        {
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        toast.success(res.data.message);
        window.location.reload();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 5,
        boxShadow: 2,
        m: 2,
      }}
    >
      <Tabs>
        <Tabs.TabPane tab="unread" key={0}>
          {/* Unread message notification center */}
          {user?.notification.map((notificationmsg) => (
            <Card
              onClick={notificationmsg.onClickPath}
              style={{
                cursor: "pointer",
                padding: "2px",
                borderRadius: 5,
                marginTop: "2px",
              }}
            >
              {notificationmsg.firstname}
              {notificationmsg.message}
            </Card>
          ))}
          <Button
            sx={{ bgcolor: "rgb(0, 162, 237)", color: "white", m: 1 }}
            onClick={handlereadall}
          >
            {" "}
            mark as read
          </Button>
        </Tabs.TabPane>

        <Tabs.TabPane tab="read" key={1}>
          {/* Read message notification center */}
          {user?.seennotification.map((notificationmsg) => (
            <Card
              onClick={notificationmsg.onClickPath}
              style={{
                cursor: "pointer",
                padding: "2px",
                borderRadius: 5,
                marginTop: "2px",
              }}
            >
              {notificationmsg.message}
            </Card>
          ))}

          <Button
            sx={{ bgcolor: "rgb(0, 162, 237)", color: "white", m: 1 }}
            onClick={handledeleteall}
          >
            {" "}
            delete all read
          </Button>
        </Tabs.TabPane>
      </Tabs>
    </Box>
  );
};

export default NotificationPage;
