import React, {useEffect, useState, useContext} from 'react';
import { UserContext } from './context/User';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import api from './util/api';


function LikeButton({ postId } ) {
    const {  user } = useContext(UserContext)
    const [isLiked, setIsLiked] = useState(false)
    const [totalLikes, setTotalLikes] = useState(0);


    useEffect(() => {
        // Check if the post is liked when the component mounts
        // You may need to fetch the like status from the server
        fetchData();
      }, [postId]);


      const fetchData = async () => {
        try {
          // Fetch all likes for the post
          const likes = await api(`all-likes-for-post/${postId}`).then(response => response.json());
    
          // Check if the current user has liked the post
          const userLike = likes.find(like => like.user_id === user.id);
    
          // Update the isLiked state based on the result
          setIsLiked(!!userLike);

          setTotalLikes(likes.length);
        } catch (error) {
          console.error('Error fetching likes:', error);
        }
      };


    const handleLike = () => {
        
        if (isLiked) {
          api(`unlike-post/${postId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
          })
            .then(response => response.json())
            .then(data => {
              if (!data.errors) {
                console.log("like successfully removed");
                setIsLiked(false);
                setTotalLikes(prevTotalLikes => Math.max(0, prevTotalLikes - 1));
              } else {
                console.log("error removing like");
              }
            })
            .finally(() => {
             
            });
        } else {
         
          api(`like-post/${postId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
          })
            .then(response => response.json())
            .then(data => {
              if (!data.errors) {
                console.log("like successfully submitted");
                setIsLiked(true);
                setTotalLikes(prevTotalLikes => prevTotalLikes + 1);
              } else {
                console.log("error submitting like");
              }
            })
            .finally(() => {
              
            });
        }
      };
    


    return (
        <div>
        <IconButton aria-label="add to favorites" onClick={handleLike} style={{ color: isLiked ? 'red' : 'inherit' }}>
          <FavoriteIcon />
        </IconButton>
        <span>{totalLikes} likes</span>
      </div>
    )
}
export default LikeButton