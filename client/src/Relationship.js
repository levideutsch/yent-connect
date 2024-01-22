import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from './context/User';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import api from './util/api';

function Relationship({ userId }) {
  const { user } = useContext(UserContext);
  const [doesFollow, setDoesFollow] = useState(null);

  useEffect(() => {
    fetchRelationshipData();
  }, [userId]);

  const fetchRelationshipData = async () => {
    try {
      // Fetch follow data for user / post
      const relationships = await api("current-users-relationships").then(response => response.json());

      // Check if current user follows this user
      const userFollow = relationships.following.find(follower => follower.id === userId);
      setDoesFollow(!!userFollow);
    } catch (error) {
      console.log("Error fetching relationship data");
    }
  };

  const handleFollow = () => {
    if (doesFollow) {
      // Unfollow user
      api(`unfollow-user/${userId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })
        .then(response => response.json())
        .then(data => {
          if (!data.errors) {
            console.log("Successfully unfollowed user");
            setDoesFollow(false);
          } else {
            console.log("Error unfollowing user");
          }
        })
        .finally(() => {
          // Any cleanup or additional logic can go here
        });
    } else {
      // Follow user
      api(`follow-user/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
        .then(response => response.json())
        .then(data => {
          if (!data.errors) {
            console.log("Successfully followed user");
            setDoesFollow(true);
          } else {
            console.log("Error following user");
          }
        })
        .finally(() => {
          // Any cleanup or additional logic can go here
        });
    }
  };

  return (
    <div onClick={handleFollow}>
      {doesFollow ? <PersonRemoveIcon /> : <PersonAddIcon />}
    </div>
  );
}

export default Relationship;
