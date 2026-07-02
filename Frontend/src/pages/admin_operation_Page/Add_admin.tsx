import {
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  InputAdornment,
  IconButton,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../../constants/Api";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const Add_admin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState("");
  const {auth} = useAuth();


  const submitHandler = async () => {
    const payload = {
      email,
      password,
      userType: role,
      
    };

    try {
        setLoading(true);
      const response = await axios.post(api.admin.create, payload, {
        withCredentials: true,
      });

      const status = response.status;
      if (status > 199 && status < 300) {
        toast.success(response.data.message, {
          autoClose: 1000
        });
        navigate("/admin-operation")
      } else {
        toast.error(response.data.message, {
          autoClose: 1000,
         
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Status :", error.response?.status);
        console.log("Data :", error.response?.data);
        console.log("Message :", error.response?.data.message);
        toast.error(error?.response?.data?.message || "error creating admin",{
          autoClose: 1200,
        });
      }
    }
    finally {
    setLoading(false);
  }
  };

  return (
    <Stack
      sx={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        position: "relative",
        overflow: "hidden",
      }}
    >
      <Paper
        elevation={20}
        sx={{
         width: 420,
          p: 3,
          borderRadius: 5,
        
          backdropFilter: "blur(20px)",
        }}
      >
         <Stack spacing={3} sx={{mb:2}} direction='row'>

        <IconButton onClick={()=>navigate('/admin-operation')} sx={{color:'#1E3A8A'}}>
          <ArrowBackIcon />
        </IconButton>
        <Typography
          variant="h4"
          fontWeight="bold"
     
          ml='3'
          color="#1E3A8A"
        >
          Add Admin
        </Typography>
        </Stack>

        <Stack spacing={3}>
          <TextField
            label="Email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
           
          />

          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPasword(e.target.value)}
           
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
          {
            auth.userType==='admin'&&
           <Box>
            <FormControl
              fullWidth
             
            >
              <InputLabel>Role</InputLabel>
              <Select 
                value={role}
                label="Role"
                onChange={(e) => setRole(e.target.value)}
              >
                <MenuItem  value={"admin"}>
                  Admin
                </MenuItem>
                <MenuItem value={"management"}>Management</MenuItem>
              </Select>
            </FormControl>
          </Box>
          }
          <Stack spacing={1}>
            <Button
           disabled={loading || !isValidEmail || password.length < 8}
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
              onClick={() => submitHandler()}
            >
               {loading ? (
    <CircularProgress size={24} color="inherit" />
  ) : (
    "Create"
  )}

            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
};
export default Add_admin;
