// import * as React from 'react';
// import ToggleButton from '@mui/material/ToggleButton';
// import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
// import { Link } from 'react-router-dom';

// function TestHomePage() {
//   const [alignment, setAlignment] = React.useState(null);

//   const handleChange = (event, newAlignment) => {
//     setAlignment(newAlignment);
//   };

//   return (
//     <div style={{ textAlign: 'center' }}>
//       <ToggleButtonGroup
//         color="primary"
//         value={alignment}
//         exclusive
//         onChange={handleChange}
//         aria-label="Platform"
//       >
//         <Link to="/">
//           <ToggleButton
//             style={{ color: alignment === 'web' ? 'white' : undefined }}
//             value="web"
//           >
//             Following
//           </ToggleButton>
//         </Link>
//         <Link to="/explore">
//           <ToggleButton
//             style={{ color: alignment === 'explore' ? 'white' : undefined }}
//             value="explore"
//           >
//             Explore
//           </ToggleButton>
//         </Link>
//       </ToggleButtonGroup>
//     </div>
//   );
// }

// export default TestHomePage;


// import * as React from 'react';
// import ToggleButton from '@mui/material/ToggleButton';
// import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
// import { Link } from 'react-router-dom';

// function TestHomePage() {
//   const [alignment, setAlignment] = React.useState('web');

//   const handleChange = (event, newAlignment) => {
//     setAlignment(newAlignment);
//   };

//   return (
//     <div style={{ textAlign: 'center' }}>
//       <ToggleButtonGroup
//         color="primary"
//         value={alignment}
//         exclusive
//         onChange={handleChange}
//         aria-label="Platform"
//       >
//         <Link to="/">
//         <ToggleButton>
//           Following
//         </ToggleButton>
//         </Link>
//       <Link to="/explore">
//       <ToggleButton >
//           Explore
//         </ToggleButton>
//       </Link>
       
//       </ToggleButtonGroup>
//     </div>
//   );
// }



// import * as React from 'react';
// import ToggleButton from '@mui/material/ToggleButton';
// import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
// import { Link } from 'react-router-dom';

// function TestHomePage() {
//   const [alignment, setAlignment] = React.useState(null);

//   const handleChange = (event, newAlignment) => {
//     setAlignment(newAlignment);
//   };

//   return (
//     <div style={{ textAlign: 'center' }}>
//       <ToggleButtonGroup
//         color="primary"
//         value={alignment}
//         exclusive
//         onChange={handleChange}
//         aria-label="Platform"
//       >
//         <Link to="/" style={{backgroundColor: "white"}}>
//           <ToggleButton
//             style={{ color: alignment === 'web' ? 'black' : 'black' }}
//             value="web"
//           >
//             Following
//           </ToggleButton>
//         </Link>
//         <Link to="/explore">
//           <ToggleButton
//             style={{ color: alignment === 'explore' ? 'white' : 'white' }}
//             value="explore"
//           >
//             Explore
//           </ToggleButton>
//         </Link>
//       </ToggleButtonGroup>
//     </div>
//   );
// }

// export default TestHomePage;


import React, { useEffect } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Link, useLocation } from 'react-router-dom';

function TestHomePage() {
  const [alignment, setAlignment] = React.useState('web');
  const location = useLocation();

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  useEffect(() => {
    if (location.pathname === '/explore') {
      // Simulate a second click on "Explore" after a short delay when on Explore page
      const timeoutId = setTimeout(() => {
        setAlignment('web');
        setTimeout(() => {
          setAlignment('explore');
        }, 0);
      }, 100); // Adjust the delay as needed

      return () => clearTimeout(timeoutId); // Clear the timeout on component unmount
    }
  }, [location.pathname]);
  

  return (
    <div style={{ textAlign: 'center' }}>
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        <Link to="/" style={{ backgroundColor: alignment === 'web' ? 'white' : 'transparent' }}>
          <ToggleButton
            selected={alignment === 'web'}
            style={{ color: alignment === 'web' ? 'black' : 'white' }}
            value="web"
          >
            Following
          </ToggleButton>
        </Link>
        <Link to="/explore" style={{ backgroundColor: alignment === 'explore' ? 'white' : 'transparent' }}>
          <ToggleButton
            selected={alignment === 'explore'}
            style={{ color: alignment === 'explore' ? 'black' : 'white' }}
            value="explore"
          >
            Explore
          </ToggleButton>
        </Link>
      </ToggleButtonGroup>
    </div>
  );
}

export default TestHomePage;

