'use client';

import { Box, Typography, CircularProgress, Grid, Card, CardContent, IconButton, Menu, MenuItem, } from '@mui/material';
import { ButtonStyle } from './styles/page.style';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from './Redux/store';
import { useEffect, useState } from 'react';
import { deleteCustomer, getallCustomers } from './Redux/Customers/thunk';
// import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { customers } = useAppSelector((state) => state.customer);
  const [loading, setLoading] = useState(true);

  const [menuAnchorEls, setMenuAnchorEls] = useState<{ [key: string]: HTMLElement | null }>({});

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, id: string) => {
    setMenuAnchorEls((prev) => ({ ...prev, [id]: event.currentTarget }));
  };

  const handleMenuClose = (id: string) => {
    setMenuAnchorEls((prev) => ({ ...prev, [id]: null }));
  };

  const handleEdit = (id: string) => {
    router.push(`/UpdateCustomer/${id}`);
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    await dispatch(deleteCustomer(id));
    await dispatch(getallCustomers());
    setLoading(false);
  };

  const handleAdd = () => {
    router.push('/AddCustomer');
  };

  const truncate = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
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
        <Box sx={{ display: 'flex', alignItems: 'center', minHeight: '40vh' }}>
          <CircularProgress sx={{ color: '#5F8B4C', marginRight: 2 }} />
          <Typography variant="h4">Loading...</Typography>
        </Box>
      ) : customers.length === 0 ? (
        <Typography align="center" sx={{ fontWeight: 'bold', fontSize: '18px', color: '#5F8B4C', mt: 4 }}>
          No Customers Available
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {/* Add Customer Card */}
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card
              onClick={handleAdd}
              sx={{
                border: '2px dashed #5F8B4C',
                borderRadius: '16px',
                padding: 2,
                textAlign: 'center',
                cursor: 'pointer',
                transition: '0.3s',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    height: 50,
                    width: 50,
                    borderRadius: '50%',
                    bgcolor: '#A9D89C',
                    color: '#5F8B4C',
                    fontSize: 32,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto',
                  }}
                >
                  +
                </Box>
                <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
                  Add Customer
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Customer Cards */}
          {customers.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
              <Card sx={{ border: '1px solid #D1D1D1', borderRadius: '16px', padding: 2, position: 'relative' }}>
                {/* Menu Icon */}
                <IconButton
                  onClick={(e) => handleMenuOpen(e, item._id)}
                  sx={{ position: 'absolute', top: 8, right: 8 }}
                >
                  ⋮
                </IconButton>

                {/* Dropdown Menu */}
                <Menu
                  anchorEl={menuAnchorEls[item._id]}
                  open={Boolean(menuAnchorEls[item._id])}
                  onClose={() => handleMenuClose(item._id)}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      handleEdit(item._id);
                      handleMenuClose(item._id);
                    }}
                  >
                    Edit
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleDelete(item._id);
                      handleMenuClose(item._id);
                    }}
                  >
                    Delete
                  </MenuItem>
                </Menu>

                {/* Card Content */}
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 'bold',
                      color: '#143D60',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {truncate(item.name, 20)}
                  </Typography>
                  <Typography>
                    <strong>Age:</strong> {item.age}
                  </Typography>
                  <Typography>
                    <strong>Gender:</strong> {item.gender}
                  </Typography>
                  <Typography>
                    <strong>Mobile:</strong> {item.mobile}
                  </Typography>
                  <Typography
                    sx={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    <strong>Gmail:</strong> {truncate(item.gmail, 25)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
