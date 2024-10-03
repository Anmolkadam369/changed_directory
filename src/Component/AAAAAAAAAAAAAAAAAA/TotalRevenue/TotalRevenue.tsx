import { Paper, Typography } from '@mui/material';
import TotalRevenueChart from './TotalRevenueChart.tsx';
import { totalRevenue } from './total-revenue.ts';
import React from 'react';

const TotalRevenue = () => {
  return (
    <Paper style={{background:"lightslategrey"}} sx={{ p: 3 }}>
      <Typography variant="h4" mb={3}>
       <p style={{fontSize:"15px", color:"green"}}>
       Total Revenue
       </p> 
      </Typography>
      <TotalRevenueChart data={totalRevenue} style={{ height: 247 }} />
    </Paper>
  );
};

export default TotalRevenue;
