// import React, { useContext, useState, useEffect } from "react";
// import { UserContext } from "./context/User";
// import { useNavigate, useParams } from "react-router-dom";
// import { Avatar, Box, Paper, Typography, TextField, IconButton, Grid, AppBar, Toolbar  } from '@mui/material';
// import SendIcon from '@mui/icons-material/Send';
// import api from "./util/api";

// function Chat() {
//   const { user, allUsers } = useContext(UserContext);
//   const { chatId, userId } = useParams();
//   let u = allUsers.find(u => u.id == parseInt(userId));

//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');

//   const handleSendMessage = (event) => {
//     event.preventDefault();

//     api(`new-message/${chatId}/${userId}`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         body: newMessage,
//       }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (!data.errors) {
//           fetchMessages();
//           setNewMessage('');
//         } else {
//           throw new Error('Failed to send message');
//         }
//       })
//       .finally(() => {
//         console.log("message sent");
//       });
//   };

//   const fetchMessages = async () => {
//     try {
//       const response = await api(`conversations/${chatId}/show`);
//       const { messages } = await response.json();
//       setMessages(messages);
//     } catch (error) {
//       console.error('Error fetching messages:', error.message);
//     }
//   };

//   useEffect(() => {
//     // Fetch messages for the specific conversation
//     fetchMessages();
//   }, [chatId]);

//   return (
//     <Box p={2} height="100%" display="flex" flexDirection="column" alignItems="center">
//              <AppBar position="static">
//         <Toolbar>
//           <Avatar>

//           </Avatar>
//           <Box sx={{ flexGrow: 1, ml: 2 }}>
//             <Typography variant="h6">
//               {u?.username}
//             </Typography>
//           </Box>
//         </Toolbar>
//       </AppBar>
//       <Paper elevation={3} style={{ flex: 1, overflowY: 'scroll', height: '600px', maxHeight: '580px', padding: '16px', maxWidth: '400px', width: '120%' }}>
//         {messages.map((message) => (
//           <Grid container key={message.id} justifyContent={message.user_id === user.id ? 'flex-end' : 'flex-start'} alignItems="center" mb={2}>
//             {message.user_id !== user.id && (
//               <Grid item>
//                 <Avatar />
//               </Grid>
//             )}
//             <Grid item xs={8}>
//               <Paper elevation={3} style={{ padding: '8px', maxWidth: '300px', wordWrap: 'break-word' }}>
//                 <Typography variant="body1">{allUsers.find(u => u.id === message.user_id)?.username}: {message.body}</Typography>
//               </Paper>
//             </Grid>
//             {message.user_id === user.id && (
//               <Grid item>
//                 {user?.profile?.profile_photo_url ?  <Avatar src={user?.profile?.profile_photo_url} />  : <Avatar />}
//               </Grid>
//             )}
//           </Grid>
//         ))}
//       </Paper>
//       <Box display="flex" alignItems="center" mt={2} width="100%">
//         <TextField
//           fullWidth
//           variant="outlined"
//           label="Type your message"
//           size="small"
//           margin="dense"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === 'Enter') {
//               e.preventDefault();
//               handleSendMessage(e);
//             }
//           }}
//         />
//         <IconButton color="primary" aria-label="send" onClick={handleSendMessage}>
//           <SendIcon />
//         </IconButton>
//       </Box>
//     </Box>
//   );
// }

// export default Chat;


