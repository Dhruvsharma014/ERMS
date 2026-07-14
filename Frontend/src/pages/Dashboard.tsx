import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { ChartSection } from "../components/Charts";
import { cardData, CardComponent } from "../components/Cards";
import { useEffect, useState } from "react";
import axios from "axios";
import api from "../constants/Api";
import { useNavigate } from "react-router-dom";


interface Admin{
  id?: string;
  email: string;
}

interface AdminTableProps{
admin_Data: Admin[];
}

const AdminTable = ({ admin_Data }:AdminTableProps) => {
  return (
    <Stack sx={{ width: "100%", alignItems: "center", display: "flex" }}>
      <Paper sx={{ width: "100%" }}>
        <TableContainer  component={Paper}>
          <Table stickyHeader>
            <TableHead
              sx={{
                borderRadius:3,
                width: "100%",
                textAlign: "center",
                "& .MuiTableCell-root": {
                  bgcolor: "#3E52A0",
                  color: "#fff",
                  position: "sticky",
                  top: 0,
                  zIndex: 2,
                },
              }}
            >
              <TableRow>
                <TableCell>Admin</TableCell>
              </TableRow>
            </TableHead>

            <TableBody
              sx={{
                "& .MuiTableCell-root": {
                  color: "black",
                  fontWeight: 500,
                },
              }}
            >
              {admin_Data.length === 0
                ? "No Data"
                : admin_Data.map((item, index:number) => (
                    <TableRow key={index}>
                      <TableCell sx={{ p: 2.34 }}>{item.email}</TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack sx={{ display: "flex", justifyContent: "flex-end" }}></Stack>
      </Paper>
    </Stack>
  );
};

interface Employee{
     _id?:string;
   email:string;
   firstName:string;
   lastName:string;
   photo:string;
}

interface EmployeeTableProps{
  employee_Data:Employee[]
}

const EmployeeTable = ({ employee_Data }:EmployeeTableProps) => {
  return (
    <Stack sx={{ width: "100%", alignItems: "center" }}>
      <Paper sx={{ width: "100%" }}>
        <TableContainer
          component={Paper}
         
        >
          <Table stickyHeader>
            <TableHead
              sx={{
                "& .MuiTableCell-root": {
                  bgcolor: "#3E52A0",
                  color: "#fff",
                  position: "sticky",
                  top: 0,
                  zIndex: 2,
                },
              }}
            >
              <TableRow sx={{ textAlign: "center" }}>
                <TableCell>Photo</TableCell>
                <TableCell>Email</TableCell>

                <TableCell>Name</TableCell>
              </TableRow>
            </TableHead>

            <TableBody
              sx={{
                bgcolor: "",
                "& .MuiTableCell-root": {
                  color: "black",
                  fontWeight: 500,
                },
              }}
            >
              {employee_Data.length === 0
                ? "No Data"
                : employee_Data.map((item, index:number) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Avatar
                          src={`http://localhost:5000/uploads/photos/${item.photo}`}
                        />
                      </TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>
                        {item.firstName} {item.lastName}
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Stack>
  );
};

const Dashboard = () => {
    const navigate = useNavigate();

  const [admin_Data, setAdmin_Data] = useState([]);
  const [employee_Data, setEmployee_Data] = useState([]);

  useEffect(() => {
    const fetchAdmin = async () => {
      const admin = await axios.get(`${api.admin.view}?page=1&limit=5`, {
        withCredentials: true,
      });
      setAdmin_Data(admin.data.admin);
    };

    const fetchEmployee = async () => {
      const employee = await axios.get(`${api.user.view}?page=1&limit=4`, {
        withCredentials: true,
      });
      setEmployee_Data(employee.data.user);
    };

    fetchAdmin();
    fetchEmployee();
  }, []);



  return (
    <Box>
      <Stack spacing={2} sx={{overflow:"hidden"}}>
        <Grid container spacing={5}>
          {cardData.map((data, index) => (
            <Grid key={index}  size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
              <CardComponent  items={data} />
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3}>
          <ChartSection />
        </Grid>

        <Grid container spacing={3}>
          <Grid
            sx={{
              borderRadius: 2,
            }}
            size={{ xs: 12, md: 8 }}
          >
            <Stack
              direction={"row"}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb:1
              }}
            >
              <Typography>Employee Table</Typography>
              <Button sx={{":hover":{
                bgcolor:'#3E52A0',color:'white'
              }}} onClick={()=>navigate('/employee-operation')}>View More</Button>
            </Stack>
            <EmployeeTable employee_Data={employee_Data} />
          </Grid>

          <Grid
            sx={{
              borderRadius: 2,
            }}
            size={{ xs: 12, md: 4 }}
          >
            <Stack
              direction={"row"}
              sx={{
                mb:1,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>Admin Table</Typography>
              <Button sx={{":hover":{
                bgcolor:'#3E52A0',color:'white'
              }}} onClick={()=>navigate('/admin-operation')}>View More</Button>
            </Stack>
            <AdminTable admin_Data={admin_Data} />
          </Grid>

        </Grid>

      </Stack>
    </Box>
  );
};

export { Dashboard, CardComponent };
