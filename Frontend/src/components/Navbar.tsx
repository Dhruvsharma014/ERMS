import{ AppBar, Box, Button, IconButton, Toolbar,Drawer, Typography, Dialog, DialogTitle,  DialogContent, DialogContentText, DialogActions, Stack } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import MenuIcon from "@mui/icons-material/Menu";
import api from "../constants/Api";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
const Navbar = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
   const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const {auth,setAuth} = useAuth();

  const logoutHandler = async ()=>{
    const response = await axios.post(api.admin.logout,{},{withCredentials:true});
    setAuth(null)
    toast.success(response.data.message,{
      autoClose:1000
    })
    navigate('/')
  }

    return(
        <Box sx={{ position:'sticky', top:0, zIndex: 1000 }}>
      <AppBar position="static" sx={{ bgcolor: "#F8FAFC",color: "#0F172A " }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
       
          
        <Typography variant="h6" component="div" sx={{ flexGrow: 1,  display: {
      xs: "none", 
      md: "block", 
    }, }}>
        {  console.log(auth)}
          {auth?.userEmail || "My App"}
        </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ mr: 2,display:{xs:"block", md:"none"} }}
          >
            <MenuIcon />
            <Typography>

            </Typography>
          </IconButton>
          <Box sx={{flexGrow: 1, display: "flex", justifyContent: "flex-end"}}>
            <Button sx={{bgcolor:"#3E52A0",color:'white'}}  color="inherit" onClick={()=>{
             setLogoutDialogOpen(true)
            }}>Logout</Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Sidebar onClose={toggleDrawer(false)}/>
      </Drawer>
       <Dialog open={logoutDialogOpen} sx={{textAlign:'center'}} onClose={() => setLogoutDialogOpen(false)}>
              <DialogTitle>Logout</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to logout?
                  
                </DialogContentText>
              </DialogContent>
      
              <DialogActions>
                <Stack  direction='row' sx={{width:'100%'}}>
                <Button sx={{flexGrow:1}} onClick={() => setLogoutDialogOpen(false)}>Cancel</Button>
                <Button sx={{flexGrow:1}}
                  color="error"
                  variant="contained"
                  onClick={() => {
                    logoutHandler();
                    setLogoutDialogOpen(false);
                  }}
                >
                  Logout
                </Button>
                  
                </Stack>
              </DialogActions>
            </Dialog>
    </Box>
    )
}
export default Navbar;