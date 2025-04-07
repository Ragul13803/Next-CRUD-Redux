'use client';

import React, { useState } from 'react';
import Styles from '@/app/page.module.css';
import { Box, TextField, Button, Snackbar, Alert } from '@mui/material';

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
    // Add backend or API logic here if needed
    setOpen(true); // Show success message
    setFormData({ name: '', gmail: '', message: '' }); // Reset form
  };

  return (
    <div className={Styles.page}>
      <h2>Contact Us</h2>
      <Box
        component="form"
        onSubmit={handleSubmit}
        autoComplete="off"
        sx={{ maxWidth: 400, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Gmail"
          name="gmail"
          type="email"
          value={formData.gmail}
          onChange={handleChange}
          required
          fullWidth
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
        />
        <Button type="submit" variant="contained" color="primary">
          Send Message
        </Button>
      </Box>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setOpen(false)} sx={{ width: '100%' }}>
          Message sent successfully!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Contact;
