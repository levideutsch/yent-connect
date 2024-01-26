import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './context/User';
import { Button, FormControl, InputLabel, Input, FormHelperText, CircularProgress, Typography, Container, Paper } from '@mui/material';
import api from './util/api';
import Diversity2Icon from '@mui/icons-material/Diversity2';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const { signup, errors, setErrors } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [clientValidations, setClientValidations] = useState(null);

  const handleValidation = () => {
    if (!username) {
      setClientValidations('Username is required.');
      return false;
    }

    if (!password) {
      setClientValidations('Password is required.');
      return false;
    }

    if (!passwordConfirmation) {
      setClientValidations('Password Confirmation is required.');
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

    api('/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
        password: password,
        password_confirmation: passwordConfirmation,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (!user.errors) {
          signup(user);
          navigate('/');
          window.location.reload();
          setErrors([]);
          setClientValidations(null);
        } else {
          setErrors(user.errors || []);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div style={{backgroundColor: 'black'}}>
      <Container component="main" maxWidth="xs" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', justifyContent: 'center' }}>
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
          <Typography variant="h5">Signup</Typography>
          <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
              <FormHelperText id="username-helper-text"></FormHelperText>
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
              <FormHelperText id="password-helper-text">{clientValidations}</FormHelperText>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="password-confirmation-input">Password Confirmation</InputLabel>
              <Input
                id="password-confirmation-input"
                aria-describedby="password-confirmation-helper-text"
                type="password"
                name="password-confirmation"
                value={passwordConfirmation}
                onChange={(e) => {
                  setPasswordConfirmation(e.target.value);
                  setClientValidations(null);
                }}
              />
              <FormHelperText id="password-confirmation-helper-text"></FormHelperText>
            </FormControl>
            <Button type="submit" variant="contained" color="primary" 
          style={{ marginTop: '15px', marginRight: 2, backgroundColor: 'black', '&:hover': { backgroundColor: 'black'},}}>
            Submit
          </Button>
            {loading && <CircularProgress style={{ marginTop: '10px' }} />}
          </form>
          {errors && (
            <Typography variant="body2" color="error" style={{ marginTop: '10px' }}>
              {errors[1]}
            </Typography>
          )}
          {errors && (
            <Typography variant="body2" color="error" style={{ marginTop: '10px' }}>
              {errors[0]}
            </Typography>
          )}
          {errors && (
            <Typography variant="body2" color="error" style={{ marginTop: '10px' }}>
              {errors[2]}
            </Typography>
          )}
        </Paper>
      </Container>
    </div>
  );
}

export default Signup;


// import React, { useState, useContext } from 'react';
// import { useNavigate } from "react-router-dom";
// import { UserContext } from './context/User';
// import { Button, FormControl, InputLabel, Input, FormHelperText, CircularProgress } from '@mui/material';
// import api from './util/api';

// function Signup() {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [passwordConfirmation, setPasswordConfirmation] = useState('');
//     const {signup, errors, setErrors} = useContext(UserContext)
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();
//     const [clientValidations, setClientValidations] = useState(null)

//     const handleValidation = () => {
//         if (!username) {
//           setClientValidations('Username is required.');
//           return false;
//         }
    
//         if (!password) {
//           setClientValidations('Password is required.');
//           return false;
//         }

//         if (!passwordConfirmation) {
//             setClientValidations('Password Confirmation is required.');
//             return false;
//         }
    
//         setClientValidations(null); 
//         return true;
//       };


//     const handleSubmit = (event) => {
//         event.preventDefault()

//         if (!handleValidation()) {
//             return;
//         }

//         setLoading(true);
    
//         api("/signup", {
//             method: 'POST',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify({
//                 username: username,
//                 password: password,
//                 password_confirmation: passwordConfirmation
//             })
//         })
//         .then(response => response.json())
//         .then(user => {
//             if (!user.errors) {
//                 signup(user)
//                 navigate("/")
//                 window.location.reload();
//                 setErrors([])
//                 setClientValidations(null)
//             } else {
//                 setErrors(user.errors || []);
//             }
//         })
//         .finally(() => {
//             setLoading(false)
//         })
//     };

//     return (
//         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
//             <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//                 <FormControl>
//                     <InputLabel htmlFor="my-input">Username</InputLabel>
//                     <Input 
//                     id="username-input" 
//                     aria-describedby="username-helper-text"
//                     type='text'
//                     name='username'
//                     value={username}
//                     onChange={(e) => {
//                         setUsername(e.target.value);
//                         setClientValidations(null); // Clear errors when the user starts typing
//                     }}
//                     />
//                     <FormHelperText id="my-helper-text"></FormHelperText>
//                 </FormControl>
//                 <br />
//                 <FormControl>
//                     <InputLabel htmlFor="password-input">Password</InputLabel>
//                     <Input 
//                     id="password-input" 
//                     aria-describedby="password-helper-text" 
//                     type='password'
//                     name='password'
//                     value={password}
//                     onChange={(e) => {
//                         setPassword(e.target.value);
//                         setClientValidations(null); // Clear errors when the user starts typing
//                     }}
//                     />
//                     <FormHelperText id="my-helper-text">{clientValidations}</FormHelperText>
//                 </FormControl>
//                 <br />
//                 <FormControl>
//                     <InputLabel htmlFor="password-confirmation-input">Password Confirmation</InputLabel>
//                     <Input 
//                     id="password-confirmation-input" 
//                     aria-describedby="password-confirmation-helper-text" 
//                     type='password'
//                     name='password-confirmation'
//                     value={passwordConfirmation}
//                     onChange={(e) => {
//                         setPasswordConfirmation(e.target.value);
//                         setClientValidations(null); 
//                       }}
//                     />
//                     <FormHelperText id="my-helper-text"></FormHelperText>
//                 </FormControl>
//                 <Button type="submit" variant="contained" color="primary">
//                 Submit
//                 </Button>
//                 {loading && <CircularProgress />}
//             </form>
//             <p style={{ marginTop: '0px' }}>{errors[1]}</p>
//             <p style={{ marginTop: '0px' }}>{errors[0]}</p>
//             <p style={{ marginTop: '0px' }}>{errors[2]}</p>
            
//         </div>
//     )
// }
// export default Signup