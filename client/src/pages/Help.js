import { Box, Card, Divider, List, Typography } from "@mui/material";
import { Row } from "antd";
import { useNavigate } from "react-router-dom";

const Help = () => {
  const navigate = useNavigate();
  return (
    <>
      <Typography sx={{ mt: 1, ml: 1 }}>
        {" "}
        this documentation helps you to understand walkthrough the whole app
      </Typography>
      <Box
        sx={{ p: 2, m: 1, boxShadow: 5, borderRadius: 5, bgcolor: "primary" }}
      >
        <Row>
          <Card
            sx={{
              p: 1,
              m: 1,
              boxShadow: 5,
              borderRadius: 5,
              cursor: "pointer",
            }}
            onClick={() => navigate("/help/login-help")}
          >
            <Typography>get help for Login</Typography>
            <Divider />
            <List>
              <li> first</li>
            </List>
          </Card>
          <Card
            sx={{
              p: 1,
              m: 1,
              boxShadow: 5,
              borderRadius: 5,
              cursor: "pointer",
            }}
            onClick={() => navigate("/help/register-help")}
          >
            <Typography>get help for Register</Typography>
          </Card>
          <Card
            sx={{
              p: 1,
              m: 1,
              boxShadow: 5,
              borderRadius: 5,
              cursor: "pointer",
            }}
            onClick={() => navigate("/help/doctor-help")}
          >
            <Typography>get help for Doctor</Typography>
          </Card>
          <Card
            sx={{
              p: 1,
              m: 1,
              boxShadow: 5,
              borderRadius: 5,
              cursor: "pointer",
            }}
            onClick={() => navigate("/help/appointment-help")}
          >
            <Typography>get help for Appointment</Typography>
          </Card>
        </Row>
      </Box>
    </>
  );
};

export default Help;
