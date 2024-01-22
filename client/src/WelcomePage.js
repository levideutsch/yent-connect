import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';


function WelcomePage() {
    return (
        <div
        style={{
            backgroundImage: `url("https://static.vecteezy.com/system/resources/previews/008/197/141/non_2x/messaging-app-icon-set-suitable-for-user-interface-design-elements-of-chat-and-messaging-applications-an-elaborated-collection-of-message-and-email-icons-editable-eps10-illustration-free-vector.jpg")`,
        //   backgroundColor: "white",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        //   color: "white",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        //   textAlign: "center",
          opacity: 0.5,
        }}
      >
         <p style={{color: "black"}}>Welcome!</p>
        <div>
          <Stack spacing={2} direction="row">
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button variant="contained">Login</Button>
            </Link>
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <Button variant="contained">Signup</Button>
            </Link>
          </Stack>
        </div>
      </div>
    );
}
export default WelcomePage