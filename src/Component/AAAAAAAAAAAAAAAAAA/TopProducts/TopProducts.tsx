import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { topProducts } from './top-products.ts';
import TopProduct from './TopProduct.tsx';
import React from 'react';

const TopProducts = () => {
  return (
    <Paper style={{background:"transperant"}} sx={{ pt: 3 }}>
      <Typography variant="h4" color="primary.dark" px={3} mb={1.25}>
      <p style={{fontSize:"15px", color:"blue"}}>
        Top Products
      </p>
      </Typography>

      <Box sx={{ overflow: 'auto' }}>
        <Table aria-label="top products table">
          <TableHead>
            <TableRow>
            <TableCell sx={{ fontSize: "12px" }}>#</TableCell>
            <TableCell sx={{ fontSize: "12px" }}>Name</TableCell>
            <TableCell sx={{ fontSize: "12px" }}>Popularity</TableCell>
            <TableCell sx={{ fontSize: "12px" }}>Sales</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {topProducts.map((product) => (
              <TopProduct key={product.id} product={product} />
            ))}
          </TableBody>
        </Table>
      </Box>
    </Paper>
  );
};

export default TopProducts;
