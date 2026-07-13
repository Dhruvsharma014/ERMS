import {
  Box,
  Paper,
  Typography,
  Stack,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import api from "../../constants/Api";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import loginBg from "../../assets/loginPageBg.png";


const ForgotPassword = () => {

  const navigate = useNavigate();
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
         <IconButton onClick={()=>navigate('/login')} sx={{color:'white'}}>
          <ArrowBackIcon />
        </IconButton>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{textAlign:"center",mb:3}}

          color="white"
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
