import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type LoginProps = {
  setUser: React.Dispatch<React.SetStateAction<any>>;
};

const Login = (props: LoginProps) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string | null>("");
  const [password, setPassword] = useState<string | null>("");
  const [formError, setFormError] = useState<string[] | null>(null);
  const { setUser } = props;

  const handleLogin = () => {
    if (username === null || username === "") {
      setFormError(["username"]);
    } else if (password === null || password === "") {
      setFormError(["password"]);
    } else {
      setUser({ username: username, password: password });
      navigate("/home");
    }
  };
  return (
    <Box sx={{ width: "400px", marginX: "auto" }}>
      <Grid item xs={6}>
        <Card sx={{ margin: "8px" }}>
          <CardContent>
            <Typography component="h2" sx={{ fontWeight: "bold" }}>
              Login
            </Typography>
            <Stack spacing={2}>
              <TextField
                error={formError?.includes("username")}
                id="filled-username"
                label="Username"
                variant="filled"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUsername(e.target.value)
                }
                value={username}
                required
                helperText={
                  formError?.includes("username")
                    ? "Please provide Username"
                    : ""
                }
              />
              <TextField
                error={formError?.includes("password")}
                id="filled-password"
                label="Password"
                variant="filled"
                type="password"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                value={password}
                required
                helperText={
                  formError?.includes("password")
                    ? "Please provide Password"
                    : ""
                }
              />
            </Stack>
          </CardContent>
          <CardActions>
            <Button onClick={handleLogin}>Submit</Button>
          </CardActions>
        </Card>
      </Grid>
    </Box>
  );
};

export default Login;
