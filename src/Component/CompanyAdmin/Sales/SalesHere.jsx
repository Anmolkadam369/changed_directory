import { Button, Grid, Paper, Stack, Typography } from '@mui/material';
// import IconifyIcon from 'components/base/IconifyIcon';
import IconifyIcon from './Iconify';
import { sales } from './sales';
import SaleCard from './SaleCard';

const SalesHere = () => {
  return (
    <Paper sx={{ pt: 2.875, pb: 4, px: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={5.375}>
        <div>
          <Typography variant="h4" mb={0.5}>
            Today's Sales
          </Typography>
          <Typography variant="subtitle1" color="primary.lighter">
            Sales Summary
          </Typography>
        </div>
        <Button
          style={{ fontSize: "8px" }}
          variant="outlined"
          startIcon={<IconifyIcon icon="solar:upload-linear" />}
        >
          Export
        </Button>

      </Stack>

      <Grid container spacing={{ xs: 3.875, xl: 2 }} columns={{ xs: 1, sm: 2, md: 4 }}>
        {sales.map((item) => (
          <Grid item xs={1} key={item.label}>
            <SaleCard item={item} />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default SalesHere;
