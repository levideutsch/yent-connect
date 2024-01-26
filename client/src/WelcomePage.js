import React from 'react';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Diversity2Icon from '@mui/icons-material/Diversity2';

const StyledContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh', 
  width: '100%',
  position: 'relative', 
  backgroundColor: 'black', 
  minWidth: '100%', 
});

const StyledPaper = styled(Paper)({
  padding: '20px',
  textAlign: 'center',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

const CenteredButtons = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '20px',
});


const WelcomePage = () => {
  return (
    <StyledContainer>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: 'black' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <Typography variant="h5" component="div" style={{ marginRight: '8px', color: 'white' }}>
            Yent
          </Typography>
          <Diversity2Icon fontSize="large" style={{ color: 'white' }} />
          <Typography variant="h5" component="div" style={{ marginLeft: '8px', color: 'white' }}>
            Connect
          </Typography>
        </div>
        <StyledPaper>
          <Typography variant="h4" gutterBottom>
            Welcome!
          </Typography>
          <Typography variant="body1" color="textSecondary" mb={3}>
            Explore A New Way To Yent And Connect.
          </Typography>
          <CenteredButtons>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  marginRight: 2,
                  backgroundColor: 'black',
                  '&:hover': {
                    backgroundColor: 'black', // Set hover color to black
                  },
                }}
              >
                Login
              </Button>
            </Link>
            <Link to="/signup" style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  backgroundColor: 'black',
                  '&:hover': {
                    backgroundColor: 'black', // Set hover color to black
                  },
                }}
              >
                Signup
              </Button>
            </Link>
        </CenteredButtons>
        </StyledPaper>
      </div>
    </StyledContainer>
  );
};

export default WelcomePage;




// import * as React from 'react';
// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
// import { Link } from 'react-router-dom';
// import backgroundImage from './yent-connect-logo.png'



// function WelcomePage() {
//     return (
//         <div
//         style={{
//             // backgroundImage: `url("https://static.vecteezy.com/system/resources/previews/008/197/141/non_2x/messaging-app-icon-set-suitable-for-user-interface-design-elements-of-chat-and-messaging-applications-an-elaborated-collection-of-message-and-email-icons-editable-eps10-illustration-free-vector.jpg")`,
//         //   backgroundColor: "white",
//         backgroundImage: `url(${backgroundImage})`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           backgroundRepeat: 'no-repeat',
//         //   color: "white",
//           minHeight: "100vh",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "center",
//         //   textAlign: "center",
//           opacity: 0.5,
//         }}
//       >
//          <p style={{color: "black"}}>Welcome!</p>
//         <div>
//           <Stack spacing={2} direction="row">
//             <Link to="/login" style={{ textDecoration: "none" }}>
//               <Button variant="contained">Login</Button>
//             </Link>
//             <Link to="/signup" style={{ textDecoration: "none" }}>
//               <Button variant="contained">Signup</Button>
//             </Link>
//           </Stack>
//         </div>
//       </div>
//     );
// }
// export default WelcomePage