import {
  Box,
  Paper,
  Typography,
  Stack,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../constants/Api";
import axios from "axios";
import { toast } from "react-toastify";
import loginBg from "../../assets/loginPageBg.png";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const [showPassword, setShowPassword] = useState(false);


  const submitHandler = async () => {
    const payload = {
      email,
      password,
    };

    try {
      const response = await axios.post(api.admin.login, payload, {
        withCredentials: true,
      });
      console.log(response);
      const status = response.status;
      if (status > 199 && status < 300) {
          setAuth(response.data);
        toast.success("Log in Successfully!");
      navigate("/dashboard");
      } else {
        toast.error("Incorrect Email or Password");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Status :", error.response?.status);
        console.log("Data :", error.response?.data);
        console.log("Message :", error.response?.data.message);
        toast.error(error?.response?.data?.message || "error login admin", {
          autoClose: 1200,
        });
      }
    }
  };

  return (

    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `
      linear-gradient(
        rgba(15, 23, 42, 0.50),
        rgba(15, 23, 42, 0.65)
      ),
      url(${loginBg})
    `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
        overflow: "hidden",
      }}
    >
      
      {/* Login Card */}

      <Paper
        elevation={0}
        sx={{
          width: 420,
          p: 5,
          borderRadius: 5,
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.2)",
          color: "white",
        }}
      >
        

        <IconButton onClick={()=>navigate('/')} sx={{color:'white'}}>
          <ArrowBackIcon />
        </IconButton>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{textAlign:"center",mb:3}}

          color="white"
        >
          Login
        </Typography>
        

        <Stack spacing={3}>
          <TextField
            label="Email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                bgcolor: "rgba(28, 16, 16, 0.15)",
                color: "white",

                "& fieldset": {
                  borderColor: "#64748B", // Default outline
                },

                "&:hover fieldset": {
                  borderColor: "#94A3B8", // Hover outline
                },

                "&.Mui-focused fieldset": {
                  borderColor: "lightgray", // Focus outline
                },
              },

              "& .MuiInputLabel-root": {
                color: "#CBD5E1",
              },

              "& .MuiInputLabel-root.Mui-focused": {
                color: "white",
              },
            }}
          />

          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPasword(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                bgcolor: "rgba(28, 16, 16, 0.15)",
                color: "white",

                "& fieldset": {
                  borderColor: "#64748B", // Default outline
                },

                "&:hover fieldset": {
                  borderColor: "#94A3B8", // Hover outline
                },

                "&.Mui-focused fieldset": {
                  borderColor: "lightgray", // Focus outline
                },
              },

              "& .MuiInputLabel-root": {
                color: "#CBD5E1",
              },

              "& .MuiInputLabel-root.Mui-focused": {
                color: "white",
              },
            }}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <Stack spacing={1}>
            <Button
              disabled={!isValidEmail && password.length < 8}
              type="submit"
              variant="contained"
              size="large"
              sx={{
                py: 1.5,
                borderRadius: 3,
                textTransform: "none",
                fontWeight: 600,
                fontSize: "1rem",
                bgcolor: "#0D47A1",
              }}
              onClick={submitHandler}
            >
              Sign In
            </Button>

            <Button
              type="submit"
              variant="text"
              size="small"
              sx={{
                textTransform: "none",
                color: "white",
                fontSize: "1rem",
              }}
              onClick={() => navigate("/forgotpassword")}
            >
              Forgot Password
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Box>

  );
};

export default Login;
