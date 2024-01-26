// import React, { useContext, useState } from "react";
// import { UserContext } from "./context/User";
// import { useNavigate, useParams } from "react-router-dom";
// import { Link } from "react-router-dom";
// import api from "./util/api";

// // UI Imports
// import { styled } from '@mui/material/styles';
// import Card from '@mui/material/Card';
// import CardHeader from '@mui/material/CardHeader';
// import CardMedia from '@mui/material/CardMedia';
// import CardContent from '@mui/material/CardContent';
// import CardActions from '@mui/material/CardActions';
// import Collapse from '@mui/material/Collapse';
// import Avatar from '@mui/material/Avatar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';
// import Fab from '@mui/material/Fab';
// import AddIcon from '@mui/icons-material/Add';
// import Modal from '@mui/material/Modal';
// import CommentsForm from './CommentsForm';
// import PostForm from './PostForm';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ShareIcon from '@mui/icons-material/Share';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import MessageIcon from '@mui/icons-material/Message';
// import ConfirmationDialog from './ConfirmationDialog';
// import Switch from '@mui/material/Switch';


// const CenteredCardContainer = styled('div')({
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: '64px',
//     position: 'relative',
//   });

// const ExpandMore = styled((props) => {
//     const { expand, ...other } = props;
//     return <IconButton {...other} />;
//   })(({ theme, expand }) => ({
//     transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//     marginLeft: 'auto',
//     transition: theme.transitions.create('transform', {
//       duration: theme.transitions.duration.shortest,
//     }),
//   }));
  

// function SingleUser() {
//     const { userId } = useParams()
//     const [expandedId, setExpandedId] = useState(null);
//     const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);  // New state for the dialog
//     const { allUsers, allPosts, user } = useContext(UserContext)
//     const navigate = useNavigate()
//     let u = allUsers.filter(u => u.id == parseInt(userId))
//     const [postsOpen, setPostsOpen] = React.useState(false);

//     const handleShowPosts = (event) => {
//         setPostsOpen(event.target.checked);
//       };

//     const handleExpandClick = postId => {
//         setExpandedId(expandedId === postId ? null : postId);
//       };

//     const handleStartConversation = () => {
//         setConfirmationDialogOpen(true);
//     };

//     const handleConfirmationDialogClose = () => {
//         setConfirmationDialogOpen(false);
//     };
    
//     const handleConfirmStartConversation = async () => {
//         try {
//             const response = await api(`create-conversation/${userId}`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 // Include any body parameters if required
//                 body: JSON.stringify({sender: parseInt(user.id), recipient: parseInt(userId)}),
//             });
    
//             if (!response.ok) {
//                 throw new Error('Failed to start a conversation');
//             }
    
//             console.log('Conversation started successfully');
//             const { chatId } = await response.json();
//             navigate(`/user/${userId}/chat/${chatId}`);
//         } catch (error) {
//             console.error('Error starting conversation:', error.message);
//         } finally {
//             setConfirmationDialogOpen(false);
//         }
//     };
    
//     return (
//         <div>
//             <h1 style={{textAlign:'center', color: 'black'}}>{u[0]?.username}'s Profile  
//            {user.id === parseInt(userId) ? null :  <MessageIcon onClick={handleStartConversation}/>}
//               </h1>
//               <div style={{color: 'black'}}>
//                 {postsOpen ? "Hide Posts" : "Show Posts"}
//               <Switch
//                 // color='#AAA'
//                 style={{color: '#AAA'}}
//                 checked={postsOpen}
//                 onChange={handleShowPosts}
//                 inputProps={{ 'aria-label': 'controlled' }}
//                 />
//                 </div>

//     { postsOpen ?
//             <CenteredCardContainer>
//             {allPosts?.posts
//                 ?.filter((post) => post.user_id === parseInt(userId)) // Filter posts based on user_id
//                 .map((post) => (
//                 <Card key={post.id} sx={{ maxWidth: 345, marginBottom: 5 }}>
//                     <CardHeader
//                     avatar={
//                     <Avatar sx={{ bgcolor: '#000' }} aria-label="recipe">
//                     {allUsers
//                         .filter((user) => user.id === post.user_id)
//                         .map((filteredUser) => (
//                         filteredUser.username[0].toUpperCase()
//                         ))}
//                     </Avatar>
//                     }
//                     action={
//                         <IconButton aria-label="settings">
//                         <MoreVertIcon />
//                         </IconButton>
//                     }
//                     title="Shrimp and Chorizo Paella"
//                     subheader={new Intl.DateTimeFormat('en-US', {
//                         dateStyle: 'medium',
//                     }).format(new Date(post.created_at))}
//                     />
//                     <CardMedia
//                     component="div"
//                     style={{
//                         width: '100%',
//                         height: '200px',
//                         overflow: 'hidden',
//                     }}
//                     >
//                     <img
//                         style={{
//                         objectFit: 'cover',
//                         width: '100%',
//                         height: '100%',
//                         }}
//                         src={post.post_image_url}
//                         alt="Paella dish"
//                     />
//                     </CardMedia>
//                     <CardContent>
//                     <Typography variant="body2" color="text.secondary">
//                         {post.body}
//                     </Typography>
//                     </CardContent>
//                     <CardActions disableSpacing>
//                     <IconButton aria-label="add to favorites">
//                         <FavoriteIcon />
//                     </IconButton>
//                     <IconButton aria-label="share">
//                         <ShareIcon />
//                     </IconButton>
//                     <ExpandMore
//                         expand={expandedId === post.id}
//                         onClick={() => handleExpandClick(post.id)}
//                         aria-expanded={expandedId === post.id}
//                         aria-label="show more"
//                     >
//                         <ExpandMoreIcon />
//                     </ExpandMore>
//                     </CardActions>
//                     <Collapse
//                     in={expandedId === post.id}
//                     timeout="auto"
//                     unmountOnExit
//                     >
//                     <Box maxHeight="300px" overflow="auto">
//                         <Typography textAlign="center" paragraph>
//                         Comments:
//                         </Typography>
//                         {post?.comments?.map((comment, index) => (
//                         <CardContent key={index}>
//                             {allUsers
//                             .filter((user) => user.id === comment.user_id)
//                             .map((filteredUser) => (
//                                 <Typography key={filteredUser.id} paragraph>
//                                 {filteredUser.username}: {comment.body}
//                                 </Typography>
//                             ))}
//                         </CardContent>
//                         ))}
//                     </Box>
//                     <CommentsForm
//                         postId={post.id}
//                         allPosts={allPosts}
//                         setAllPosts={null}
//                     />
//                     </Collapse>
//                 </Card>
//                 ))}
//             </CenteredCardContainer>
//             : null
//          }

//             <ConfirmationDialog
//                 open={isConfirmationDialogOpen}
//                 onClose={handleConfirmationDialogClose}
//                 onConfirm={handleConfirmStartConversation}
//             />
//         </div>
//     )
// }
// export default SingleUser

  



