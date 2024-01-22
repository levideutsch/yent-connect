// import React, { useContext, useState, useEffect } from "react";
// import { UserContext } from "./context/User";
// import { useNavigate, useParams } from "react-router-dom";
// import { Link } from "react-router-dom";
// import { Avatar, Box, Paper, Typography, TextField, IconButton } from '@mui/material';
// import SendIcon from '@mui/icons-material/Send';
// import api from "./util/api";

// function Chat() {
//     const { allUsers, allPosts, user } = useContext(UserContext)
//     const { userId, chatId } = useParams()
//     let u = allUsers.find(u => u.id == parseInt(userId))// 

//     const [messages, setMessages] = useState([]);

//     useEffect(() => {
//       // Fetch messages for the specific conversation
//       const fetchMessages = async () => {
//         try {
//           const response = await api(`conversations/${chatId}/show`);
//           const { messages } = await response.json();
//           setMessages(messages);
//         } catch (error) {
//           console.error('Error fetching messages:', error.message);
//         }
//       };
  
//       fetchMessages();
//     }, [chatId]);

//     return (
//         <Box p={2} height="100%" display="flex" flexDirection="column">
//         <Paper elevation={3} style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
//           {/* Display messages here */}
//           <div>
//             <Avatar />
//             <Typography variant="body1">{user.username}: Hello, how are you?</Typography>
//           </div>
//           <div>
//             <Avatar />
//             <Typography variant="body1">{null}: I'm good, thank you!</Typography>
//           </div>
//           {/* More messages... */}
//         </Paper>
  
//         <Box display="flex" alignItems="center" mt={2}>
//           <TextField
//             fullWidth
//             variant="outlined"
//             label="Type your message"
//             size="small"
//             margin="dense"
//             // Add state and onChange handler for input value
//           />
//           <IconButton color="primary" aria-label="send">
//             <SendIcon />
//           </IconButton>
//         </Box>
//       </Box>
//     );
// }
// export default Chat

import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "./context/User";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, Box, Paper, Typography, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import api from "./util/api";


function Chat() {
  const { user, allUsers } = useContext(UserContext);
  const {  chatId, userId } = useParams();
  let u = allUsers.find(u => u.id == parseInt(userId));

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
console.log("user",userId)  
console.log("chat",chatId)
console.log(newMessage)
console.log(messages)
//   const handleSendMessage = async () => {
//     try {
//       const response = await api(`messages/create_for_conversation/${chatId}`, {
//         body: {body: newMessage},
//       });

//       if (!response.ok) {
//         throw new Error('Failed to send message');
//       }

//       // Fetch updated messages after sending a new message
//       fetchMessages();
//       setNewMessage('');
//     } catch (error) {
//       console.error('Error sending message:', error.message);
//     }
//   };
// const handleSendMessage = async () => {
//     try {
//       const response = await api(`new-message/${parseInt(chatId)}`, {
//         body:{body: newMessage,} 
//       });
  
//       if (!response.ok) {
//         throw new Error('Failed to send message');
//       }
  
//       // Fetch updated messages after sending a new message
//       fetchMessages();
//       setNewMessage('');
//     } catch (error) {
//       console.error('Error sending message:', error.message);
//     }
//   };

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
        console.log("message sent")
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
    // Fetch messages for the specific conversation
    fetchMessages();
  }, [chatId]);

  return (
    <Box p={2} height="100%" display="flex" flexDirection="column">
      <Paper elevation={3} style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
        {/* Display messages here */}
        {messages.map((message) => (
          <div key={message.id}>
            <Avatar />
            <Typography variant="body1">{
            allUsers.find(u => u.id === message.user_id)?.username}: {message.body}</Typography>
          </div>
        ))}
      </Paper>

      <Box display="flex" alignItems="center" mt={2}>
        <TextField
          fullWidth
          variant="outlined"
          label="Type your message"
          size="small"
          margin="dense"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <IconButton color="primary" aria-label="send" onClick={handleSendMessage}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default Chat;
