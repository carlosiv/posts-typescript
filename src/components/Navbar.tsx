import { Paper, Stack, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { User } from "../types";

type NavbarProps = {
  user: User | null;
};

const Navbar = (props: NavbarProps) => {
  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "space-between",
        height: "50px",
        paddingLeft: "30px",
        paddingTop: "20px",
      }}
    >
      <Stack direction="row" spacing={3}>
        <Typography component="h1" fontSize="20px">
          <NavLink
            to="/home"
            style={({ isActive }) =>
              isActive
                ? {
                    color: "#9c27b0",
                    textDecoration: "none",
                    fontWeight: "bold",
                  }
                : {
                    color: "#1976d2",
                    textDecoration: "none",
                    fontWeight: "normal",
                  }
            }
          >
            Post It!
          </NavLink>
        </Typography>
        <Typography component="h1" fontWeight="bold" fontSize="20px">
          <NavLink
            to="/dashboard"
            style={({ isActive }) =>
              isActive
                ? {
                    color: "#9c27b0",
                    textDecoration: "none",
                    fontWeight: "bold",
                  }
                : {
                    color: "#1976d2",
                    textDecoration: "none",
                    fontWeight: "normal",
                  }
            }
          >
            Dashboard
          </NavLink>
        </Typography>
      </Stack>
      <Typography mr={2} fontWeight="bold">
        {props.user?.username.toUpperCase()}
      </Typography>
    </Paper>
  );
};

export default Navbar;
