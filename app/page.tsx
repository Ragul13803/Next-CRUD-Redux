'use client';

import { Box, Typography, CircularProgress, Grid, Card, CardContent, IconButton, Menu, MenuItem, } from '@mui/material';
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
      <Typography variant="h5" align="center" sx={{ color: '#5F8B4C', fontStyle: 'italic', marginBottom: 4 }}>
        Customer List
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '40vh' }}>
          <CircularProgress sx={{ color: '#5F8B4C', marginRight: 2 }} />
          <Typography variant="h4">Loading...</Typography>
        </Box>
      ) : customers.length === 0 ? (
        <Typography align="center" sx={{ fontWeight: 'bold', fontSize: '18px', color: '#5F8B4C', mt: 4 }}>
          No Customers Available
        </Typography>
      ) : (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
            <Box
              sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', border: '1px dotted #143D60', borderRadius: '8px', padding: '6px 12px', bgcolor: 'white' }}
              onClick={handleAdd}
            >
              <Box
                sx={{
                  height: 20,
                  width: 20,
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
              <Typography variant="h6" color="#143D60">
                Add Customer
              </Typography>
            </Box>
          </Box>

          <Grid container spacing={4}>
            {customers?.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    border: '1px solid #D1D1D1',
                    borderRadius: '16px',
                    padding: 2,
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

                  <CardContent sx={{ textAlign: 'center' }}>
                    <Box
                      sx={{
                        height: 80,
                        width: 80,
                        borderRadius: '50%',
                        bgcolor: 'white',
                        color: '#5F8B4C',
                        fontSize: 28,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto',
                        mb: 1,
                      }}
                    >
                      {item.name[0].toUpperCase()}
                    </Box>

                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 'bold',
                        color: '#143D60',
                        mb: 2,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {truncate(item.name, 20)}
                    </Typography>

                    <Box sx={{ overflowX: 'auto', mt: 2 }}>
  <table style={{ width: '100%', border: '1px solid red', borderCollapse: 'collapse' }}>
    <thead>
      <tr>
        {['Age', 'Gender', 'Mobile', 'Gmail'].map((heading) => (
          <th
            key={heading}
            style={{
              border: '1px solid red',
              textAlign: 'center',
              padding: '8px',
              color: '#143D60',
            }}
          >
            {heading}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style={{ border: '1px solid red', textAlign: 'left', padding: '8px' }}>{item.age}</td>
        <td style={{ border: '1px solid red', textAlign: 'left', padding: '8px' }}>{item.gender}</td>
        <td style={{ border: '1px solid red', textAlign: 'left', padding: '8px' }}>{item.mobile}</td>
        <td style={{ border: '1px solid red', textAlign: 'left', padding: '8px' }}>
          {truncate(item.gmail, 25)}
        </td>
      </tr>
    </tbody>
  </table>
</Box>

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
