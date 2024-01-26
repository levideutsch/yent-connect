import React, { useState, useEffect, useCallback } from "react";
import api from "../util/api";


const UserContext = React.createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userSettings, setUserSettings] = useState(null)
  const [errors, setErrors] = useState([]);
  const [clientValidations, setClientValidations] = useState(null)
  const [allUsers, setAllUsers] = useState([])
  const [relationships, setRelationships] = useState([])
  const [allUsersPosts, setAllUsersPosts] = useState([])
  const [blah, setBlah] = useState([])
 

  const filteredPostsFollowingOnly = allUsersPosts.posts?.filter((post) => {
    
    return (
      relationships?.following?.some((followingUser) => followingUser?.id === post?.user_id) ||
      user?.id === post?.user_id
    );
  });


//  const changeFollowing = useCallback(async () => {
//   const filteredPostsFollowingOnly = allUsersPosts.posts?.filter((post) => {
    
//     return (
//       relationships?.following?.some((followingUser) => followingUser?.id === post?.user_id) ||
//       user?.id === post?.user_id
//     );
//   } );
//   setBlah(filteredPostsFollowingOnly)
//  }, [])

//  console.log(blah)


  
  const getMe = useCallback(async () => {
    const data = await api("me").then(r => r.json())
    setUser(data)
    setUserSettings(data.user_setting)
    if (!data.errors) setLoggedIn(true)
  }, [])



  const getAllUsersPosts = useCallback(async () => {
    const posts = await api("all-users-posts").then(r => r.json())
    setAllUsersPosts(posts)
  })

  const getAllUsers = useCallback(async () => {
    const users = await api("all-users").then(r => r.json())
    setAllUsers(users)
  })


  const getRelationships = useCallback(async () => {
    const relationships = await api("current-users-relationships").then(r => r.json())
    setRelationships(relationships)
  })

  useEffect(() => {
    getMe()
    getAllUsers()
    getRelationships()
    getAllUsersPosts()
  }, [getMe])


  const signup = (user) => {
    setUser(user)
    setLoggedIn(true)
  }

  const login = (user) => {
    setUser(user)
    setLoggedIn(true)
  }

  const logout = () => {
    setLoggedIn(false)
  }


const addNewComment = (newComment, postId) => {
  setAllUsersPosts((prevPosts) => ({
      posts: prevPosts.posts.map((post) =>
        post.id === postId ? { ...post, comments: [newComment, ...post.comments] } : post
      )
    }));
  };


  return (
    <UserContext.Provider value={{ 
        login, logout, signup, loggedIn,
        userSettings, setUserSettings, user,
        errors, setErrors,
        clientValidations, setClientValidations,
        allUsers,
        addNewComment,
        relationships, setRelationships,
        allUsersPosts, setAllUsersPosts, filteredPostsFollowingOnly
       }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };