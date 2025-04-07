'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import { ButtonStyle, textfield } from '../styles/page.style';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '../Redux/store';
import { createCustomer } from '../Redux/Customers/thunk';

const data = [
  { key: 'name', label: 'Name', placeholder: 'Enter Your Name' },
  { key: 'age', label: 'Age', placeholder: 'Enter Your Age' },
  { key: 'gender', label: 'Gender', placeholder: 'Enter Your Gender' },
  { key: 'mobile', label: 'Mobile', placeholder: 'Enter Your Mobile' },
  { key: 'gmail', label: 'G-Mail', placeholder: 'Enter Your Mail' },
];

export default function AddCustomer() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [newCustomer, setNewCustomer] = useState({
    name: '',
    age: '',
    gender: '',
    mobile: '',
    gmail: '',
  });
  const [image, setImage] = useState<File | null>(null);

  const handleChange = (key: string, value: string) => {
    setNewCustomer((prev) => ({ ...prev, [key]: value }));
  };

  const handleAdd = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', newCustomer.name);
    formData.append('age', newCustomer.age);
    formData.append('gender', newCustomer.gender);
    formData.append('mobile', newCustomer.mobile);
    formData.append('gmail', newCustomer.gmail);
    if (image) {
      formData.append('image', image);
    }

    // @ts-ignore - depends on how thunk is typed
    dispatch(createCustomer(formData));

    setNewCustomer({ name: '', age: '', gender: '', mobile: '', gmail: '' });
    setImage(null);
    router.push('/');
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          p: '20px',
          justifyContent: 'center',
          gap: '20px',
          width: '400px',
          bgcolor: '#DDEB9D',
          color: '#143D60',
          borderRadius: '10px',
        }}
      >
        <Typography variant="h4" sx={{ padding: '10px', textAlign: 'center' }}>
          Add Customer
        </Typography>
        {data.map((item, index) => (
          <Box
            key={index}
            style={{
              display: 'flex',
              gap: item.label === 'Age' ? '40px' : '20px',
              justifyContent: 'space-around',
            }}
          >
            <Typography variant="h6">{item.label} :</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              {item.label === 'Gender' ? (
                <FormControl>
                  <RadioGroup
                    value={newCustomer[item.key as keyof typeof newCustomer]}
                    onChange={(e) => handleChange(item.key, e.target.value)}
                  >
                    <Box sx={{ display: 'flex', mr: '40px' }}>
                      <FormControlLabel
                        value="Male"
                        control={
                          <Radio
                            sx={{
                              color: '#143D60',
                              '&.Mui-checked': { color: '#143D60' },
                            }}
                          />
                        }
                        label="Male"
                        sx={{ color: '#143D60' }}
                      />
                      <FormControlLabel
                        value="Female"
                        control={
                          <Radio
                            sx={{
                              color: '#143D60',
                              '&.Mui-checked': { color: '#143D60' },
                            }}
                          />
                        }
                        label="Female"
                        sx={{ color: '#143D60' }}
                      />
                    </Box>
                  </RadioGroup>
                </FormControl>
              ) : (
                <TextField
                  sx={textfield}
                  placeholder={item.placeholder}
                  value={newCustomer[item.key as keyof typeof newCustomer]}
                  onChange={(e) => handleChange(item.key, e.target.value)}
                />
              )}
            </Box>
          </Box>
        ))}

        {/* ✅ Image Upload Input */}
        <Box sx={{ display: 'flex', gap: '20px', justifyContent: 'space-around' }}>
          <Typography variant="h6">Image :</Typography>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setImage(e.target.files[0]);
              }
            }}
            style={{ color: '#143D60' }}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button sx={{ ...ButtonStyle, bgcolor: 'green', width: 'fit-content' }} onClick={handleAdd}>
            Add
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
