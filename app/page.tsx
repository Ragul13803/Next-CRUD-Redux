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
    <Box sx={{ padding: '40px 20px 20px 20px' }}>
      <Typography
        variant="h3"
        align="center"
        sx={{ color: '#5F8B4C', fontStyle: 'italic', marginBottom: 4 }}
      >
        Customers
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '40vh' }}>
          <CircularProgress sx={{ color: '#5F8B4C', marginRight: 2 }} />
          <Typography variant="h3">Loading...</Typography>
        </Box>
      ) : customers.length === 0 ? (
        <Typography align="center" sx={{ fontWeight: 'bold', fontSize: '18px', color: '#5F8B4C', mt: 4 }}>
          No Customers Available
        </Typography>
      ) : (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                border: '1px dashed #143D60',
                borderRadius: '10px',
                padding: '6px 12px',
                bgcolor: 'white',
              }}
              onClick={handleAdd}
            >
              <Box
                sx={{
                  height: 24,
                  width: 24,
                  borderRadius: '50%',
                  bgcolor: '#DDEB9D',
                  color: '#143D60',
                  fontSize: 24,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 1,
                }}
              >
                +
              </Box>
              <Typography variant="heading" color="#143D60">
                Add Customer
              </Typography>
            </Box>
          </Box>

          <Grid container spacing={2}>
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
                    // padding: '10px',
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

                  <CardContent sx={{ padding: '8px 12px'}}>
                    {/* Avatar */}
                    <Box sx={{ display: 'flex',  }}>
                    <Box
                      sx={{
                        height: 80,
                        width: 80,
                        borderRadius: '50%',
                        bgcolor: 'white',
                        color: '#5F8B4C',
                        fontSize: 24,
                        display: 'flex',
                        alignItems: 'center',
                        // justifyContent: 'center',
                        margin: '0 auto',
                        mb: 1,
                      }}
                    >
                      {item.name[0].toUpperCase()}
                    </Box>

                    {/* Name */}
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 'bold',
                        color: '#143D60',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        textAlign: 'center',
                      }}
                    >
                      {truncate(item.name, 25)}
                    </Typography>
                    </Box>

                    {/* Info section left-aligned */}
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
        </>
      )}
    </Box>
  );
}
