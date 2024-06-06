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

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const history = useHistory();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/users/register', { username, password });
      if (response.status === 200){
        setDialogMessage('Registration successful!');
        setOpenDialog(true);
        
      }

    } catch (error) {
      console.error('Register failed', error);
      setDialogMessage('Registration failed. Please try again.');
      setOpenDialog(true);
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
                sx={{ marginTop: '15px', marginBottom: '15px' }}
              />
              <Button type="submit" fullWidth variant="contained" color="primary" >
                Register
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
      <Dialog open={openDialog} onClose={() => {setOpenDialog(false); history.push('/');}}>
        <DialogContent>
          <DialogContentText>{dialogMessage}</DialogContentText>
          <Button onClick={() => {setOpenDialog(false); history.push('/');}}>Close</Button>
        </DialogContent>
      </Dialog>
      </Container>
  );

}

export default Register;
