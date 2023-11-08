import {
  Box,
  Fade,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { React, useEffect } from "react";
import axios from "axios";
import { Card } from "antd";
import "../styles/styles.css";

const HomePage = () => {
  try {
  } catch (error) {
    console.log(`error from home page = ${error}`);
  }
  return (
    <Box>
      <Stack
        direction={"row"}
        sx={{ m: 1, p: 1 }}
        spacing={2}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Card id="menu">
          <List>
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <CircleIcon />
                </ListItemIcon>
                <ListItemText>this is text</ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem></ListItem>
            <ListItem></ListItem>
          </List>
        </Card>
        <Card id="menu">card 2</Card>
        <Card id="menu">card 3</Card>
        <Card id="menu">card 4</Card>
      </Stack>
    </Box>
  );
};

export default HomePage;
