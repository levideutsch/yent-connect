import React, { useState, useContext } from 'react';
import { UserContext } from './context/User';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  CircularProgress,
  Typography,
  Container,
  Paper,
  Box,
} from '@mui/material';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import api from './util/api';

function Login() {
  const { errors, setErrors, login, clientValidations, setClientValidations } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleValidation = () => {
    if (!username) {
      setClientValidations('Username is required.');
      return false;
    }

    if (!password) {
      setClientValidations('Password is required.');
      return false;
    }

    setClientValidations(null);
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!handleValidation()) {
      return;
    }

    setLoading(true);

    api('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (!user.errors) {
          login(user);
          navigate('/');
          window.location.reload();
          setErrors([]);
          setClientValidations(null);
        } else {
          setUsername('');
          setPassword('');
          setClientValidations(null);
          setErrors(user.errors);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div style={{backgroundColor: 'black'}}>
    <Container component="main" maxWidth="xs" 
    style={{ 
      display: 'flex',
       flexDirection: 'column',
        alignItems: 'center',
         height: '100vh',
          justifyContent: 'center',
           }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <Typography variant="h5" component="div" style={{ marginRight: '8px', color: 'white' }}>
            Yent
          </Typography>
          <Diversity2Icon fontSize="large" style={{ color: 'white' }} />
          <Typography variant="h5" component="div" style={{ marginLeft: '8px', color: 'white' }}>
            Connect
        </Typography>
       </div>
      <Paper elevation={3} style={{ padding: '20px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5">Welcome Back!</Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: "20px" }}>
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="username-input">Username</InputLabel>
            <Input
              id="username-input"
              aria-describedby="username-helper-text"
              type="text"
              name="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setClientValidations(null);
              }}
            />
            <FormHelperText id="username-helper-text">{clientValidations}</FormHelperText>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="password-input">Password</InputLabel>
            <Input
              id="password-input"
              aria-describedby="password-helper-text"
              type="password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setClientValidations(null);
              }}
            />
            <FormHelperText id="password-helper-text"></FormHelperText>
          </FormControl>
          <Button type="submit" variant="contained" color="primary" 
          style={{ marginTop: '15px', marginRight: 2, backgroundColor: 'black', '&:hover': { backgroundColor: 'black'},}}>
            Submit
          </Button>
          {loading && <CircularProgress style={{ marginTop: '10px' }} />}
        </form>
        {errors && (
          <Typography variant="body2" color="error" style={{ marginTop: '10px' }}>
            {errors}
          </Typography>
        )}
      </Paper>
    </Container>
    </div>
  );
}

export default Login;




// import React, { useState, useContext } from 'react';
// import { UserContext } from './context/User';
// import { useNavigate } from 'react-router-dom';
// import { Button, FormControl, InputLabel, Input, FormHelperText, CircularProgress } from '@mui/material';
// import api from './util/api';

// function Login() {
//   const { errors, setErrors, login, clientValidations, setClientValidations } = useContext(UserContext);
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   const handleValidation = () => {
//     if (!username) {
//       setClientValidations('Username is required.');
//       return false;
//     }

//     if (!password) {
//       setClientValidations('Password is required.');
//       return false;
//     }

//     setClientValidations(null); // Clear any previous errors
//     return true;
//   };



//     const handleSubmit = (event) => {
//         event.preventDefault();

//         if (!handleValidation()) {
//             return;
//         }

//         setLoading(true);

//         api('/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//             username: username,
//             password: password,
//         }),
//         })
//         .then((response) => response.json())
//         .then((user) => {
//             if (!user.errors) {
//             login(user);
//             navigate('/');
//             window.location.reload();
//             setErrors([])
//             setClientValidations(null)
//             } else {
//             setUsername('');
//             setPassword('');
//             setClientValidations(null)
//             setErrors(user.errors);
//             }
//         })
//         .finally(() => {
//             setLoading(false); 
//         });
//     };


//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
//       <h1>Welcome Back</h1>
//       <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//         <FormControl>
//           <InputLabel htmlFor="username-input">Username</InputLabel>
//           <Input
//             id="username-input"
//             aria-describedby="username-helper-text"
//             type="text"
//             name="username"
//             value={username}
//             onChange={(e) => {
//                 setUsername(e.target.value);
//                 setClientValidations(null); // Clear errors when the user starts typing
//               }}
//           />
//           <FormHelperText id="username-helper-text">{clientValidations}</FormHelperText>
//         </FormControl>
//         <FormControl>
//           <InputLabel style={{ marginTop: '10px' }} htmlFor="password-input">Password</InputLabel>
//           <Input
//             id="password-input"
//             aria-describedby="password-helper-text"
//             type="password"
//             name="password"
//             value={password}
//             onChange={(e) => {
//                 setPassword(e.target.value);
//                 setClientValidations(null); // Clear errors when the user starts typing
//               }}
//           />
//           <FormHelperText id="password-helper-text"></FormHelperText>
//         </FormControl>
//         <Button type="submit" variant="contained" color="primary" style={{marginTop: "5px"}}>
//           Submit
//         </Button>
//         {loading && <CircularProgress />}
//       </form>
//       <p style={{ marginTop: '3px' }}>{errors}</p>
//     </div>
//   );
// }

// export default Login;
