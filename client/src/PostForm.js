import React, { useState, useContext } from 'react';
import { UserContext } from './context/User';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';

import api from './util/api';

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

function PostForm({ onClose }) {
    const [postFormLoading, setPostFormLoading] = useState(false);
    const [formData, setFormData] = useState({
        body: '', 
        image: null,
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    function handleSubmit(e) {
        e.preventDefault();

        setPostFormLoading(true);

        const data = new FormData();
        data.append("post[body]", formData.body);
        data.append("post[image]", formData.image);

        submitToApi(data);
    }

    async function submitToApi(data) {
        const response = await api('posts', { method: 'POST', body: data });
        const body = await response.json();

        if (!response.ok) {
            console.log(body.error);
        } else {
            console.log("post successfully uploaded");
            window.location.reload();
            // setAllPosts([body, ...allPosts]);
            setPostFormLoading(false);
            onClose(); 
        }
    }

    return (
        <div style={{backgroundColor: "white"}}>
            <form onSubmit={(e) => handleSubmit(e)}>
                <Box sx={{ width: 500, maxWidth: '100%', color: 'black' }}>
                    <TextField
                        fullWidth
                        label="Write something"
                        id="body"
                        name="body"
                        value={formData.body}
                        onChange={(e) => handleChange(e)}
                        sx={{
                        "&:focused": {
                            borderColor: 'black', 
                        },
                        "&:hover": {
                            borderColor: 'black', 
                        },
                        "&:active": {
                            borderColor: 'black',
                        },
                        }}
                    />
                </Box>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Button 
                        component="label" 
                        variant="contained" 
                        style={{backgroundColor: 'black'}}
                    >  
                    <AddPhotoAlternateIcon />
                    Add Photo
                    <VisuallyHiddenInput type="file"  name='image' id='image' onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })} />
                    </Button>
                <Box sx={{ '& > :not(style)': { m: 1 } }} >
                    <Fab variant="extended" size="medium" color="primary" type="submit" style={{backgroundColor: 'black'}}>
                        <NavigationIcon sx={{ mr: 1 }} />
                        Post
                    </Fab>
                </Box>
                <Box onClick={onClose} style={{ display: "flex", alignItems: "center" }} >
                    <Fab variant="extended" size="medium" color="primary" type="submit" style={{backgroundColor: 'black'}}>
                        <CloseIcon />
                        Close
                    </Fab>
                </Box>
                </div>

                {postFormLoading && <CircularProgress />}
            </form>
        </div>
    );
}

export default PostForm;
