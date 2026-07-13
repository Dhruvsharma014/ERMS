

import {
  AppBar,
  Box,
  Button,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";



import { useNavigate } from "react-router-dom";
import { keyframes } from "@mui/system";



import office1 from "../../assets/office1.jpg";
import office2 from "../../assets/office2.jpg";
import office3 from "../../assets/office3.jpg";
import office4 from "../../assets/office4.jpg";
import office5 from "../../assets/office5.jpg";
import office6 from "../../assets/office6.jpg";



const moveUp = keyframes`
0%{
transform:translateY(0);
}
100%{
transform:translateY(-50%);
}
`;

const moveDown = keyframes`
0%{
transform:translateY(-50%);
}
100%{
transform:translateY(0);
}
`;

const leftImages = [
  office1,
  office2,
  office3,
  office1,
  office2,
  office3,
];

const rightImages = [
  office4,
  office5,
  office6,
  office4,
  office5,
  office6,
];

const ImageColumn = ({
  images,
  animation,
}: {
  images: string[];
  animation: any;
}) => {
  return (
    <Box
      sx={{
        width: "24%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          animation: `${animation} 18s linear infinite`,
        }}
      >
        {images.map((img, index) => (
          <Box
            key={index}
            component="img"
            src={img}
            sx={{
              width: "100%",
              height: 280,
              objectFit: "cover",
              borderRadius: 4,
              filter: "brightness(.6)",
              transition: ".4s",

              "&:hover": {
                transform: "scale(1.04)",
                filter: "brightness(.9)",
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

const BackgroundGallery = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        display: "flex",
        justifyContent: "space-between",
        px: 4,
        overflow: "hidden",
      }}
    >
      <ImageColumn
        images={leftImages}
        animation={moveUp}
      />

      <Box sx={{ width: "42%" }} />

      <ImageColumn
        images={rightImages}
        animation={moveDown}
      />
    </Box>
  );
};

import {

  Chip,

} from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';


const HeroSection = () => {
  const navigate = useNavigate();

  return (
   


    <Box
      sx={{
        position: "absolute",
        inset: 0,
        // zIndex: 5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack
        spacing={3}
        alignItems="center"
        textAlign="center"
        sx={{
            
          width: {
            
            xs: "80%",
            md: 650,
          },
          p: 6,
          borderRadius: 6,
          bgcolor: "#3E52A0",
          backdropFilter: "blur(18px)",
          border: "1px solid rgba(255,255,255,.15)",
          boxShadow: "0 30px 60px rgba(0,0,0,.35)",
        }}
      >
        <Chip
          icon={<BusinessCenterIcon />}
          label="Employee Resource Management System"
          sx={{
            // bgcolor: "rgba(79,140,255,.15)",
            color: "#90CAF9",
            fontWeight: 600,
            px: 1,
          }}
        />

        <Typography
          variant="h2"
          sx={{
            color: "white",
            fontWeight: 700,
            lineHeight: 1.2,
          }}
        >
          Manage Your Workforce
          <br />
          Smarter & Faster
        </Typography>

        <Typography
          sx={{
            color: "#CBD5E1",
            fontSize: 18,
            maxWidth: 520,
          }}
        >
          Streamline employee management, attendance, payroll,
          performance, leave, and analytics with one secure platform.
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate("/employee-list")}
            sx={{
              px: 5,
              py: 1.5,
              borderRadius: 10,
            
            
                bgcolor: "#30438A",
              textTransform: "none",
              fontWeight: 600,
              fontSize: 17,

              "&:hover": {
                   bgcolor: "#30438A",
                transform: "translateY(-3px)",
              },
            }}
          >
            View Resource
          </Button>
          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate("/login")}
            sx={{
              px: 5,
              py: 1.5,
              borderRadius: 10,
            
            
                bgcolor: "#30438A",
              textTransform: "none",
              fontWeight: 600,
              fontSize: 17,

              "&:hover": {
                   bgcolor: "#30438A",
                transform: "translateY(-3px)",
              },
            }}
          >
            Login
          </Button>

        </Stack>
      </Stack>
    </Box>
   
  );
};







const Home = () => {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
      
        overflow: "hidden",
        position: "relative",
      }}
    >
      <BackgroundGallery />

      <Box
        sx={{
          // position: "absolute",
          // inset: 0,
          // elevation:'20',
          bgcolor: "rgba(8,17,31,.70)",
     
        }}
      />



<HeroSection />


    </Box>
  );
};

export default Home;