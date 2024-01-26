import React, { useState, useContext, useCallback, useEffect } from 'react';
import { UserContext } from "./context/User";
import { useNavigate, useParams } from "react-router-dom";
import api from "./util/api";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import CommentsForm from './CommentsForm';
import PostForm from './PostForm';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MessageIcon from '@mui/icons-material/Message';
import ConfirmationDialog from './ConfirmationDialog';
import Switch from '@mui/material/Switch';
import SettingsIcon from '@mui/icons-material/Settings';



const NewUserProfile= () => {
  const [value, setValue] = useState(0);
  const { userId } = useParams()

  const [expandedId, setExpandedId] = useState(null);
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const { allUsers, user, allUsersPosts } = useContext(UserContext)
  const navigate = useNavigate()
  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState([])
  let u = allUsers.filter(u => u.id == parseInt(userId))


  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []); 

  const handleExpandClick = postId => {
    setExpandedId(expandedId === postId ? null : postId);
  };

  const handleStartConversation = () => {
        setConfirmationDialogOpen(true);
  };

 const handleConfirmationDialogClose = () => {
    setConfirmationDialogOpen(false);
  };


const handleConfirmStartConversation = async () => {
    try {
        const response = await api(`create-conversation/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({sender: parseInt(user.id), recipient: parseInt(userId)}),
        });

        if (!response.ok) {
            throw new Error('Failed to start a conversation');
        }

        console.log('Conversation started successfully');
        const { chatId } = await response.json();
        navigate(`/user/${userId}/chat/${chatId}`);
    } catch (error) {
        console.error('Error starting conversation:', error.message);
    } finally {
        setConfirmationDialogOpen(false);
    }
};



  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


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



  const getUsersRelationships = useCallback(async () => {
    const data = await api(`relationship-by-id/${userId}`).then(r => r.json())
    setFollowers(data.followers)
    setFollowing(data.following)
  })

  useEffect(() => {
    getUsersRelationships()
  }, [userId])


const pp = allUsers.find(u => u.id === parseInt(userId))


  return (
    <div style={{backgroundColor: "black", position: "relative"}}>
    <Box>
        <ConfirmationDialog
            open={isConfirmationDialogOpen}
            onClose={handleConfirmationDialogClose}
            onConfirm={handleConfirmStartConversation}
        />
      <AppBar position="sticky">
      </AppBar>
      {parseInt(userId) === user.id ?
          <div style={{ position: 'absolute', top: '25px', left: '25px' }}>
          <Link to="/account" style={{ color: "black" }}>
            <SettingsIcon />
          </Link>
          </div>
          :
          null
      }
     
      <Box p={3}>
        <Paper elevation={3}>
          <Box display="flex" flexDirection="column" alignItems="center" p={3}>
            {pp?.profile?.profile_photo_url ? (
            <Avatar
              alt="User Avatar"
              src={pp.profile.profile_photo_url}
              sx={{ width: 170, height: 210, objectFit: 'cover' }}
              />
      ) : (
        <Avatar alt="User Avatar" sx={{ width: 100, height: 100 }} />
      )}
            <Typography variant="h6" mt={2}>          
            {user.id === parseInt(userId) ? null :  <MessageIcon onClick={handleStartConversation} style={{marginLeft: "5px"}}/>}
            </Typography>
            <Typography color="textSecondary" mt={1}>
              <p style={{color: "black", fontWeight: "bold"}}>
              @{u[0]?.username}
              </p>
            
            </Typography>
            <Typography variant="body1" mt={2}>
            {u[0]?.profile ? (
              <div style={{textAlign: "center"}}>
                Age: {u[0]?.profile?.age}
                <br />
                Location: {u[0]?.profile?.location}
                <br />
                Gender: {u[0]?.profile?.sex}
              </div>
            ) : null}
            <hr />
              <div>
                <p style={{ fontWeight: "bold", display: "inline" }}>{followers.length}</p> Following{" "}
                <p style={{ fontWeight: "bold", display: "inline" }}>{followers.length}</p> Followers
              </div>

            </Typography>
          </Box>
        </Paper>

        <Box mt={3}>
          <Tabs value={value} onChange={handleChange}  centered>
            <Tab label="Posts" style={{color: "white"}}/>
            <Tab label="Followers" style={{color: "white"}}/>
            <Tab label="Following" style={{color: "white"}}/>
          </Tabs>

          <TabPanel value={value} index={0}>
            {allUsersPosts?.posts 
                ?.filter((post) => post.user_id === parseInt(userId)) 
                .map((post) => (
                    <div
                    key={post.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '/* specify the height */'
                    }}
                    >
                    <List key={post.id} >
                    <ListItem>
                        <Card>
                            <CardHeader 
                                avatar={
                                    <Avatar sx={{ bgcolor: '#000' }} aria-label="recipe">
                                        {allUsers
                                            ?.filter((user) => user.id === post.user_id)
                                            .map((filteredUser) => (
                                                filteredUser.username[0].toUpperCase()
                                            ))}
                                    </Avatar>
                                }
                                action={
                                    <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                    </IconButton>
                                }
                                title="Shrimp and Chorizo Paella"
                                subheader={new Intl.DateTimeFormat('en-US', {
                                    dateStyle: 'medium',
                                }).format(new Date(post.created_at))}
                                />
                            {post.post_image_url ?
                              <CardMedia
                                component="div"
                                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
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
                                    <IconButton aria-label="add to favorites">
                                        <FavoriteIcon />
                                    </IconButton>
                                    <IconButton aria-label="share">
                                         <ShareIcon />
                                    </IconButton>
                                    <ExpandMore
                                        expand={expandedId === post.id}
                                        onClick={() => handleExpandClick(post.id)}
                                        aria-expanded={expandedId === post.id}
                                        aria-label="show more"
                                    >
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
                    </ListItem>
                  </List>
                  </div>
                ))}
          </TabPanel>

          <TabPanel value={value} index={1}>
            {followers.map((follower) => (
              <Link to={`/new-user-profile/${follower.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                             <div
                             key={follower.id}
                             style={{
                                 display: 'flex',
                                 alignItems: 'center',
                                 justifyContent: 'center',
                                 height: '/* specify the height */'
                                 }}
                             >
                                 <List>
                                 <ListItem>
                                     <ListItemAvatar>
                                     <Avatar alt="Follower Avatar" src={follower?.profile?.profile_photo_url} />
                                     </ListItemAvatar>
                                     <ListItemText style={{color: "white"}}>
                                        {follower.username}
                                     </ListItemText>
                                 </ListItem>
                                 </List>
                             </div>   
                             </Link>
            ))}
         </TabPanel>

          <TabPanel value={value} index={2}>
          {following.map((follower) => (
                             <div
                             key={follower.id}
                             style={{
                                 display: 'flex',
                                 alignItems: 'center',
                                 justifyContent: 'center',
                                 height: '/* specify the height */'
                                 }}
                             >
                                 <List>
                                 <ListItem>
                                     <ListItemAvatar>
                                     <Avatar alt="Follower Avatar" src={follower?.profile?.profile_photo_url} />
                                     </ListItemAvatar>
                                     <ListItemText style={{color: "white"}}>
                                        {follower.username}
                                     </ListItemText>
                                 </ListItem>
                                 </List>
                             </div>   
            ))}
          </TabPanel>
        </Box>
      </Box>
    </Box>
    </div>
  );
};

    const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <Box
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
        {...other}
        >
        {value === index && <Box p={3}>{children}</Box>}
        </Box>
    );
    };

export default NewUserProfile;
