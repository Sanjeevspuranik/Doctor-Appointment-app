import React from "react";
import { Form, Input, message } from "antd";
import { Button, Typography } from "@mui/material";
import "../styles/RegisterStyles.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axois from "axios";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //finish handler
  const onFinishhandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axois.post("/api/v1/user/register", values);
      if (res.data.success) {
        dispatch(hideLoading());
        toast.success("Registered successfully");
        navigate("/login");
      } else {
        toast.error(res.data.message);
        dispatch(hideLoading());
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("something went wrong");
    }
  };
  return (
    <div className="form-container">
      <Form layout="vertical" onFinish={onFinishhandler}>
        <Typography fontSize={18} fontWeight="bold">
          Register Form
        </Typography>
        <Form.Item label="Name" name="name">
          <Input type="name" required />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input type="email" required />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password" required />
        </Form.Item>
        <Link to="/login"> Already a User?</Link>
        <Button type="submit" sx={{ backgroundColor: "powderblue" }}>
          Register
        </Button>
      </Form>
    </div>
  );
};

export default RegisterPage;
