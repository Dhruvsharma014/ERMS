import React from "react";
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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
  TablePagination,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Admin_operation = () => {
  const navigate = useNavigate();
  const [admin_Data, setAdmin_Data] = useState<any>([]);
  const [open, setOpen] = useState<any>("");
  const [storeId, setStoreId] = useState<any>("");

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [totalAdmin, setTotalAdmin] = useState(0);

  const { auth } = useAuth();

  useEffect(() => {
    const fetchAdmin = async () => {
      const admin = await axios.get(
        `${api.admin.view}?page=${page + 1}&limit=${rowsPerPage}`,
      );
      setAdmin_Data(admin.data.admin);
      setTotalAdmin(admin.data.totalAdmin);
    };
    fetchAdmin();
  }, [page, rowsPerPage]);

  const deleteHandler = async () => {
    const id = storeId;
    try {
      await axios.delete(`${api.admin.delete}/${id}`);
      setAdmin_Data((prev: any) => prev.filter((data: any) => data._id !== id));
      toast.success("Deleted Successfully", {
        autoClose: 1000,
      });
    } catch (error: any) {
      toast.error("delete Failed");
    }
    navigate("/admin-operation");
  };

  return (
    <Box>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "end" }}>
        <Button
          sx={{ width: "100px", mb: 2, color: "white", bgcolor: "#3E52A0" }}
          onClick={() => navigate("//admin-operation/add-admin")}
        >
          <AddIcon />

          <Typography variant="body1">Add</Typography>
        </Button>
      </Box>

      <Stack sx={{ width: "100%", alignItems: "center", display: "flex" }}>
        <Paper sx={{ width: "100%" }}>
          <TableContainer sx={{ maxHeight: "500px", overflowY: "auto" }}>
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
                  <TableCell>Email</TableCell>
                  <TableCell>Password</TableCell>

                  <TableCell>Roles</TableCell>

                  <TableCell>Action</TableCell>
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
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{item.password}</TableCell>
                        <TableCell>{item.userType}</TableCell>
                        <TableCell sx={{ display: "flex", gap: 2 }}>
                          <IconButton
                            onClick={() =>
                              navigate(
                                `/admin-operation/edit-admin/${item.email}`,
                              )
                            }
                            sx={{
                               bgcolor: "#E6F9F0",
  color: "#1A5C3D",
  borderRadius: "50%",
  transition: "all 0.2s ease-in-out", // Smooth color blending
  "&:hover": {
    bgcolor: "#2A7F54", // Rich, professional green
    color: "#FFFFFF",
    transform: "scale(1.05)", // Subtle tactile pop
  },
                            }}
                          >
                            <EditIcon></EditIcon>
                          </IconButton>

                          {auth?.userType === "admin" && (
                            <IconButton
                              onClick={() => {
                                setOpen(true);
                                setStoreId(item._id);
                              }}
                              sx={{
                                bgcolor: "#FDECEA",
                                color: "#8B2620",
                                borderRadius: "50%",
                                "&:hover": {
                                  bgcolor: "red",
                                },
                              }}
                            >
                              <DeleteIcon></DeleteIcon>
                            </IconButton>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack sx={{ display: "flex", justifyContent: "flex-end" }}></Stack>
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
          >
            <TablePagination
              component={"div"}
              count={totalAdmin}
              page={page}
              onPageChange={(e, newpage) => setPage(newpage)}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={(e) => {
                setRowsPerPage(parseInt(e.target.value));
                setPage(0);
              }}
              rowsPerPageOptions={[5,10,20]}
            />
          </Box>
        </Paper>
      </Stack>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Delete Admin</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this admin
            <br />
            This action cannot be undone
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
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
export default Admin_operation;
