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
import { AiFillHome, AiFillInfoCircle, AiFillPhone } from 'react-icons/ai';
import { FaServicestack } from 'react-icons/fa';
import '../css/navbar.css';

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

  const Contact = () => {
    const isHomePage = location.pathname === "/";
    if (isHomePage) {
      const contactForm = document.getElementById("form");
      console.log(contactForm);

      if (contactForm) {
        contactForm.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/contactUs");
    }
  };

  const handleNavigation = (text) => {
    switch (text) {
      case 'Orders':
        navigate('/orders');
        break;
      case 'General Inqueries':
        navigate('/general-inqueries');
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
          { text: 'Orders', icon: <AiFillHome color="#4599B4" /> },
          { text: 'General Inqueries', icon: <FaServicestack color="#4599B4" /> },
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
      <Button onClick={toggleDrawer('left', true)}><GiHamburgerMenu /></Button>
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
