import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
} from "@mui/material";
import { DatePicker, TimePicker } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import toast from "react-hot-toast";

const BookingPage = () => {
  const { user } = useSelector((state) => state.user);
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [available, setAvialable] = useState();
  const params = useParams();
  const dispatch = useDispatch();

  const getDoctorById = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDoctorById",
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBooking = async () => {
    try {
      if (!date && !time) {
        return alert("Date and Time fields required");
      }
      dispatch(showLoading());
      console.log("time value just before sending to API :", time);
      const res = await axios.post(
        "/api/v1/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctors,
          userInfo: user,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        dispatch(hideLoading());
        toast.success(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("something went wrong");
    }
  };

  const handleavailability = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/check-availability",
        {
          doctorId: params.doctorId,
          date,
          time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {
        dispatch(hideLoading());
        setAvialable(true);
        toast.success("slot available");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      toast.error("something went wrong");
    }
  };

  useEffect(() => {
    getDoctorById();
  }, []);

  return (
    <>
      <Box sx={{ p: 1, m: 1, borderRadius: 5 }}>
        <Typography>Booking Page</Typography>
        {doctors && doctors.timings && (
          <Card
            sx={{
              p: 1,
              m: 1,
              boxShadow: 5,
              borderRadius: 5,
            }}
          >
            <CardContent
              sx={{
                borderRadius: 5,
                bgcolor: "rgb(0, 162, 237)",
                boxShadow: 5,
              }}
            >
              <Typography>
                Dr. {doctors.firstname} {doctors.lastname}
              </Typography>
            </CardContent>
            <CardContent
              sx={{ borderRadius: 5, mt: 1, bgcolor: "rgb(186, 233, 255) " }}
            >
              <Typography>Fees: {doctors.feesperconsultancy}</Typography>
              <Typography>Specialization: {doctors.specialization}</Typography>
              <Typography>
                Timings: {doctors.timings.start} - {doctors.timings.end}
              </Typography>
            </CardContent>
            <CardContent
              sx={{ borderRadius: 5, mt: 1, bgcolor: "rgb(186, 233, 255) " }}
            >
              {" "}
              Select Date and Time
              <Typography sx={{ p: 1 }}>
                <DatePicker
                  format="DD-MM-YYYY"
                  onChange={(date, dateString) => {
                    setDate(dateString);
                    setAvialable(false);
                  }}
                />
              </Typography>
              <Typography sx={{ p: 1 }}>
                <TimePicker
                  format={"HH:mm"}
                  onChange={(time, timeString) => {
                    setAvialable(false);
                    setTime(timeString);
                  }}
                />
              </Typography>
            </CardContent>
            <Button
              variant="contained"
              sx={{ m: 1, p: 1 }}
              onClick={handleavailability}
            >
              Check availabilty
            </Button>
            {!available && (
              <Button
                variant="contained"
                sx={{ m: 1, p: 1 }}
                onClick={handleBooking}
              >
                Book appointment
              </Button>
            )}
          </Card>
        )}
      </Box>
    </>
  );
};

export default BookingPage;
