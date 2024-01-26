import React, { useState, useContext } from 'react';
import { UserContext } from './context/User';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Switch from '@mui/material/Switch';
import api from "./util/api";
import EditProfile from './EditProfile';

const UserAccount = () => {
  const { userSettings, setUserSettings, user,  } = useContext(UserContext);
  const [checked, setChecked] = useState(userSettings?.is_dark_mode || false);
  const [openEditProfile, setEditProfile] = useState(false)

    const handleSubmit = async () => {
    try {
      const response = await api("toggle-theme", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          is_dark_mode: checked,
        }),
      });

      if (response.ok) {
      
        setUserSettings({ ...userSettings, is_dark_mode: checked });
      } else {
        console.error("Failed to toggle theme");
      }
    } catch (error) {
      console.error("Error toggling theme", error);
    }
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);

    handleSubmit();
  };

  return (
    <div style={{ backgroundColor: checked ? '#000' : '#FFF', color: checked ? '#FFF' : '#000' }}>
      <Switch
         checked={checked}
       onChange={handleChange}
       inputProps={{ 'aria-label': 'controlled' }}
      />
       <p>{checked ? 'Toggle Light Mode' : 'Toggle Dark Mode'}</p>
    <Card>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        p={3}
      >
        {user?.profile?.profile_photo_url ? (
            <Avatar
              alt="User Avatar"
              src={user.profile.profile_photo_url}
              sx={{ width: 170, height: 210, objectFit: 'cover' }}
              />
        ) : (
        <Avatar alt="User Avatar" sx={{ width: 100, height: 100 }} />
        )}
        <Typography variant="h6" gutterBottom>
          {user?.username}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          {user?.email}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Change Age Sex, Location, Profile Photo.
          </Typography>
        </CardContent>
        <Button variant="contained" color="primary" onClick={() => setEditProfile(!openEditProfile)}  style={{ backgroundColor: '#AAA', color: '#fff' }}>
        {openEditProfile ? 'Close Settings' : 'Edit Settings'}
        </Button>
      </Box>
      {openEditProfile && <EditProfile />}
    </Card>
    </div>
  );
};

export default UserAccount;
