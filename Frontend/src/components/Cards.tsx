import { Card,CardContent,Box,Stack,Typography } from "@mui/material";
import CategoryTwoToneIcon from "@mui/icons-material/CategoryTwoTone";
import PeopleIcon from "@mui/icons-material/People";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";

import AttachMoneyTwoToneIcon from "@mui/icons-material/AttachMoneyTwoTone";
import { CardHoverStyles } from "../theme/componentStyles";
import { useEffect, useState } from "react";
import axios from "axios";



export const cardData = [
  {
    text: "Total Employees",

    trend: "+12 This Month",
    icon: GroupOutlinedIcon,
  },
  {
    text: "Total Admin",

    trend: "+5 This Month",
    icon: PeopleIcon,
  },
  {
    text: "Total Projects",
    value: 75,
    trend: "+3 This Month",
    icon: CategoryTwoToneIcon,
  },
  {
    text: "Total Revenue",
    value: "$1.2M",
    trend: "+10% This Month",
    icon: AttachMoneyTwoToneIcon,
  },
  {
    text: "Total Client",
    value: "1201",
    trend: "-10% This Month",
    icon: CategoryTwoToneIcon,
  },
  {
    
  text: "Payroll",
  value: "₹8.45L",
  trend: "+10% This Month",
  icon: AttachMoneyTwoToneIcon,

  },
];

type CardItem = {
  text: string;
  value?: string | number;
  trend?: string;
  icon: React.ElementType;
};

type CardProps = {
  items: CardItem;
};

export const CardComponent = ({items}:CardProps ) => {
  const [data,setData]  = useState<any>({})

  useEffect(()=>{
  const fetchData = async () => {
    const response = await axios.get("/dashboard/data", {
      withCredentials: true,
    });
    setData(response.data);
    console.log(response.data.totalUser);
    console.log(response.data.totalAdmin);
  }
  fetchData();
},[])

  const { text, value, icon: Icon } = items;
  return (
    <Card
      sx={{
        bgcolor: "white ",
        position: "relative",
        borderRadius: "10%",
        overflow: "visible",
        ...CardHoverStyles,
      }}
    >
      <CardContent>
        <Box>
          <Stack sx={{ position: "absolute", top: -20, left: -20 }}>
            <Icon
              className="card-icon"
              sx={{
                fontSize: 30,
                bgcolor: "#3E52A0",
                color: "white",
                p: 1,
                borderRadius: 50,
              }}
            />
          </Stack>
          <Stack
            direction="column"
            sx={{ alignItems: "center", justifyContent: "flex-end" }}
          >
            <Typography
              className="card-title"
              component="span"
              sx={{ ml: 1, color: "#64748B", mb: 1 }}
            >
              {text}
            </Typography>
            <Typography
              variant="h5"
              className="card-value"
              component="span"
              sx={{ color: "#0F172A", fontSize: "2rem" }}
            >
              {data.totalUser && text === "Total Employees"
                ? data.totalUser
                : data.totalAdmin && text === "Total Admin"
                ? data.totalAdmin
                : value}
            </Typography>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};
