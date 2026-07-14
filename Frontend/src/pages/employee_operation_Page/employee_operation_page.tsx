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
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Avatar,
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
import { formatDate } from "../../utils/dateFormat";

const Admin_operation = () => {
  const navigate = useNavigate();
  const [admin_Data, setAdmin_Data] = useState<any>([]);
  const [open, setOpen] = useState<any>("");
  const [storeId, setStoreId] = useState<any>("");
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

  const deleteHandler = async () => {
    const id = storeId;
    try {
      await axios.delete(`${api.user.delete}/${id}`);
      setAdmin_Data((prev: any) => prev.filter((data: any) => data._id !== id));
      toast.success("Deleted Successfully");
    } catch (error: any) {
      console.log(error);
      toast.error("delete Failed");
    }
  };

  return (
    <Box sx={{ height: "100%" }}>
      <Box
        sx={{ width: "100%", display: "flex", justifyContent: "end", mb: 2 }}
      >
        <Button
          sx={{ width: "100px", color: "white", bgcolor: "#3E52A0" }}
          onClick={() => navigate("/employee-operation/add-employee")}
        >
          <AddIcon />

          <Typography variant="body1" color="initial">
            Add
          </Typography>
        </Button>
      </Box>

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
                            src={`/uploads/photos/${item.photo}`}
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
                              navigate(`/employee-operation/view/${item._id}`)
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
                          <IconButton
                            onClick={() =>
                              navigate(
                                `/employee-operation/edit-employee/${item._id}`,
                              )
                            }
                            sx={{
                              bgcolor: "#E6F9F0",
                              color: "#1A5C3D",
                              borderRadius: "50%",
                              transition: "all 0.2s ease-in-out",
                              "&:hover": {
                                bgcolor: "#2A7F54",
                                color: "#FFFFFF",
                                transform: "scale(1.05)",
                              },
                            }}
                          >
                            <EditIcon></EditIcon>
                          </IconButton>
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
                                bgcolor: "#D33833",
                                color: "white",
                              },
                            }}
                          >
                            <DeleteIcon></DeleteIcon>
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

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Delete Employee</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this admin
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
