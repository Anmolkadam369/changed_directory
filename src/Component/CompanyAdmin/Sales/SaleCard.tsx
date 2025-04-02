import { Card, CardContent, Stack, Typography } from '@mui/material';
import IconifyIcon from './Iconify.tsx';
import { SaleItem } from './sales.ts';
import React from 'react';

const SaleCard = ({ item }: { item: SaleItem }) => {
    const { value, label, growth, bgColor, iconBackgroundColor, icon, svgIcon: SvgIcon } = item;
  
    const Icon = icon ? (
      <IconifyIcon icon={icon} sx={{ fontSize: 16, color: 'common.white' }} />
    ) : SvgIcon ? (
      <SvgIcon sx={{ fontSize: 20 }} />
    ) : null;
  
    return (
      <Card
        sx={{
          borderRadius: 3, // Make the corners less rounded
          bgcolor: bgColor,
          width: '250px',
          gap:"10px"
        }}
      >
        <CardContent sx={(theme) => ({ p: { xs: `${theme.spacing(1.5)} !important` } })}>
          <Stack
            sx={{
              width: 24,  // Reduced size for the icon container
              height: 24,
              borderRadius: '50%',
              bgcolor: iconBackgroundColor,
              justifyContent: 'center',
              alignItems: 'center',
              mb: 1.5,  // Adjust margin to reduce spacing
            }}
          >
            {Icon}
          </Stack>
  
          <Typography variant="h5" color="primary.darker" mb={0.5}>
            {value}
          </Typography>
          <Typography variant="body2" color="grey.800" component="p" mb={0.5}>
            {label}
          </Typography>
          <Typography variant="caption" color="text.secondary" component="p">
            Last day {growth}
          </Typography>
        </CardContent>
      </Card>
    );
  };
  

export default SaleCard;
