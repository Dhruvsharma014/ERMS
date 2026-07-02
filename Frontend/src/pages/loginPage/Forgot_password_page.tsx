import {
  Box,
  Paper,
  Typography,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import api from "../../constants/Api";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const submitHandler = async () => {
    try{
      setLoading(true)
       const response = await axios.post(
      `${api.admin.forget}${email}`,
      {},
      { withCredentials: true },
    );

    toast.success(response.data.message);
    }
    catch(error:unknown){
      toast.error(error.response?.data?.message);
    }finally{
      setLoading(false)
    }
   
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #111827 0%, #1E293B 50%, #334155 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Circles */}

      <Box
        sx={{
          position: "absolute",
          width: 250,
          height: 250,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.05)",
          top: "10%",
          left: "15%",
          filter: "blur(20px)",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.05)",
          bottom: "10%",
          right: "10%",
          filter: "blur(20px)",
        }}
      />

      <Paper
        elevation={0}
        sx={{
          width: 450,
          p: 5,
          borderRadius: 5,
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.15)",
          color: "white",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontWeight: 700,
            mb: 1,
          }}
        >
          Forgot Password
        </Typography>

        <Typography
          sx={{
            textAlign: "center",
            color: "#CBD5E1",
            mb: 4,
          }}
        >
          Enter your registered email address to receive a password reset link.
        </Typography>

        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Email Address"
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

          <Button
            disabled={!isValidEmail}
            variant="contained"
            size="large"
            onClick={submitHandler}
            sx={{
              py: 1.5,
              borderRadius: 3,
              textTransform: "none",
              fontWeight: 600,
              fontSize: "1rem",
              bgcolor: "#4F46E5",
              "&:hover": {
                bgcolor: "#4338CA",
              },
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Send Reset Link"
            )}
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default ForgotPassword;
