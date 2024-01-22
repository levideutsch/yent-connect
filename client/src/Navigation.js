import { useState, useContext } from 'react';
import { UserContext } from './context/User';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import api from './util/api';
import { Link, useNavigate } from 'react-router-dom';




function Navigation() {
    const { logout } = useContext(UserContext)
    const [auth, setAuth] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate()

    const handleChange = (event) => {
        setAuth(event.target.checked);
      };
    
      const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };


      const logoutUser = () => {
        api("logout", {
            method: 'DELETE', 
            headers: {'content-type' : 'application/json'},
            credentials: 'include'
        })
        .then(() => {
            logout()
            navigate("/")
            window.location.reload()

        })
    }

      return (
        <Box sx={{ flexGrow: 1 }}>
          <FormGroup>
            {/* <FormControlLabel
              control={
                <Switch
                  checked={auth}
                  onChange={handleChange}
                  aria-label="login switch"
                />
              }
              label={auth ? 'Logout' : 'Login'}
            /> */}
          </FormGroup>
          <AppBar position="static" sx={{ backgroundColor: '#AAA'}}>
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={handleMenu}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{textAlign: "center"}}>
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                Yent-Connect
                </Link>
              </Typography>
              {auth && (
                <div>
                <Link to="/account" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        color="inherit"
                    >
                    <AccountCircle />
                    </IconButton>
                </Link>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <Link to="/account" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    </Link>
                    
                    <MenuItem onClick={logoutUser}>Logout</MenuItem>

                  </Menu>
                </div>
              )}
            </Toolbar>
          </AppBar>
        </Box>
      );
}
export default Navigation