import { Paper, Stack, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import EChartsReactCore from 'echarts-for-react/lib/core';
import { visitorInsightsData } from './visitor-insights-data.tsx';
import VisitorInsightsChart from './VisitorInsightsChart.tsx';

// Type definition for the legend state
type LegendState = {
  'loyal customers': boolean;
  'new customers': boolean;
  'unique customers': boolean;
};


const VisitorInsights = () => {
  const chartRef = useRef<EChartsReactCore | null>(null);

  // State to handle legend toggle status
  const [legend, setLegend] = useState<LegendState>({
    'loyal customers': false,
    'new customers': false,
    'unique customers': false,
  });

  // Function to handle toggling of legends
  const handleLegendToggle = (name: string) => {
    if (name in legend) { // Check if name is a valid key in legend state
      setLegend((prevState) => ({
        ...prevState,
        [name]: !prevState[name],
      }));

      // Toggle chart legend selection using ECharts instance
      if (chartRef.current) {
        const instance = chartRef.current.getEchartsInstance();
        instance.dispatchAction({
          type: 'legendToggleSelect',
          name: name,
        });
      }
    }
  };

  return (
    <Paper sx={{ p: { xs: 2, sm: 3 } }}>
      <Typography variant="h6" color="primary.dark" mb={4}>
        Visitor Insights
      </Typography>

      {/* Render the chart with reference for later manipulation */}
      <VisitorInsightsChart chartRef={chartRef} data={visitorInsightsData} style={{ height: 176 }} />

      {/* Responsive legend toggles */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="center"
        alignItems="flex-start"
        mt={4}
        px={{ xs: 0, sm: 1, lg: 0 }}
        rowGap={2}
        columnGap={{ sm: 2, md: 1, lg: 2, xl: 1 }}
      >
        {/* <LegendToggleButton
          name="View Data"
          icon="ic:round-square"
          color="secondary.darker"
          legend={legend}
          onHandleLegendToggle={handleLegendToggle}
        /> */}

        {/* <LegendToggleButton
          name="new customers"
          icon="ic:round-square"
          color="error.darker"
          legend={legend}
          onHandleLegendToggle={handleLegendToggle}
        /> */}

        {/* <LegendToggleButton
          name="unique customers"
          icon="ic:round-square"
          color="success.darker"
          legend={legend}
          onHandleLegendToggle={handleLegendToggle}
        /> */}
      </Stack>
    </Paper>
  );
};

export default VisitorInsights;
