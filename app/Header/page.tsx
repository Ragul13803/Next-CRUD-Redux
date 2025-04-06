'use client';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import NextLink from 'next/link';
import { forwardRef } from 'react';

const ListItemLink = forwardRef(function ListItemLink(props: any, ref: React.Ref<HTMLAnchorElement>) {
  return <NextLink ref={ref} {...props} />;
});

const pages = ['Home', 'About', 'Contact', 'AddCustomer'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Header() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: '#DDEB9D',
        borderRadius: '8px',
        color: '#143D60',
        boxShadow: 'none',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', width: '100%' }}>
          {/* Left side: Menu + CUSTOMERS */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Mobile/Tablet Menu Button */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', mr: 1 }}>
              <IconButton onClick={toggleDrawer(true)} sx={{ color: '#143D60', p: 0 }}>
                ≡
              </IconButton>
            </Box>

            {/* CUSTOMERS Logo */}
            <Link
              href="/"
              style={{
                fontWeight: 700,
                color: '#143D60',
                textDecoration: 'none',
                fontSize: '20px',
              }}
            >
              CUSTOMERS
            </Link>
          </Box>

          {/* Right side: Desktop Nav + Avatar */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Desktop Navigation Links */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', mr: 2 }}>
              <Link href={'/'} style={{ paddingRight: '14px', fontWeight: 'bold' }}>Home</Link>
              <Link href={'/About'} style={{ paddingRight: '14px', fontWeight: 'bold' }}>About</Link>
              <Link href={'/Contact'} style={{ paddingRight: '14px', fontWeight: 'bold' }}>Contact</Link>
              <Link href={'/AddCustomer'} style={{ paddingRight: '14px', fontWeight: 'bold' }}>(+) Add Customer</Link>
            </Box>

            {/* Avatar */}
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/favicon.ico" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>

        {/* Drawer for mobile navigation */}
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
          >
            <List>
              {pages.map((page) => (
                <ListItem
                  button
                  key={page}
                  component={ListItemLink}
                  href={`/${page === 'Home' ? '' : page}`.replace(/\s+/g, '')}
                >
                  <ListItemText primary={page} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </Container>
    </AppBar>
  );
}

export default Header;
