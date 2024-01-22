import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "./context/User";
import Switch from '@mui/material/Switch';
import api from "./util/api";

function UserAccount() {
  const { userSettings, setUserSettings, user, relationships } = useContext(UserContext);
  const [checked, setChecked] = useState(userSettings?.is_dark_mode || false);




  const handleSubmit = async () => {
    try {
      const response = await api("toggle-theme", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          is_dark_mode: checked,
        }),
      });

      if (response.ok) {
      
        setUserSettings({ ...userSettings, is_dark_mode: checked });
      } else {
        console.error("Failed to toggle theme");
      }
    } catch (error) {
      console.error("Error toggling theme", error);
    }
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);

    handleSubmit();
  };

  return (
    <div style={{ backgroundColor: checked ? '#000' : '#FFF', color: checked ? '#FFF' : '#000' }}>
      {user?.username}'s' account
      <Switch
        checked={checked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'controlled' }}
      />
        {/* <button onClick={handleSubmit}>Submit</button> */}
       <p>{checked ? 'Toggle Light Mode' : 'Toggle Dark Mode'}</p>
       <p>Followers: {relationships?.followers?.length}</p>
      <p>Following: {relationships?.following?.length}</p>
    </div>
  );
}

export default UserAccount;
