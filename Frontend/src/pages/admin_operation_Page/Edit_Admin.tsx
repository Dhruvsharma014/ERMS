import {
  Box,
  Paper,
  Typography,
  Stack,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../constants/Api";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

const Edit_Admin = () => {
  const { emailId } = useParams();
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [role, setRole] = useState("");
  const [checkEmail, setCheckEmail] = useState("");
  const [checkPassword, setCheckPasword] = useState("");
  const [checkRole, setCheckRole] = useState("");
  const [id, setId] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${api.admin.view}/${emailId}`, {
        withCredentials: true,
      });
      setEmail(response.data.admin[0].email);
      setCheckEmail(response.data.admin[0].email);

      setPasword(response.data.admin[0].password);
      setCheckPasword(response.data.admin[0].password);

      setRole(response.data.admin[0].userType);
      setCheckRole(response.data.admin[0].userType);

      setId(response.data.admin[0]._id);
    };
    fetchData();
  }, [emailId]);


   const {auth} = useAuth();
  const navigate = useNavigate();

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const [showPassword, setShowPassword] = useState<any>(false);

  const submitHandler = async () => {
    const data: { email?: string; password?: string; userType?: string } = {};
    if (checkEmail !== email) {
      data.email = email;
    }
    if (checkPassword !== password) {
      data.password = password;
    }
    if (checkRole !== role) {
      data.userType = role;
    }

    if (Object.keys(data).length === 0) {
      navigate("/admin-operation");
      return;
    }

    const payload = data;
    console.log(payload);
    try {
      const response = await axios.patch(
        `/admin/edit/${id}`,
        payload,
        {
          withCredentials: true,
        },
      );
      console.log(response);
      const status = response.status;
      if (status > 199 && status < 300) {
        toast.success("Changes Successfully done");
        navigate('/admin-operation')
      } else {
        toast.error("Failed to Changes ");
      }
      // navigate("/admin");
    } catch (error) {
      console.log(error);
      toast("Failed to Log in ");
    }
     
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        position: "relative",
        overflow: "hidden",
         
    p: 3,
      }}
    >
      {/* Login Card */}

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
          Edit Admin
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
            label={"Password"}
            type={showPassword ? "text" : "password"}
            value={password}
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
          {auth.userType==="admin"&&
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
              Submit
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Edit_Admin;
