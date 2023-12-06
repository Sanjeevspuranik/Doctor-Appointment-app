import { Box, Button, Card, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Table } from "antd";

const Doctors = () => {
  const [Doctors, setDoctor] = useState([]);

  const getDoctors = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllDoctors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setDoctor(res.data.data);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  // handle account status change
  const handleaccountstatus = async (record, status) => {
    try {
      const res = await axios.post(
        "/api/v1/admin/changeaccountstatus",
        {
          doctorId: record._id,
          userId: record.userID,
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstname} {record.lastname}
        </span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <span>
          {record.status == "pending" ? (
            <Button
              color="success"
              variant="contained"
              onClick={() => handleaccountstatus(record, "approved")}
            >
              Approve
            </Button>
          ) : (
            <Button color="error" variant="contained">
              Reject
            </Button>
          )}
        </span>
      ),
    },
  ];

  return (
    <Box sx={{ p: 1, mt: 1, ml: 1 }}>
      <Typography> Doctors List </Typography>
      <Card sx={{ p: 1, boxShadow: 5, borderRadius: 5, mt: 1 }}>
        <Table columns={columns} dataSource={Doctors} />
      </Card>
    </Box>
  );
};

export default Doctors;
