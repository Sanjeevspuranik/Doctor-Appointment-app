import { Box, Divider } from "@mui/material";
import { React, useEffect, useState } from "react";
import axios from "axios";
import { Row } from "antd";
import "../styles/styles.css";
import Doctorlist from "../components/Doctorlist";
import Layout from "../components/Layout";

const HomePage = () => {
  const [doctors, setDoctors] = useState([]);

  const getUserData = async () => {
    try {
      const res = await axios.get("/api/v1/user/getAllDoctors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout>
      <Box
        sx={{
          p: 1,
          mt: 1,
          fontWeight: "bold",
          color: "rgb(0, 162, 237)",
        }}
      >
        {" "}
        Doctor List
        <Row>
          {doctors && doctors.map((doctor) => <Doctorlist doctor={doctor} />)}
        </Row>
      </Box>
    </Layout>
  );
};

export default HomePage;
