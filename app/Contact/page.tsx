'use client';

import React, { useState } from 'react';
import { Box, TextField, Button, Snackbar, Alert, Card, CardContent, Typography } from '@mui/material';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    gmail: '',
    message: '',
  });

  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(true);
    setFormData({ name: '', gmail: '', message: '' });
  };

  return (
    <>
      <Card
        sx={{
          width: 350,
          height: 450,
          mx: 'auto',
          mt: 4,
          p: 1,
          boxShadow: 3,
          bgcolor: '#DDEB9D',
          color: '#143D60',
          borderRadius: '10px',
        }}
      >
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom align="center">
            Contact Us
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            autoComplete="off"
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              fullWidth
              InputLabelProps={{ style: { color: '#143D60' } }}
            />
            <TextField
              label="Gmail"
              name="gmail"
              type="email"
              value={formData.gmail}
              onChange={handleChange}
              required
              fullWidth
              InputLabelProps={{ style: { color: '#143D60' } }}
            />
            <TextField
              label="Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              multiline
              rows={4}
              fullWidth
              InputLabelProps={{ style: { color: '#143D60' } }}
              sx={{ mt: 2.5 }} // 20px top margin
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: '#143D60',
                color: '#fff',
                '&:hover': { bgcolor: '#143D60' },
                borderRadius: '8px',
              }}
            >
              Send Message
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
          '& .MuiSnackbar-root': {
            top: '20px', // Positions the Snackbar 20px from the top
          },
        }}
      >
        <Alert severity="success" onClose={() => setOpen(false)} sx={{ width: '100%' }}>
          Message sent successfully!
        </Alert>
      </Snackbar>
    </>
  );
}

export default Contact;
