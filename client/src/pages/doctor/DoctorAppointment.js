import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import moment from "moment";
import { Table } from "antd";
import { Button, Typography } from "@mui/material";

const DoctorAppointment = () => {
  const [appointments, setAppointments] = useState([]);

  const getAppointment = async () => {
    try {
      const res = await axios.get("/api/v1/doctor/doctor-appointments", {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  useEffect(() => {
    getAppointment();
  }, []);

  const handleStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/update-status",
        {
          appointmentsId: record._id,
          status,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (res.data.success) {
        toast.success("approved the patient ");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.doctorInfo.firstname} {record.doctorInfo.lastname}
        </span>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      render: (text, record) => <span>{record.doctorInfo.phone}</span>,
    },
    {
      title: "Date & time",
      dataIndex: "date",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")}{" "}
          {moment(record.time).format("HH:mm")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => <span>{record.doctorInfo.status}</span>,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" && (
            <div>
              <Button
                onClick={() => handleStatus(record, "approved")}
                variant="contained"
                color="success"
                sx={{ p: 1, m: 1 }}
              >
                approve
              </Button>
              <Button
                onClick={() => handleStatus(record, "rejected")}
                variant="contained"
                color="error"
                sx={{ p: 1, m: 1 }}
              >
                reject
              </Button>
            </div>
          )}
        </div>
      ),
    },
  ];
  return (
    <>
      <Typography>Appointment List</Typography>
      <Table columns={columns} dataSource={appointments} />
    </>
  );
};

export default DoctorAppointment;
