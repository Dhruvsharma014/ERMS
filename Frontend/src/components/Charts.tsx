import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import {Grid,Card,Typography,Box} from '@mui/material'
import {ChartsHoverStyles} from '../theme/componentStyles'
const departmentData = [
  { department: "Engineering", employees: 45 },
  { department: "Sales", employees: 30 },
  { department: "Marketing", employees: 20 },
  { department: "Finance", employees: 15 },
  { department: "HR", employees: 12 },
];
const attendanceData = [76, 94, 58, 87, 95, 79];




  function SimpleBarChart() {
  return (
    <BarChart 
       dataset={departmentData}
      yAxis={[
        {
          scaleType: "band",
          dataKey: "department",
        },
      ]}
      series={[
        {
          dataKey: "employees",
          label: "Employees",
        },
      ]}
           layout="horizontal"
      height={200}
    />
  );
}

  function SimpleLineChart() {
  return (
    <LineChart
      xAxis={[{ scaleType: "point",
          data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] }]}
      series={[
        {
          data: attendanceData,
          label: "Attendance %",
          area: false,
        },
      ]}
      height={200}
    />
  );
}

  function SimplePieChart() {
  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: 40, label: '0-2 Years' },
            { id: 1, value: 15, label: '2-5 Years' },
            { id: 2, value: 20, label: '5+ Years' },
          ],
          innerRadius:50,
          outerRadius:90,
          paddingAngle:3,
          cornerRadius:5
        },
      ]}
     
      height={200}
    />
  );
}

export const ChartSection = ()=>{
return(
  <>
    <Grid size={{xs:12,md:4}}>
            <Card sx={{p:2,borderRadius:2,...ChartsHoverStyles}}>
              <Typography variant="h6" sx={{fontWeight:700}}>
                 Department Headcount
              </Typography>
              <Box sx={{
                height:200
              }}>
              <SimpleBarChart/>
              </Box>
            </Card>
    </Grid>
    <Grid size={{xs:12,md:4}}>
            <Card sx={{p:2,borderRadius:2,...ChartsHoverStyles}}>
              <Typography variant="h6" sx={{fontWeight:700}}>
                   Attendance Trend
              </Typography>
              <Box sx={{
                height:200
              }}>
              <SimpleLineChart/>
              </Box>
              
            </Card>
    </Grid>
    <Grid size={{xs:12,md:4}}>
            <Card sx={{p:2,borderRadius:2,...ChartsHoverStyles}}>
              <Typography variant="h6" sx={{fontWeight:700}}>
                   Experience Distribution
              </Typography>
              <Box sx={{
                height:200
              }}>
              <SimplePieChart/>
              </Box>
            </Card>
    </Grid>
  </>
)
}