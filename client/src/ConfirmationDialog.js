// ConfirmationDialog.js
import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const ConfirmationDialog = ({ open, onClose, onConfirm }) => {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          backgroundColor: '#FFF',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="div" id="modal-modal-title" sx={{ textAlign: 'center' }}>
          Are you sure you want to start a conversation?
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}>
          <Button variant="contained" color="primary" onClick={onConfirm}>
            Yes
          </Button>
          <Button variant="outlined" color="secondary" onClick={onClose}>
            No
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmationDialog;


// ... (imports)

// function SingleUser() {
//     const { userId } = useParams();
//     const [expandedId, setExpandedId] = useState(null);
//     const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
//     const { allUsers, allPosts } = useContext(UserContext);
  
//     const user = allUsers.find(u => u.id === parseInt(userId));
  
//     const handleExpandClick = postId => {
//       setExpandedId(expandedId === postId ? null : postId);
//     };
  
//     const handleStartConversation = () => {
//       setConfirmationDialogOpen(true);
//     };
  
//     const handleConfirmationDialogClose = () => {
//       setConfirmationDialogOpen(false);
//     };
  
//     const handleConfirmStartConversation = () => {
//       // Implement logic to create a conversation (make API request, etc.)
//       setConfirmationDialogOpen(false);
//     };
  
//     return (
//       <div>
//         <h1 style={{ textAlign: 'center', color: 'black' }}>
//           {user?.username}'s Profile
//           <MessageIcon onClick={handleStartConversation} />
//         </h1>
  
//         <CenteredCardContainer>
//           {allPosts?.posts
//             ?.filter(post => post.user_id === user.id)
//             .map(post => (
//               <Card key={post.id} sx={{ maxWidth: 345, marginBottom: 5 }}>
//                 <CardHeader
//                   avatar={
//                     <Avatar sx={{ bgcolor: '#000' }} aria-label="recipe">
//                       {allUsers
//                         .filter(u => u.id === post.user_id)
//                         .map(filteredUser => (
//                           filteredUser.username[0].toUpperCase()
//                         ))}
//                     </Avatar>
//                   }
//                   // Other CardHeader props
//                 />
//                 <CardMedia
//                   component="div"
//                   style={{
//                     width: '100%',
//                     height: '200px',
//                     overflow: 'hidden',
//                   }}
//                 >
//                   <img
//                     style={{
//                       objectFit: 'cover',
//                       width: '100%',
//                       height: '100%',
//                     }}
//                     src={post.post_image_url}
//                     alt="Paella dish"
//                   />
//                 </CardMedia>
//                 <CardContent>
//                   <Typography variant="body2" color="text.secondary">
//                     {post.body}
//                   </Typography>
//                 </CardContent>
//                 <CardActions disableSpacing>
//                   {/* Other CardActions components */}
//                 </CardActions>
//                 <Collapse in={expandedId === post.id} timeout="auto" unmountOnExit>
//                   {/* Collapse content */}
//                 </Collapse>
//               </Card>
//             ))}
//         </CenteredCardContainer>
  
//         <ConfirmationDialog
//           open={isConfirmationDialogOpen}
//           onClose={handleConfirmationDialogClose}
//           onConfirm={handleConfirmStartConversation}
//           title="Start a Conversation"
//           description={`Do you want to start a conversation with ${user?.username}?`}
//         />
//       </div>
//     );
//   }
  
//   export default SingleUser;
  