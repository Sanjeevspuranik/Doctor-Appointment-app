import React from "react";
import { Col, Form, Input, Row, TimePicker } from "antd";
import { Box, Card, Divider, Typography, Button } from "@mui/material";
import "../styles/styles.css";
import PersonIcon from "@mui/icons-material/Person";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const Applydoctor = () => {
  //Handle finish
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlefinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "api/v1/user/apply-doctor",
        { ...values, userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        toast.success("application submitted successfully");
        navigate("/");
      } else {
        toast.error(res.data.success);
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error);
      toast.error("Something went wrong")
    
    }
  };

  return (
    <Box>
      <Typography fontSize={20} m={1}>
        Doctor Application
      </Typography>
      <Divider />

      <Card sx={{ boxShadow: 5, borderRadius: 5, margin: 1 }}>
        <Form layout="verticle" onFinish={handlefinish} id="form">
          <Typography
            sx={{
              m: 1,
              fontWeight: "bold",
              fontSize: 18,
              color: "darkcyan",
            }}
          >
            <PersonIcon sx={{ margin: 1 }} />
            Personal details
          </Typography>
          <Divider />
          <Row>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                id="form-item"
                label="First name"
                name={"firstname"}
                required
                rules={{ required: true }}
              >
                <Input type="text" placeholder="First name" id="input-box" />
              </Form.Item>
              <Form.Item
                id="form-item"
                label="Last name"
                name={"lastname"}
                required
                rules={{ required: true }}
              >
                <Input type="text" placeholder="Last name" id="input-box" />
              </Form.Item>
              <Form.Item
                id="form-item"
                label="Address"
                name={"address"}
                required
                rules={{ required: true }}
              >
                <Input type="text" placeholder="Address" id="input-box" />
              </Form.Item>
              <Form.Item
                id="form-item"
                label="Email"
                name={"email"}
                required
                rules={{ required: true }}
              >
                <Input type="email" placeholder="Email" id="input-box" />
              </Form.Item>
              <Form.Item
                id="form-item"
                label="Phone no"
                name={"phone"}
                required
                rules={{ required: true }}
              >
                <Input type="number" placeholder="Phone no" id="input-box" />
              </Form.Item>
              <Form.Item
                id="form-item"
                label="Website"
                name={"website"}
                required
                rules={{ required: true }}
              >
                <Input type="website" placeholder="Website" id="input-box" />
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          <Typography
            sx={{
              m: 1,
              fontWeight: "bold",
              fontSize: 18,
              color: "darkcyan",
            }}
          >
            <PersonIcon sx={{ margin: 1 }} />
            Professional details
          </Typography>
          <Divider />
          <Row>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                id="form-item"
                label="Specialization"
                name={"specialization"}
                required
                rules={{ required: true }}
              >
                <Input
                  type="text"
                  placeholder="specialization"
                  id="input-box"
                />
              </Form.Item>
              <Form.Item
                id="form-item"
                label="Experience"
                name={"experience"}
                required
                rules={{ required: true }}
              >
                <Input type="text" placeholder="Experience" id="input-box" />
              </Form.Item>
              <Form.Item
                id="form-item"
                label="Fees per consultancy"
                name={"feesperconsultancy"}
                required
                rules={{ required: true }}
              >
                <Input
                  type="number"
                  placeholder="Fees per consultancy"
                  id="input-box"
                />
              </Form.Item>
              <Form.Item
                id="form-item"
                label="Timings"
                name={"timings"}
                required
                rules={{ required: true }}
              >
                <TimePicker.RangePicker format={"HH:mm"} />
              </Form.Item>
            </Col>
          </Row>

          <Button type="submit" variant="contained" sx={{ width: "100%" }}>
            submit
          </Button>
        </Form>
      </Card>
    </Box>
  );
};

export default Applydoctor;
