import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Typography,
  Button,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import QueuePlayNextIcon from '@mui/icons-material/QueuePlayNext';
import GroupsIcon from "@mui/icons-material/Groups";
import BadgeIcon from '@mui/icons-material/Badge';


import { CardHoverStyles } from "../theme/componentStyles";
import { useNavigate,useLocation } from "react-router-dom";
const Sidebar = ({ onClose }: { onClose: () => void }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
          { text: "Dashboard", icon: DashboardIcon, path: "/dashboard" },
          { text: "Admin Operation", icon: QueuePlayNextIcon, path: "/admin-operation" },
          { text: "Employee Operation", icon: BadgeIcon, path: "/employee-operation" },
          // { text: "Payroll", icon: PaidIcon, path: "/payroll" },
          
        ]

  return (
    <Box
      sx={{
        bgcolor: "#0F172A",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{ display: "flex", alignItems: "center", gap: 1.5, px: 2, py: 2 }}
      >
        <GroupsIcon
          sx={{
            fontSize: 30,
            color: "white",
            borderRadius: "50%",
            bgcolor: "#3E52A0",
            p: 1,
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{ color: "white", fontWeight: 700, lineHeight: 1.1 }}
            variant="h5"
            component="h2"
          >
            Effigy
          </Typography>
          <Typography variant="caption" sx={{ color: "#b3bece", mt: 0.5 }}>
            ERS SYSTEM
          </Typography>
        </Box>
        <Divider sx={{ mt: "6px" }} />
      </Box>
      <List
        sx={{
          flex: 1,
          overflowY: "auto",
        }}
      >
      
        {menuItems.map((data, index) => (
          <ListItem key={index}>
            <ListItemButton onClick={()=>{navigate(data.path); onClose()}} sx={{...CardHoverStyles ,bgcolor: location.pathname==data.path?"#1e3baf":"transparent" }}>
              <ListItemIcon sx={{ color: "lightgray" }}>
                {<data.icon />}
              </ListItemIcon>
              <ListItemText sx={{ color: location.pathname===data.path?"white": "lightgray" }}>{data.text}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Button
        sx={{
          position: "sticky",
          bottom: "0",
          width: "100%",
          bgcolor: "#3E52A0",
          color: "white",
          "&:hover": { bgcolor: "#1e3baf" },
        }}
      >
        Settings
      </Button>
    </Box>
  );
};
export default Sidebar;
