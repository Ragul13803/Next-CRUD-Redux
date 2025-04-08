'use client';

import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
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
    <Box sx={{ padding: '20px' }}>
      <Typography
        variant="h3"
        align="center"
        sx={{ color: '#143D60', fontStyle: 'italic', padding: '16px' }}
      >
        Customers
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '40vh' }}>
          <CircularProgress sx={{ color: '#5F8B4C', marginRight: 2 }} />
          <Typography variant="h5">Loading...</Typography>
        </Box>
      ) : customers.length === 0 ? (
        <Typography align="center" sx={{ fontWeight: 'bold', fontSize: '18px', color: '#5F8B4C', mt: 4 }}>
          No Customers Available
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {/* Add Customer Card */}
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card
              onClick={handleAdd}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                border: '2px dashed #143D60',
                borderRadius: '12px',
                bgcolor: '#fff',
                color: '#143D60',
                cursor: 'pointer',
                transition: '0.3s',
                '&:hover': {
                  bgcolor: '#F3FBE1',
                },
                padding: '30px 20px 10px 20px',
              }}
            >
              <Box
                sx={{
                  height: 80,
                  width: 80,
                  borderRadius: '50%',
                  bgcolor: '#DDEB9D',
                  color: '#143D60',
                  fontSize: 44,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                +
              </Box>
              <Typography variant="h5" align="center" sx={{ padding: '16px' }}>
                Add Customer
              </Typography>
            </Card>
          </Grid>

          {/* Customer Cards */}
          {customers?.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: '1px solid #D1D1D1',
                  borderRadius: '12px',
                  position: 'relative',
                  bgcolor: '#DDEB9D',
                  color: '#143D60',
                }}
              >
                <IconButton
                  onClick={(e) => handleMenuOpen(e, item._id)}
                  sx={{ position: 'absolute', top: 8, right: 8 }}
                >
                  ⋮
                </IconButton>

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

                <CardContent
                  sx={{
                    p: '16px !important',
                    '&:last-child': {
                      pb: '16px !important',
                    },
                  }}
                >
                  <Box
                    sx={{
                      height: 80,
                      width: 80,
                      borderRadius: '50%',
                      bgcolor: 'white',
                      color: '#5F8B4C',
                      fontSize: 26,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '24px auto 0 auto',
                    }}
                  >
                    {item.name[0].toUpperCase()}
                  </Box>

                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 'bold',
                      color: '#143D60',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      textAlign: 'center',
                      padding: '10px',
                    }}
                  >
                    {truncate(item.name, 25)}
                  </Typography>

                  <Grid container spacing={0}>
                    <Grid item xs={12}>
                      <Typography variant="body2">
                        <strong>Age:</strong> {item.age}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2">
                        <strong>Gender:</strong> {item.gender}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2">
                        <strong>Mobile:</strong> {item.mobile}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        variant="body2"
                        sx={{
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        <strong>Gmail:</strong> {truncate(item.gmail, 25)}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
