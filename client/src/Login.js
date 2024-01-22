import React, { useState, useContext } from 'react';
import { UserContext } from './context/User';
import { useNavigate } from 'react-router-dom';
import { Button, FormControl, InputLabel, Input, FormHelperText, CircularProgress } from '@mui/material';
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

    setClientValidations(null); // Clear any previous errors
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
            setErrors([])
            setClientValidations(null)
            } else {
            setUsername('');
            setPassword('');
            setClientValidations(null)
            setErrors(user.errors);
            }
        })
        .finally(() => {
            setLoading(false); 
        });
    };


  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
      <h1>Welcome Back</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <FormControl>
          <InputLabel htmlFor="username-input">Username</InputLabel>
          <Input
            id="username-input"
            aria-describedby="username-helper-text"
            type="text"
            name="username"
            value={username}
            onChange={(e) => {
                setUsername(e.target.value);
                setClientValidations(null); // Clear errors when the user starts typing
              }}
          />
          <FormHelperText id="username-helper-text">{clientValidations}</FormHelperText>
        </FormControl>
        <FormControl>
          <InputLabel style={{ marginTop: '10px' }} htmlFor="password-input">Password</InputLabel>
          <Input
            id="password-input"
            aria-describedby="password-helper-text"
            type="password"
            name="password"
            value={password}
            onChange={(e) => {
                setPassword(e.target.value);
                setClientValidations(null); // Clear errors when the user starts typing
              }}
          />
          <FormHelperText id="password-helper-text"></FormHelperText>
        </FormControl>
        <Button type="submit" variant="contained" color="primary" style={{marginTop: "5px"}}>
          Submit
        </Button>
        {loading && <CircularProgress />}
      </form>
      <p style={{ marginTop: '3px' }}>{errors}</p>
    </div>
  );
}

export default Login;











// import React, { useState, useContext} from 'react';
// import { UserContext } from './context/User';
// import { useNavigate } from "react-router-dom";
// import { Button, FormControl, InputLabel, Input, FormHelperText } from '@mui/material';
// import api from './util/api';

// function Login() {
//     const { errors, setErrors, login} = useContext(UserContext);
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();
// console.log(errors)

//     const handleSubmit = (event) => {
//         event.preventDefault()
    
//         api("/login", {
//             method: 'POST',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify({
//                 username: username,
//                 password: password,
//             })
//         })
//         .then(response => response.json())
//         .then(user => {
//             if (!user.errors) {
//                 login(user)
//                 navigate("/")
//             } else {

//                 setUsername("")
//                 setPassword("")
//                 setErrors(user.errors)
//             }
//         })
//     };
  
//     return (
//         <div  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
//             <h1>Welcome Back</h1>
//             <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//                 <FormControl>
//                 <InputLabel htmlFor="my-input">Username</InputLabel>
//                 <Input 
//                 id="username-input" 
//                 aria-describedby="username-helper-text"
//                 type='text'
//                 name='username'
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 />
//                 <FormHelperText id="my-helper-text"></FormHelperText>
//                 </FormControl>
//                 <br />
//                 <FormControl>
//                 <InputLabel htmlFor="password-input">Password</InputLabel>
//                 <Input 
//                 id="password-input" 
//                 aria-describedby="password-helper-text" 
//                 type='password'
//                 name='password'
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <FormHelperText id="my-helper-text"></FormHelperText>
//                 </FormControl>
//                 <br />
//                 <Button type="submit" variant="contained" color="primary">
//                     Submit
//                 </Button>
//             </form>
           
//             <p style={{marginTop: "-5px"}}>{errors}</p>
//         </div>
//     )
// }
// export default Login