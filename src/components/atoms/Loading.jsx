// src/components/atoms/Loading.js
import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const Loading = () => (
  <Box sx={{ display: 'flex' }}>
    <CircularProgress />
  </Box>
);

export default Loading;
