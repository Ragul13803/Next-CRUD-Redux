'use client';

import { Box, Typography, Button, CircularProgress, Grid, Card, CardContent } from "@mui/material";
import { ButtonStyle } from "./styles/page.style";
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from "./Redux/store";
import { useEffect, useState } from "react";
import { deleteCustomer, getallCustomers } from "./Redux/Customers/thunk";

export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { customers } = useAppSelector((state) => state.customer);
  const [loading, setLoading] = useState(true);

  const handleEdit = (id) => {
    router.push(`/UpdateCustomer/${id}`);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    await dispatch(deleteCustomer(id));
    await dispatch(getallCustomers());
    setLoading(false);
  };

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      await dispatch(getallCustomers());
      setLoading(false);
    };
    fetchCustomers();
  }, [dispatch]);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" align="center" sx={{ color: '#5F8B4C', fontStyle: 'italic', marginBottom: 4 }}>
        Customer List
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '40vh' }}>
          <CircularProgress sx={{ color: '#5F8B4C' }} />
        </Box>
      ) : customers.length > 0 ? (
        <Grid container spacing={3}>
          {customers.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card sx={{ border: '1px solid #D1D1D1', borderRadius: '16px', padding: 2 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#143D60' }}>
                    {item.name}
                  </Typography>
                  <Typography><strong>Age:</strong> {item.age}</Typography>
                  <Typography><strong>Gender:</strong> {item.gender}</Typography>
                  <Typography><strong>Mobile:</strong> {item.mobile}</Typography>
                  <Typography><strong>Gmail:</strong> {item.gmail}</Typography>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                    <Button
                      sx={{ ...ButtonStyle, bgcolor: 'orange', padding: '4px 12px' }}
                      onClick={() => handleEdit(item._id)}
                    >
                      Edit
                    </Button>
                    <Button
                      sx={{ ...ButtonStyle, bgcolor: 'red', padding: '4px 12px' }}
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography align="center" sx={{ fontWeight: 'bold', fontSize: '18px', color: '#5F8B4C', mt: 4 }}>
          No Customers Available
        </Typography>
      )}
    </Box>
  );
}
