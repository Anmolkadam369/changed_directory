import React from 'react';
import { SvgIconProps } from '@mui/material';
// import OrderIcon from 'components/icons/OrderIcon';
// import SalesIcon from 'components/icons/SalesIcon';

export interface SaleItem {
  label: string;
  value: string;
  growth: string;
  bgColor: string;
  iconBackgroundColor: string;
  icon?: string;
  svgIcon?: (props: SvgIconProps) => JSX.Element;
}

export const sales: SaleItem[] = [
  {
    label: 'Total Sales',
    value: '$1k',
    growth: '+8%',
    bgColor: '#e1b2b2',
    iconBackgroundColor: 'error.main',
    icon: 'material-symbols:person-add',
    
  },
  {
    label: 'Total Order',
    value: '300',
    growth: '+5%',
    bgColor: '#d9ed00',
    iconBackgroundColor: 'error.dark',
    icon: 'ion:pricetag',
  },
  {
    label: 'Sold',
    value: '5',
    growth: '+1.2%',
    bgColor: '#99f1b2',
    iconBackgroundColor: 'success.darker',
    icon: 'ion:pricetag',
  },
  {
    label: 'Customers',
    value: '8',
    growth: '+0.5%',
    bgColor: '#a499f1',
    iconBackgroundColor: 'secondary.main',
    icon: 'material-symbols:person-add',
  },
];
