// import * as React from 'react';
// import ToggleButton from '@mui/material/ToggleButton';
// import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
// import { Link } from 'react-router-dom';

// function TestHomePage() {
//     const [alignment, setAlignment] = React.useState('web');


//   const handleChange = (event, newAlignment) => {
//     setAlignment(newAlignment);
//   };
//   return (
//     <div style={{textAlign: 'center'}}>
//     <ToggleButtonGroup
//       color="primary"
//       value={alignment}
//       exclusive
//       onChange={handleChange}
//       aria-label="Platform"
//     >
//       <ToggleButton value="web">Following</ToggleButton>
//       <ToggleButton value="ios">Explore</ToggleButton>
//     </ToggleButtonGroup>
//     </div>
//   );
// }
// export default TestHomePage
import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Link } from 'react-router-dom';

function TestHomePage() {
  const [alignment, setAlignment] = React.useState('web');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        <Link to="/">
        <ToggleButton>
          Following
        </ToggleButton>
        </Link>
      <Link to="/explore">
      <ToggleButton >
          Explore
        </ToggleButton>
      </Link>
       
      </ToggleButtonGroup>
    </div>
  );
}

export default TestHomePage;
