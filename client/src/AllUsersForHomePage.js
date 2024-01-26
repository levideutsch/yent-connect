import React, { useState, useContext } from 'react';
import { UserContext } from './context/User';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import { Link } from 'react-router-dom';



function AllUsersForHomePage() {
    const { allUsers, user } = useContext(UserContext)
    const [whoToFollow, setWhoToFollow] = useState(false)


    const handleChange = (event) => {
        setWhoToFollow(event.target.checked);
      };
    

    return (
        <div style={{textAlign: 'center'}}>
            {whoToFollow ? <p style={{color: 'white'}}> Hide </p> : <p style={{ color: 'white'}}> See Who To Follow</p>}  
            <Switch
                checked={whoToFollow}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
            />
         {whoToFollow ? (
         <div>
            {allUsers?.map((follower) => (
              <Link to={`/new-user-profile/${follower.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                             <div
                             key={follower.id}
                             style={{
                                 display: 'flex',
                                 alignItems: 'center',
                                 justifyContent: 'center',
                                 height: '80px'
                                 }}
                             >
                                 <List style={{ width: '100%', maxWidth: '360px' }}>
                                 <ListItem >
                                     <ListItemAvatar > 
                                     <Avatar alt="Follower Avatar" src={follower?.profile?.profile_photo_url} />
                                     </ListItemAvatar>
                                     <ListItemText style={{color: "white", marginLeft: '16px'}}>
                                        {follower.username}
                                        <hr />
                                     </ListItemText>
                                 </ListItem>
                                 </List>
                             </div>   
                             </Link>
            ))}
            </div>
            ) : null}

        </div>
    )
}
export default AllUsersForHomePage


