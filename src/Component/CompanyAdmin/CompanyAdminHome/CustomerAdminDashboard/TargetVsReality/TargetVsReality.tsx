import { Paper, Stack, Typography } from '@mui/material';
import TargetVsRealityChart from './TargetVsRealityChart.tsx';
import IconifyIcon from '../../../Sales/Iconify.tsx';
import { salesData, targetVsReality } from './target-vs-reality.ts';
import React from 'react';

const TargetVsReality = () => {
  return (
    <Paper style={{background:'antiquewhite'}} sx={{ p: 3  }}>
      <Typography variant="h4" color="primary.dark" mb={1.25}>
      <p style={{fontSize:"15px", color:"violet"}}>
        Target vs Reality
    </p>
      </Typography>

      <TargetVsRealityChart style={{ height: 150 }} data={targetVsReality} />

      <Stack mt={2.25} spacing={1.875}>
        {salesData.map((item) => (
          <Stack key={item.label} direction="row" alignItems="center">
            <Stack
              justifyContent="center"
              alignItems="center"
              sx={{ width: 36, height: 30, bgcolor: item.iconBgColor, borderRadius: 2, mr: 1.25 }}
            >
              <IconifyIcon icon={item.icon} sx={{ color: item.iconColor }} />
            </Stack>
            <div style={{fontSize:"10px"}}>
              <Typography
                variant="caption"
                sx={(theme) => ({
                  color: 'primary.darker',
                  fontWeight: theme.typography.h3.fontWeight,
                  whiteSpace: 'nowrap',
                  fontSize: '10px', 
                })}
              >
                {item.label}
              </Typography>
              <Typography
                sx={(theme) => ({
                  color: 'primary.lighter',
                  fontWeight: 'theme.typography.fontWeightRegular',
                  fontSize: '7px'
                })}
              >
                {item.type}
              </Typography>
            </div>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 'fontWeightMedium',
                color: item.color,
                ml: { xs: 10, sm: 30, md: 10, xl: 5 },
              }}
            >
              {item.value}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Paper>
  );
};

export default TargetVsReality;
