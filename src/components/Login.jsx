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
  Typography,  
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText
} from '@mui/material';
import Container from "@mui/material/Container";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/users/login', { username, password });
      if(response.status === 200){
          localStorage.setItem('token', response.data.token);
          history.push('/');
      }
    } catch (error) {
      console.error('Login failed', error);
      setDialogMessage('Login failed');
      setOpenDialog(true);
    }
  };

  return (
    <Container maxWidth="sm" minWith="sl">
    <Grid container justify="center" alignItems="center" style={{ height: '100vh' }}>
      <Grid item xs={12} md={4}>
        <Paper elevation={3} style={{ padding: 20 }}>
          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{ marginTop: '15px', marginBottom: '15px' }}
            />
            <Button type="submit" fullWidth variant="contained" color="primary" >
              Login
            </Button>
            <Typography variant="body1" align="center" style={{ marginTop: '10px', cursor: 'pointer' }} onClick={() => history.push('/register')}>
              Don't have an account? Register
            </Typography>
          </form>
        </Paper>
      </Grid>
    </Grid>
      <Dialog open={openDialog} >
        <DialogContent>
          <DialogContentText>{dialogMessage}</DialogContentText>
          <Button onClick={() => {setOpenDialog(false);}}>Close</Button>
        </DialogContent>
      </Dialog>
    </Container>
  );


  
}

export default Login;
