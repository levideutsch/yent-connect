import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from './context/User';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import api from './util/api';

import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';


const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

const EditProfile = () => {
  const { allUsers, user } = useContext(UserContext)
  const [formData, setFormData] = useState({
    age: '',
    sex: '',
    location: '',
    profile_photo: null,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append("profile[age]", formData.age);
    data.append("profile[sex]", formData.sex);
    data.append("profile[location]", formData.location);
    data.append("profile[profile_photo]", formData.profile_photo);

    submitToApi(data)

  };


  async function submitToApi(data) {

    if (!user.profile) {
      const response = await api("profiles", { method: 'POST', body: data }) 
      const body = await response.json()
  
      if (!response.ok) {
          console.log("error posting profile")
      } else {
          console.log("profile successfully uploaded");
          window.location.reload();
      }
    } else {
      const response = await api("edit-profile", {method: 'PATCH', body: data})
      const  body = await response.json()

      if (!response.ok) {
        console.log("error updating profile")
      } else {
        console.log("profile successfully uploaded");
        window.location.reload();
      }
    }
  }


  useEffect(() => {

  }, [user])


  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      p={3}
    >
      <Typography variant="h6" gutterBottom>
        Edit Profile
      </Typography>
      <form onSubmit={(e) => handleSubmit(e)}>
        <TextField
          label="Age"
          variant="outlined"
          name="age"
          value={formData.age}
          onChange={handleChange}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Sex"
          variant="outlined"
          name="sex"
          value={formData.sex}
          onChange={handleChange}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Location"
          variant="outlined"
          name="location"
          value={formData.location}
          onChange={handleChange}
          margin="normal"
          fullWidth
        />

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
        <Button 
        component="label" 
        variant="contained" 
        style={{backgroundColor: '#AAA'}}
        >  
        <AddPhotoAlternateIcon />
        Upload Photo
        <VisuallyHiddenInput type="file"  name='profile_photo' id='profile_photo' onChange={(e) => setFormData({ ...formData, profile_photo: e.target.files[0] })} />
        </Button>
        </div>
        <br />
        <br />
        
        <Button style={{ backgroundColor: '#AAA', color: '#fff' }} type="submit" variant="contained" color="primary" fullWidth>
          Save Changes
        </Button>
        
      </form>
    </Box>
  );
};

export default EditProfile;
