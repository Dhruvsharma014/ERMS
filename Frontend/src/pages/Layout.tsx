import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const DashboardLayout = () => {
  return (
    <Grid container sx={{ height: "100vh" }}>
      {/* Sidebar */}
      <Grid
        size={{ xs: 12, md: 2 }}
        sx={{ height: "100vh", display: { xs: "none", md: "block" } }}
      >
        <Sidebar onClose={() => null} />
      </Grid>

      {/* Main Content */}
      <Grid
        size={{ xs: 12, md: 10 }}
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Navbar />

        {/* Outlet Container */}
        <Box
          sx={{
            flex: 1,
            bgcolor:'rgba(147, 177, 192, 0.29)',
            overflowY: "auto",
            p: { xs: 1, md: 5 },
          
         
          }}
        >
          <Outlet />
        </Box>
      </Grid>
    </Grid>
  );
};

export default DashboardLayout;