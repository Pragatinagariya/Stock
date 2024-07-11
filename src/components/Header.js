import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import TextField from '@mui/material/TextField';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const Header = ({ interval, setInterval, startDate, setStartDate, endDate, setEndDate }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleDropdownClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: "#f5f5f5", color: "#000", margin:'10px' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Stock Dashboard
          </Typography>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              renderInput={(params) => (
                <TextField {...params} size="small" sx={{ width: '120px', mr: '8px',size:'239px'}} />
              )}
              inputFormat="DD/MM/YYYY"
            />
            <br></br>
            <Typography variant="h6" component="div" sx={{ my: 1 }}>
              to
            </Typography>
            <br></br>
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              renderInput={(params) => (
                <TextField {...params}  sx={{ width: '120px', ml: '8px' }} />
              )}
              inputFormat="DD/MM/YYYY"
            />
          </LocalizationProvider>

          <Button color="inherit" startIcon={<LoginIcon />} size="small" sx={{ ml: 2, mt: 1 }}>
            Login
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerClose}
      >
        <List
          sx={{ width: 250 }}
        >
          <ListItem button onClick={handleDrawerClose}>
            <ListItemIcon>
              <CloseIcon />
            </ListItemIcon>
            <ListItemText primary="" />
          </ListItem>

          <ListItem button onClick={handleDropdownClick}>
            <ListItemText primary="Stock Name" />
            {dropdownOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={dropdownOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem sx={{ pl: 4 }}>
                Motison
              </ListItem>
              <ListItem sx={{ pl: 4 }}>
                HDFC
              </ListItem>
              <ListItem sx={{ pl: 4 }}>
                DigiByte
              </ListItem>
            </List>
          </Collapse>

          <ListItem button>
            <ListItemText primary="Stock History" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Newly Listed" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Oldly Listed" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Mostly Bought Coin" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Mostly Sold Coin" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Top Losers" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Top Coins" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="IPO" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Intra-Trading" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default Header;
