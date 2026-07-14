import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import api from "../../constants/Api";
import axios from "axios";
import {
 
  ArrowBack as ArrowBackIcon,
 
} from "@mui/icons-material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Avatar,
  Box,

  IconButton,
  Stack,
  TablePagination,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/dateFormat";

import { BACKEND_URL } from "../../config/config";

const EmployeeList = () => {
  const navigate = useNavigate();
  const [admin_Data, setAdmin_Data] = useState<any>([]);

  const [page, setPage] = useState<Number>(0);
  const [rowPerPage, setRowPerPage] = useState<Number>(5);
  const [totalUser, setTotalUser] = useState<Number>(0);

  useEffect(() => {
    const fetchAdmin = async () => {
      const user = await axios.get(
        `${api.user.view}?page=${page + 1}&limit=${rowPerPage}`,
      );
      setAdmin_Data(user.data.user);
      setTotalUser(user.data.totalUser);
    };
    fetchAdmin();
  }, [page, rowPerPage]);


  return (
    <Box sx={{ height: "100%",p:2 }}>
    
     <IconButton
                      onClick={() => navigate("/")}
                      sx={{ color: "#1E3A8A" }}
                    >
                      <ArrowBackIcon />
                    </IconButton>

      <Stack sx={{ width: "100%", alignItems: "center" }}>
       
        <Paper sx={{ width: "100%" }}>
          <TableContainer sx={{ Height: "500px", overflowY: "auto" }}>
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
                <TableRow sx={{ color: "red" }}>
                  <TableCell>Photo</TableCell>
                  <TableCell>Email</TableCell>

                  <TableCell>Name</TableCell>

                  <TableCell>Technology</TableCell>
                  <TableCell>Experience</TableCell>
                  <TableCell>Created</TableCell>
                  <TableCell>Updated</TableCell>
                  <TableCell align="center">Action</TableCell>
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
                {admin_Data.length === 0
                  ? "No Data"
                  : admin_Data.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Avatar
                            src={`${BACKEND_URL}/uploads/photos/${item.photo}`}
                          />
                        </TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>
                          {item.firstName} {item.lastName}
                        </TableCell>
                        <TableCell>{item.technology}</TableCell>
                        <TableCell>{item.experience}</TableCell>
                        <TableCell>{formatDate(item.createdAt)}</TableCell>
                        <TableCell>{formatDate(item.updatedAt)}</TableCell>

                        <TableCell
                          sx={{
                            display: "flex",
                            gap: 2,
                            justifyContent: "center",
                          }}
                        >
                          <IconButton
                            onClick={() =>
                              navigate(`/employee-list/view/${item._id}`)
                            }
                            sx={{
                              bgcolor: "#E8EEFF",
                              color: "#2A3B75",
                              borderRadius: "50%",
                              "&:hover": {
                                bgcolor: "#3E52A0",
                                color: "white",
                              },
                            }}
                          >
                            <VisibilityIcon />
                          </IconButton>
                        
                         
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <Paper
          sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
        >
          <TablePagination
            count={totalUser}
            page={page}
            rowsPerPage={rowPerPage}
            onPageChange={(e, newPage) => {
              setPage(newPage);
            }}
            onRowsPerPageChange={(e) => {
              setRowPerPage(parseInt(e.target.value));
            }}
            rowsPerPageOptions={[5, 10, 20]}
          />
        </Paper>
      </Stack>

  
    </Box>
  );
};
export default EmployeeList;
