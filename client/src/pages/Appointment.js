import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import moment from "moment";
import { Table } from "antd";
import { Typography } from "@mui/material";
const Appointment = () => {
  const [appointment, setAppointment] = useState([]);

  const getAppointment = async () => {
    try {
      const res = await axios.get("/api/v1/user/user-appointments", {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (res.data.success) {
        setAppointment(res.data.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  useEffect(() => {
    getAppointment();
  }, []);

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
      render: (text, record) => <span>{record.status}</span>,
    },
  ];
  return (
    <>
      <Typography>Appointment List</Typography>
      <Table columns={columns} dataSource={appointment} />
    </>
  );
};

export default Appointment;
