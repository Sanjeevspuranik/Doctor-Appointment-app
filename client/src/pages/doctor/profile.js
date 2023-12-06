import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { Col, Form, Input, Row, TimePicker } from "antd";
import { Box, Card, Divider, Typography, Button } from "@mui/material";
import "../../styles/styles.css";
import { showLoading, hideLoading } from "../../redux/features/alertSlice";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import { useDispatch } from "react-redux";
import moment from "moment";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);
  const [User, setUser] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // GET USER DATA
  const getUser = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getUserData", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (res.data.success) {
        setUser(res.data.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  // UPDATE DOCTOR INFORMATION
  const updateDoctorInfo = async (values) => {
    try {
      dispatch(showLoading());

      const formattedTimings = {
        start: moment(values.timings.start).format("HH:mm"),
        end: moment(values.timings.end).format("HH:mm"),
      };

      const res = await axios.post(
        "/api/v1/doctor/updateDoctorInfo",
        {
          ...values,
          userId: user._id,
          timings: formattedTimings,
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
        navigate("/");
      } else {
        toast.success(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      toast.error("something went wrong");
    }
  };

  // GET DOCTOR INFORMATION
  const getDoctorInfo = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDoctorInfo",
        {
          userId: params.id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setDoctor(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctorInfo();
  }, []);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      {doctor ? (
        <div>
          <Typography fontSize={20} m={1}>
            Profile
          </Typography>
          <Divider />

          <Card sx={{ boxShadow: 5, borderRadius: 5, margin: 1 }}>
            <Form
              layout="verticle"
              onFinish={updateDoctorInfo}
              id="form"
              initialValues={{
                ...doctor,
                timings: {
                  start: moment(doctor.timings.start, "HH:mm"),
                  end: moment(doctor.timings.end, "HH:mm"),
                },
              }}
            >
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
                    <Input
                      type="text"
                      placeholder="First name"
                      id="input-box"
                    />
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
                    <Input
                      type="number"
                      placeholder="Phone no"
                      id="input-box"
                    />
                  </Form.Item>
                  <Form.Item
                    id="form-item"
                    label="Website"
                    name={"website"}
                    required
                    rules={{ required: true }}
                  >
                    <Input
                      type="website"
                      placeholder="Website"
                      id="input-box"
                    />
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
                    <Input
                      type="text"
                      placeholder="Experience"
                      id="input-box"
                    />
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
                    label="Start time"
                    name={["timings", "start"]}
                    required
                    rules={[{ required: true }]}
                  >
                    <TimePicker format={"HH:mm"} showNow={false} />
                  </Form.Item>
                  <Form.Item
                    id="form-item"
                    label="End time"
                    name={["timings", "end"]}
                    required
                    rules={[{ required: true }]}
                  >
                    <TimePicker format={"HH:mm"} showNow={false} />
                  </Form.Item>
                </Col>
              </Row>

              <Button type="submit" variant="contained" sx={{ width: "100%" }}>
                update
              </Button>
            </Form>
          </Card>
        </div>
      ) : (
        <>
          <Box sx={{ p: 1, m: 1, borderRadius: 5 }}>
            <Typography sx={{ fontWeight: "bold", color: "rgb(0, 162, 237)" }}>
              {" "}
              Profile{" "}
            </Typography>
            <Card sx={{ p: 1, mt: 1, boxShadow: 5, borderRadius: 5 }}>
              <Typography
                sx={{ fontWeight: "bold", color: "rgb(0, 162, 237)" }}
              >
                User Details
              </Typography>
              <Typography> Name : {User?.name}</Typography>
              <Typography> Email : {User?.email}</Typography>
            </Card>
          </Box>
        </>
      )}
    </div>
  );
};

export default Profile;
