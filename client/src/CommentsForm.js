import React, { useState, useContext } from 'react';
import { UserContext } from './context/User';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import api from './util/api';

function CommentsForm({ postId }) {
  const [commentBody, setCommentBody] = useState('');
  const {user, addNewComment} = useContext(UserContext)




  const submitComment = (event) => {
    event.preventDefault();

    api('/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ body: commentBody, post_id: postId, user_id: user.id }),
    })
      .then((response) => response.json())
      .then((comment) => {
        if (!comment.errors) {
          // Update the local state in the CommentsForm component
          addNewComment(comment, postId)

          setCommentBody('');
          // Communicate back to the Home component to update comments for the specific post
          
        } else {
          // Handle errors if needed
          console.error('Error submitting comment:', comment.errors);
        }
      });
  };

  return (
    <div>
      <p style={{ textAlign: 'center' }}>Add Comment:</p>
      <Box
        component="form"
        onSubmit={submitComment}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          '& > :not(style)': { m: 1 },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Add Comment"
          variant="outlined"
          sx={{ flex: 1 }}
          value={commentBody}
          onChange={(e) => setCommentBody(e.target.value)}
        />
        <SendIcon onClick={submitComment} style={{ cursor: 'pointer' }} />
      </Box>
    </div>
  );
}

export default CommentsForm;
