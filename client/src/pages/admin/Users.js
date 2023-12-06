import { Box, Button, Card, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Table } from "antd";

const Users = () => {
  const [Users, setUser] = useState([]);

  const getUsers = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllUsers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setUser(res.data.data);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  // antD table column

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Doctor",
      dataIndex: "isDoctor",
      render: (text, record) => <span>{record.isdoctor ? "Yes" : "No"}</span>,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <span>
          <Button color="error" variant="contained">
            block
          </Button>
        </span>
      ),
    },
  ];

  return (
    <Box sx={{ p: 1, mt: 1, ml: 1 }}>
      <Typography> Users List </Typography>
      <Card sx={{ p: 1, boxShadow: 5, borderRadius: 5, mt: 1 }}>
        <Table columns={columns} dataSource={Users} />
      </Card>
    </Box>
  );
};

export default Users;
