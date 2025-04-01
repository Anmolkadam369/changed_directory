import { Divider, Paper, Stack, SvgIcon, Typography } from '@mui/material';
import { useMemo, useRef, useState } from 'react';
import EChartsReactCore from 'echarts-for-react/lib/core';
import { customerSatisfaction } from './customer-satisfaction.ts';
import { getTotal } from './utils.ts';
import Pin from './Pin.tsx';
import CustomerSatisfactionChart from './CustomerSatisfactionChart.tsx';
import React from 'react';

const CustomerSatisfaction = () => {
    const chartRef = useRef<EChartsReactCore | null>(null);
    const [legend, setLegend] = useState({
        'last month': false,
        'this month': false,
    });

    const totalLastMonthSatisfaction = useMemo(
        () => getTotal(customerSatisfaction['last month']),
        [customerSatisfaction['last month']],
    );
    const totalThisMonthSatisfaction = useMemo(
        () => getTotal(customerSatisfaction['this month']),
        [customerSatisfaction['this month']],
    );

    const handleLegendToggle = (name: keyof typeof legend) => {
        setLegend((prevState) => ({
            ...prevState,
            [name]: !prevState[name],
        }));

        if (chartRef.current) {
            const instance = chartRef.current.getEchartsInstance();
            instance.dispatchAction({
                type: 'legendToggleSelect',
                name: name,
            });
        }
    };

    return (
        <Paper style={{background:"aliceblue"}} sx={{ py: 3, px: 1.5 }}>
            <Typography variant="h4" color="primary.dark" mb={3}>
            <p style={{fontSize:"15px", color:"blue"}}>
                Customer Satisfaction
            </p>
            </Typography>

            <CustomerSatisfactionChart
                chartRef={chartRef}
                data={customerSatisfaction}
                style={{ height: 182 }}
            />

            <Stack
                direction="row"
                justifyContent="center"
                divider={<Divider orientation="vertical" flexItem sx={{ height: 24 }} />}
                sx={{ borderTop: 1, borderColor: 'grey.A100', pt: 2 }}
                gap={2}
            >
                {/* <LegendToggleButton
                    name="Last Month"
                    svgIcon={Pin}
                    color="info.main"
                    value={currencyFormat(totalLastMonthSatisfaction)}
                    legend={legend} onHandleLegendToggle={function (name: string | number): void {
                        throw new Error('Function not implemented.');
                    }}        //   onHandleLegendToggle={handleLegendToggle}
                />
                <LegendToggleButton
                    name="This Month"
                    svgIcon={Pin}
                    color="success.dark"
                    value={currencyFormat(totalThisMonthSatisfaction)}
                    legend={legend} onHandleLegendToggle={function (name: string | number): void {
                        throw new Error('Function not implemented.');
                    }}
                //   onHandleLegendToggle={handleLegendToggle}
                /> */}


                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <SvgIcon component={Pin} style={{ marginRight: '4px' }} />
                    <p>Last Month</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <SvgIcon component={Pin} style={{ marginRight: '4px' }} />
                    <p>This Month</p>
                </div>
            </Stack>
        </Paper>
    );
};

export default CustomerSatisfaction;
