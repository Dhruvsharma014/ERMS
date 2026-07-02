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
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const navigate = useNavigate();
  const token = useParams();
  const submitHandler = async () => {
    if (password.length < 8) {
      return toast.warning("Password Should be 8 character");
    }
    if (password !== repassword) {
      return toast.error("Both Password is not Same");
    }
    console.log(token);
    const response = await axios.post(
      `${api.admin.reset}${token.token}`,
      { password: password },
      { withCredentials: true },
    );
    toast.success(response.data.message);
    navigate("/");
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
          Reset Password
        </Typography>

        <Stack spacing={3}>
          <TextField
            fullWidth
            label="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                bgcolor: "rgba(255,255,255,0.1)",
                color: "white",
              },
            }}
          />
          <TextField
            fullWidth
            label="Confirm New Password"
            value={repassword}
            onChange={(e) => setRepassword(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                bgcolor: "rgba(255,255,255,0.1)",
                color: "white",
              },
            }}
          />

          <Button
            disabled={password.length < 8}
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
            Confirm
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default ResetPassword;
