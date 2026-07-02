import {
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  IconButton,

  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import {
  Edit,
  Delete,
  Download,
  ArrowBack as ArrowBackIcon, 
  Article as ArticleIcon,
} from "@mui/icons-material";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import api from "../../constants/Api";
import { toast } from "react-toastify";
const View_employee = () => {
  const { id } = useParams();

  const [employee, setEmployee] = useState(null);
      const [open, setOpen] = useState<any>("");
    const navigate =useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      const response = await axios.get(`${api.user.view}${id}`, {
        withCredentials: true,
      });

      setEmployee(response.data.user);
      console.log(response.data.user.firstName);
    };

    fetchEmployee();
  }, [id]);

  if (!employee) {
    return <Typography>Loading...</Typography>;
  }
   const deleteHandler = async () => {

    try {
      await axios.delete(`${api.user.delete}/${id}`);
      
      toast.success("Deleted Successfully");
      navigate("/employee-operation");
    } catch (error: any) {
      console.log(error);
      toast.error("delete Failed");
    }
  };

  return (
    <Box
      sx={{
        
        minHeight: "100vh",
        p: 4,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
               <Stack spacing={3} sx={{mb:2,mt:2}} direction='row'>

        <IconButton onClick={()=>navigate('/employee-operation')} sx={{color:'#1E3A8A'}}>
          <ArrowBackIcon />
        </IconButton>
        <Typography
          variant="h4"
          fontWeight="bold"
     
          ml='3'
          color="#1E3A8A"
        >
          Employee
        </Typography>
        </Stack>

        <Divider />

        <Grid
          container
          sx={{
            p: 3,
          }}
          spacing={3}
        >
          <Grid
            size={{
              xs: 12,
              md: 3,
            }}
          >
            <Stack spacing={2} alignItems="center">

                <Grid size={{ xs: 12 }} sx={{display:'flex',justifyContent:'center'}}  >
              <Avatar
                src={`http://localhost:5000/uploads/photos/${employee.photo}`}
                sx={{
                  width: 170,
                  height: 170,
                  border: "5px solid #1E3A8A",
                  
                }}
              />

                </Grid>

             

            </Stack>
          </Grid>

          <Grid
            size={{
              xs: 12,
              md: 9,
            }}
          >
            <Typography variant="h4" fontWeight="bold">
              {employee.firstName} {employee.lastName}
            </Typography>

            <Typography color="text.secondary" mb={2}>
              {employee.technology} Developer
            </Typography>

            <Chip label="Active" color="success" />
            <Divider
              sx={{
                my: 4,
              }}
            />
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  First Name
                </Typography>

                <Typography variant="h6" fontWeight={600}>
                  {employee.firstName}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  Last Name
                </Typography>

                <Typography variant="h6" fontWeight={600}>
                  {employee.lastName}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  Email Address
                </Typography>

                <Typography variant="h6" fontWeight={600}>
                  {employee.email}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  Technology
                </Typography>

                <Typography variant="h6" fontWeight={600}>
                  {employee.technology}
                </Typography>
              </Grid>
            </Grid>
            <Divider sx={{ my: 4 }} />
            <Typography variant="h5" fontWeight="bold" color="#1E3A8A" mb={3}>
              Professional Information
            </Typography>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  Experience
                </Typography>

                <Typography variant="h6" fontWeight={600}>
                  {employee.experience} Years
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  Primary Technology
                </Typography>

                <Chip
                  label={employee.technology}
                  color="primary"
                  sx={{ mt: 1 }}
                />
              </Grid>
              <Grid size={{ xs: 12 }} >
                <Typography variant="body2" color="text.secondary" mb={2}>
                  Resume
                </Typography>

                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    borderRadius: 2,
                  }}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}

                  >
                    <Stack direction="row" spacing={2} alignItems="center">
                      <ArticleIcon color="error" />

                      <Typography>{employee.cv}</Typography>
                    </Stack>

                    <Stack direction="row" spacing={2}>
                      <Button 
                        variant="outlined"
                        onClick={() =>
                          window.open(
                            `http://localhost:5000/uploads/cv/${employee.cv}`,
                            "_blank",
                          )
                        }
                      >
                        View
                      </Button>

                      <Button
                        variant="contained"
                        startIcon={<Download />}
                        onClick={() =>
                          window.open(
                            `http://localhost:5000/uploads/cv/${employee.cv}`,
                            "_blank",
                          )
                        }
                      >
                        Download
                      </Button>
                    </Stack>

                  </Stack>
                </Paper>
              </Grid>
            </Grid>
          </Grid>

        </Grid>
      </Paper>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Deleted {employee.firstName}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this admin
            
          </DialogContentText>
        </DialogContent>

        <DialogActions sx={{display:"flex"}}>
          <Button sx={{flexGrow: 1}} onClick={() => setOpen(false)}>Cancel</Button>
          <Button sx={{flexGrow: 1}}
            color="error"
            variant="contained"
            onClick={() => {
              deleteHandler();
              setOpen(false);
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default View_employee;
