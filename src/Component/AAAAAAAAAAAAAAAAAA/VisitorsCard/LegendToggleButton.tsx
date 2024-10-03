import React from 'react';
import { Button, Typography } from '@mui/material';

interface LegendToggleButtonProps {
  name: string;
  icon: string; // Assuming the icon is a string for the icon library you are using
  color: string; // Color prop for the button
  legend: Record<string, boolean>; // Legend state
  onHandleLegendToggle: (name: string) => void; // Function to handle toggle
}

const LegendToggleButton: React.FC<LegendToggleButtonProps> = ({
  name,
  icon,
  color,
  legend,
  onHandleLegendToggle,
}) => {
  return (
    <Button
      variant={legend[name] ? 'contained' : 'outlined'}
      // color={color}
      onClick={() => onHandleLegendToggle(name)}
      sx={{ display: 'flex', alignItems: 'center' }}
    >
      <span className={icon}></span>
      <Typography variant="body2" ml={1}>
        {name}
      </Typography>
    </Button>
  );
};

export default LegendToggleButton;
