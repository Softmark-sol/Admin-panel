import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoReceiptSharp } from "react-icons/io5";
import { FaSearchengin } from "react-icons/fa6";

const LeftDrawer = () => {
  const location = useLocation();

  const [state, setState] = useState({
    left: false,
  });

  const navigate = useNavigate();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };


  const handleNavigation = (text) => {
    switch (text) {
      case 'Orders':
        navigate('/');
        break;
      case 'General Inqueries':
        navigate('/general-inquery');
        break;
      default:
        break;
    }
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {[
          { text: 'Orders', icon: <IoReceiptSharp color="#4599B4" /> },
          { text: 'General Inqueries', icon: <FaSearchengin color="#4599B4" /> },
        ].map(({ text, icon }) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              onClick={() => handleNavigation(text)}
              sx={{ paddingLeft: '8px' }}
            >
              <ListItemIcon
                sx={{ minWidth: '35px', color: '#1976d2' }}
              >
                {icon}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer('left', true)}><GiHamburgerMenu color='white' size={20}/></Button>
      <Drawer
        anchor='left'
        open={state.left}
        onClose={toggleDrawer('left', false)}
      >
        {list('left')}
      </Drawer>
    </div>
  );
};

export default LeftDrawer;
