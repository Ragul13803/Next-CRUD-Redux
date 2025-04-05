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
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Image from 'next/image';

const pages = ['Home', 'About', 'Contact', '(+) Add Customer'];
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
    <AppBar position="static" sx={{ bgcolor: '#DDEB9D', borderRadius: '8px', color: '#143D60', boxShadow: 'none' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          {/* Left Section - Logo */}
          <Link href="/" style={{ fontWeight: 700, color: '#143D60', textDecoration: 'none', fontSize: '20px' }}>
            CUSTOMERS
          </Link>

          {/* Mobile Menu Icon */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton onClick={toggleDrawer(true)} sx={{ color: '#143D60', p: 0 }}>
              <Image src="/menu.svg" alt="Menu" width={32} height={32} />
            </IconButton>
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
              <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
                <List>
                  {pages.map((page, index) => (
                    <ListItem button key={page} component={Link} href={`/${page === 'Home' ? '' : page}`.replace(/\s+/g, '')}>
                      <ListItemText primary={page} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Drawer>
          </Box>

          {/* Right Section - Navigation Links & User Menu */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            <Link href={'/'} style={{ paddingRight: '14px', fontWeight: 'bold' }}>Home</Link>
            <Link href={'/About'} style={{ paddingRight: '14px', fontWeight: 'bold' }}>About</Link>
            <Link href={'/Contact'} style={{ paddingRight: '14px', fontWeight: 'bold' }}>Contact</Link>
            <Link href={'/AddCustomer'} style={{ paddingRight: '14px', fontWeight: 'bold' }}>(+) Add Customer</Link>

            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, marginLeft: '14px' }}>
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
      </Container>
    </AppBar>
  );
}

export default Header;
