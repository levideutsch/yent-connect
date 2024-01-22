import React, { useState, useContext  } from 'react';
import { UserContext } from './context/User';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import CommentsForm from './CommentsForm';
import PostForm from './PostForm';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';
import LikeButton from './LikeButton';
import api from './util/api';
import Relationship from './Relationship';
import TestHomePage from './TesHomePage';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const CenteredCardContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '64px',
  position: 'relative',
});

function Home() {
  const [expandedId, setExpandedId] = useState(null);
  const [postFormOpen, setPostFormOpen] = useState(false);
  const { allPosts, setAllPosts, allUsers } = useContext(UserContext);


  const handleExpandClick = (postId) => {
    setExpandedId(expandedId === postId ? null : postId);
  };

  const handlePostFormClick = () => {
    setPostFormOpen(!postFormOpen);
  };

function clickLike() {
    console.log("clicked")
}

  return (
    <div>
        <br />
        <TestHomePage />
      <CenteredCardContainer>
        {allPosts?.posts?.map((post) => (
          <Card key={post.id} sx={{ maxWidth: 345, marginBottom: 5 }}>
            <CardHeader
              avatar={
                <Link to={`/user/${allUsers.filter(u => u.id === post.user_id).map((filteredUser) => filteredUser.id)}`}>
                <Avatar sx={{ bgcolor: '#000' }} aria-label="recipe">
                  {allUsers
                    .filter((user) => user.id === post.user_id)
                    .map((filteredUser) => (
                      filteredUser.username[0].toUpperCase()
                    ))}
                </Avatar>
                </Link>
              }
              
              action={allUsers.
                filter((user) => user.id === post.user_id)
                .map((filteredUser) => (
                    <Relationship key={filteredUser.id} userId={filteredUser.id}/>
                ))
                // <IconButton aria-label="settings">
                //   <MoreVertIcon />
                // </IconButton>
        
              }
              title="Shrimp and Chorizo Paella"
              subheader={new Intl.DateTimeFormat('en-US', {
                dateStyle: 'medium',
              }).format(new Date(post.created_at))}
            />
            <CardMedia
              component="div"
              style={{
                width: '100%',
                height: '200px',
                overflow: 'hidden',
              }}
            >
              <img
                style={{
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                }}
                src={post.post_image_url}
                alt="Paella dish"
              />
            </CardMedia>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {post.body}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
         
            <LikeButton click={clickLike} postId={post.id}/>


              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
              <ExpandMore
                expand={expandedId === post.id}
                onClick={() => handleExpandClick(post.id)}
                aria-expanded={expandedId === post.id}
                aria-label="show more"
              >
               {!post?.comments.length ? "No comments" : `${post?.comments.length} Comment${post?.comments.length !== 1 ? 's' : ''}`}
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse
              in={expandedId === post.id}
              timeout="auto"
              unmountOnExit
            >
              <Box maxHeight="300px" overflow="auto">
                <Typography textAlign="center" paragraph>
                  Comments:
                </Typography>
                {post?.comments?.map((comment, index) => (
                  <CardContent key={index}>
                    {allUsers
                      .filter((user) => user.id === comment.user_id)
                      .map((filteredUser) => (
                        <Typography key={filteredUser.id} paragraph>
                          {filteredUser.username}: {comment.body}
                        </Typography>
                      ))}
                  </CardContent>
                ))}
              </Box>
              <CommentsForm
                postId={post.id}
                allPosts={allPosts}
                setAllPosts={setAllPosts}
              />
            </Collapse>
          </Card>
        ))}
      </CenteredCardContainer>
      <Box sx={{ position: 'fixed', bottom: 16, right: 16 }}>
        <Fab color="#AAA" aria-label="add">
          <AddIcon onClick={handlePostFormClick} />
        </Fab>
      </Box>
      <Modal
        open={postFormOpen}
        onClose={handlePostFormClick}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            backgroundColor: '#AAA',
            boxShadow: 24,
            p: 4,
          }}
        >
          <PostForm onClose={handlePostFormClick} />
        </Box>
      </Modal>
    </div>
  );
}

export default Home;
