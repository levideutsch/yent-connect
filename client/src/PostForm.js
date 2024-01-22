import React, { useState, useContext } from 'react';
import { UserContext } from './context/User';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { CircularProgress } from '@mui/material';

import api from './util/api';

function PostForm({ onClose }) {
    const { allPosts, setAllPosts } = useContext(UserContext);
    const [postFormLoading, setPostFormLoading] = useState(false);
    const [formData, setFormData] = useState({
        body: '', // Set an initial value for body
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
            onClose(); // Close the form after successful submission
        }
    }

    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <Box sx={{ width: 500, maxWidth: '100%' }}>
                    <TextField
                        fullWidth
                        label="body"
                        id="body"
                        name="body"
                        value={formData.body}
                        onChange={(e) => handleChange(e)}
                    />
                </Box>
                <label htmlFor='image' />
                <input type='file' name='image' id='image' onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })} />
                <button type='submit'>submit</button>
                <button onClick={onClose}>close</button>
                {postFormLoading && <CircularProgress />}
            </form>
        </div>
    );
}

export default PostForm;