import React, { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "./context/User";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, Box, Paper, Typography, TextField, IconButton, Grid, AppBar, Toolbar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import api from "./util/api";
import Scroll from 'smooth-scroll';

function Chat() {
  const { user, allUsers } = useContext(UserContext);
  const { chatId, userId } = useParams();
  let u = allUsers.find(u => u.id == parseInt(userId));

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const lastMessageRef = useRef(null);
  const scroll = new Scroll();
  const handleSendMessage = (event) => {
    event.preventDefault();

    api(`new-message/${chatId}/${userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        body: newMessage,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.errors) {
          fetchMessages();
          setNewMessage('');
        } else {
          throw new Error('Failed to send message');
        }
      })
      .finally(() => {
        console.log("message sent");
      });
  };

  const fetchMessages = async () => {
    try {
      const response = await api(`conversations/${chatId}/show`);
      const { messages } = await response.json();
      setMessages(messages);
    } catch (error) {
      console.error('Error fetching messages:', error.message);
    }
  };
 

  useEffect(() => {
    fetchMessages();
  }, [chatId]);

  useEffect(() => {
    if (lastMessageRef.current) {
      scroll.animateScroll(lastMessageRef.current);
    }
  }, [messages]);

  return (
    <div style={{backgroundColor: "black"}}>
    <Box p={2} height="100%" display="flex" flexDirection="column" alignItems="center" style={{ overflow: 'auto', backgroundColor: "black" }}>
      <AppBar position="static" style={{backgroundColor: "black"}} >
        <Toolbar>
          <Avatar>
          </Avatar>
          <Box sx={{ flexGrow: 1, ml: 2 }}>
            <Typography variant="h6">
              {u?.username}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Paper elevation={3} style={{ flex: 1, overflowY: 'scroll', height: '600px', maxHeight: '590px', padding: '16px', maxWidth: '400px', width: '120%', backgroundColor: "black"}}>
      {messages ? (
  messages.map((message, index) => (
    <Grid container key={message.id} justifyContent={message.user_id === user.id ? 'flex-end' : 'flex-start'} alignItems="center" mb={2} ref={index === messages.length - 1 ? lastMessageRef : null}>
      {message.user_id !== user.id && (
        <Grid item>
          <Avatar />
        </Grid>
      )}
      <Grid item xs={8}>
        <Paper elevation={3} style={{ padding: '8px', wordWrap: 'break-word' }}>
          <Typography variant="body1">{allUsers.find(u => u.id === message.user_id)?.username}: {message.body}</Typography>
        </Paper>
      </Grid>
      {message.user_id === user.id && (
        <Grid item>
          {user?.profile?.profile_photo_url ? <Avatar src={user?.profile?.profile_photo_url} /> : <Avatar />}
        </Grid>
      )}
    </Grid>
  ))
) : null}
  
      </Paper> 
      <div style={{backgroundColor: "black"}}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        position="fixed"
        bottom="0"
        left="0%"
        right="0%"
        transform="translateX(-50%)"
        width="95%"
        padding="16px"
        backgroundColor="black"
        borderTop="1px solid #ccc"
      >
<TextField
  fullWidth
  variant="outlined"
  label="Type your message"
  size="small"
  margin="dense"
  value={newMessage}
  onChange={(e) => setNewMessage(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage(e);
    }
  }}
  InputProps={{
    style: { borderColor: 'white', color: 'white' },
  }}
  InputLabelProps={{
    style: { color: 'white' },
  }}
/>
        <IconButton color="primary" aria-label="send" onClick={handleSendMessage}>
          <SendIcon style={{color: "white"}} />
        </IconButton>
      </Box>
      </div>
    </Box>
    </div>
  );
}

export default Chat;




// import React, { useContext, useState, useEffect } from "react";
// import { UserContext } from "./context/User";
// import { useNavigate, useParams } from "react-router-dom";
// import { Avatar, Box, Paper, Typography, TextField, IconButton } from '@mui/material';
// import SendIcon from '@mui/icons-material/Send';
// import api from "./util/api";


// function Chat() {
//   const { allUsers } = useContext(UserContext);
//   const {  chatId, userId } = useParams();
//   let u = allUsers.find(u => u.id == parseInt(userId));

//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');

// //   const handleSendMessage = async () => {
// //     try {
// //       const response = await api(`messages/create_for_conversation/${chatId}`, {
// //         body: {body: newMessage},
// //       });

// //       if (!response.ok) {
// //         throw new Error('Failed to send message');
// //       }

// //       // Fetch updated messages after sending a new message
// //       fetchMessages();
// //       setNewMessage('');
// //     } catch (error) {
// //       console.error('Error sending message:', error.message);
// //     }
// //   };
// // const handleSendMessage = async () => {
// //     try {
// //       const response = await api(`new-message/${parseInt(chatId)}`, {
// //         body:{body: newMessage,} 
// //       });
  
// //       if (!response.ok) {
// //         throw new Error('Failed to send message');
// //       }
  
// //       // Fetch updated messages after sending a new message
// //       fetchMessages();
// //       setNewMessage('');
// //     } catch (error) {
// //       console.error('Error sending message:', error.message);
// //     }
// //   };

//   const handleSendMessage = (event) => {
//     event.preventDefault();


//     api(`new-message/${chatId}/${userId}`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//         body: newMessage,
//     }),
//     })
//     .then((response) => response.json())
   
//     .then((data) => {
//         if (!data.errors) {
//             fetchMessages();
//             setNewMessage('');

//         } else {
//             throw new Error('Failed to send message');
//         }
//     })
//     .finally(() => {
//         console.log("message sent")
//     });
// };
  

//   const fetchMessages = async () => {
//     try {
//       const response = await api(`conversations/${chatId}/show`);
//       const { messages } = await response.json();
//       setMessages(messages);
//     } catch (error) {
//       console.error('Error fetching messages:', error.message);
//     }
//   };

//   useEffect(() => {
//     // Fetch messages for the specific conversation
//     fetchMessages();
//   }, [chatId]);

//   return (
//     <Box p={2} height="100%" display="flex" flexDirection="column">
//       <Paper elevation={3} style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
//         {/* Display messages here */}
//         {messages.map((message) => (
//           <div key={message.id}>
//             <Avatar />
//             <Typography variant="body1">{
//             allUsers.find(u => u.id === message.user_id)?.username}: {message.body}</Typography>
//           </div>
//         ))}
//       </Paper>

//       <Box display="flex" alignItems="center" mt={2} type="submit">
//         <TextField
//           fullWidth
//           variant="outlined"
//           label="Type your message"
//           size="small"
//           margin="dense"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//         />
//         <IconButton color="primary" aria-label="send" onSubmit={handleSendMessage}>
//           <SendIcon />
//         </IconButton>
//       </Box>
//     </Box>
//   );
// }

// export default Chat;