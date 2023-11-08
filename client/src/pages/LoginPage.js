import React from "react";
import { Form, Input } from "antd";
import { Button, Typography, Card, Box } from "@mui/material";
import "../styles/RegisterStyles.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import toast from "react-hot-toast";
import axois from "axios";

const LoginPage = () => {
  //handler
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinishhandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axois.post("/api/v1/user/login", values);
      if (res.data.success) {
        dispatch(hideLoading());
        toast.success("login successfully");
        localStorage.setItem("token", res.data.token);
        navigate("/");
      } else {
        toast.error(res.data.message);
        dispatch(hideLoading());
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="form-container">
      <Form layout="vertical" onFinish={onFinishhandler}>
        <Typography fontSize={18} fontWeight="bold">
          Login
        </Typography>
        <Form.Item label="Email" name="email">
          <Input type="email" required />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password" required />
        </Form.Item>
        <Link to="/register"> Don't have an account?</Link>
        <Button type="submit" sx={{ backgroundColor: "powderblue" }}>
          Login
        </Button>
      </Form>
    </div>
  );
};

export default LoginPage;
