import { Card, CardContent, Divider, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Doctorlist = ({ doctor }) => {
  const navigate = useNavigate();

  return (
    <>
      <Card
        sx={{
          p: 1,
          mt: 1,
          ml: 1,
          cursor: "pointer",
          borderRadius: 5,
          boxShadow: 5,
        }}
        onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}
      >
        <CardContent sx={{ bgcolor: "rgb(169, 228, 255)", borderRadius: 3 }}>
          <Typography sx={{ fontWeight: "bold" }}>
            Dr. {doctor.firstname} {doctor.lastname}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography>
            <b>Specialization:</b> {doctor.specialization}
          </Typography>
          <Typography>
            <b>Email:</b> {doctor.email}
          </Typography>
          <Typography>
            <b>Phone:</b> {doctor.phone}
          </Typography>
          <Typography>
            <b>Experience:</b> {doctor.experience}
          </Typography>
          <Typography>
            <b>Timings:</b> {doctor.timings.start} - {doctor.timings.end}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default Doctorlist;
