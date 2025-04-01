import React from 'react';
import { Typography, Grid, Paper, Stack, Button } from '@mui/material';
import IconifyIcon from './Iconify.tsx';
import { sales } from '../Data/sales.ts';
import SaleCard from './SaleCard.tsx';


const Sales = () => {
    return (
        <Paper sx={{ pt: 1, pb: 2, px: 2 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
            <div>
              <Typography variant="h6" mb={0.25}>
                Today's Sales
              </Typography>
              <Typography variant="body2" color="primary.lighter">
                Sales Summary
              </Typography>
            </div>
            <Button variant="outlined" size="small" startIcon={<IconifyIcon icon="solar:upload-linear" />}>
              Export
            </Button>
          </Stack>
      
          <Grid container spacing={{ xs: 1.25, xl: 1 }} columns={{ xs: 1, sm: 2, md: 4 }}>
            {sales.map((item) => (
              <Grid item xs={1} key={item.label}>
                <SaleCard item={item} />
              </Grid>
            ))}
          </Grid>
        </Paper>
      );
      
};

export default Sales;