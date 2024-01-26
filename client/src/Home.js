import React, { useState, useContext, useEffect  } from 'react';
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
import AllUsersForHomePage from './AllUsersForHomePage';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


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
  const { allUsers, user, filteredPostsFollowingOnly } = useContext(UserContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


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
    <div style={{backgroundColor: "black"}}>
        <br />
        <TestHomePage />
      <CenteredCardContainer>
        {filteredPostsFollowingOnly?.map((post) => (
          <Card key={post.id} sx={{width:400  ,maxWidth: 345, marginBottom: 5 }}>
            <CardHeader
               key={`header-${post.id}`}
              avatar={
                <Link to={`/new-user-profile/${allUsers.filter(u => u.id === post.user_id).map((filteredUser) => filteredUser.id)}`}>
                <Avatar sx={{ bgcolor: '#000' }} aria-label="recipe">
                  {allUsers
                    .filter((user) => user.id === post.user_id)
                    .map((filteredUser) => (
                      <React.Fragment key={filteredUser.id}>
                        {filteredUser?.profile?.profile_photo_url ? (
                          <img src={filteredUser?.profile?.profile_photo_url} alt="profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
                        ) : (
                          filteredUser.username[0].toUpperCase()
                        )}
                      </React.Fragment>
                    ))}
                </Avatar>
              </Link>
              }
           
              action={allUsers.
                filter((user) => user.id === post.user_id)
                .map((filteredUser) => (
                    filteredUser.id === user.id ? <Link to={`/new-user-profile/${user.id}`} style={{ textDecoration: 'none', color: 'inherit' }}><AccountCircleIcon /></Link> :
                    <Relationship key={filteredUser.id} userId={filteredUser.id}/>
                ))
              }
              title={allUsers
                .filter((user) => user.id === post.user_id).map(filteredUser => filteredUser?.username)
            }
            
              
              subheader={new Intl.DateTimeFormat('en-US', {
                dateStyle: 'medium',
              }).format(new Date(post.created_at))}
            />
            {post.post_image_url ?
                <CardMedia
                component="div"
                // style={{
                //   width: '100%',
                //   height: '200px',
                //   overflow: 'hidden',
                  
                // }}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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
              :
              null
              }
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
               {!post?.comments.length ? (
                  <Typography variant="body2" style={{ fontSize: 'small' }}>No comments</Typography>
                ) : (
                  <Typography variant="body2" style={{ fontSize: 'small' }}>{`${post?.comments.length} Comment${post?.comments.length !== 1 ? 's' : ''}`}</Typography>
                )}
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
              />
            </Collapse>
          </Card>
        ))}
      </CenteredCardContainer>
      <Box sx={{ position: 'fixed', bottom: 16, right: 16 }}>
        <Fab color="white" aria-label="add">
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
            backgroundColor: 'white',
            boxShadow: 24,
            p: 4,
          }}
        >
          <div style={{backgroundColor: "white"}}>
          <PostForm onClose={handlePostFormClick} />
          </div>
        </Box>
      </Modal>
      {!isMobile && (
        <div style={{ position: 'absolute', top: 80, left: 10 }}>
          <AllUsersForHomePage /> 
        </div>
      )}
    </div>
  );
}

export default Home;





