import React, { useState } from 'react';
import axios from '../api/axios';
import { useHistory } from 'react-router-dom';
import {
  Checkbox,
  Grid,
  TextField,
  FormControlLabel,
  Paper,
  Button,
  Container
} from '@material-ui/core';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/users/register', { username, password });
      history.push('/');
    } catch (error) {
      console.error('Register failed', error);
    }
  };

  return (
    <Container maxWidth="sm">
    <Grid container justify="center" alignItems="center" style={{ height: '100vh' }}>
      <Grid item xs={12} md={4}>
        <Paper elevation={3} style={{ padding: 20 }}>
          <form onSubmit={handleRegister}>
            <TextField
              fullWidth
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" fullWidth variant="contained" color="primary">
              Register
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
    </Container>
  );



}

export default Register;
