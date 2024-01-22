import React, { useState, useEffect, useCallback } from "react";
import api from "../util/api";


const UserContext = React.createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userSettings, setUserSettings] = useState(null)
  const [allPosts, setAllPosts] = useState([])
  const [errors, setErrors] = useState([]);
  const [clientValidations, setClientValidations] = useState(null)
  const [allUsers, setAllUsers] = useState([])
  const [relationships, setRelationships] = useState([])
  const [allUsersPosts, setAllUsersPosts] = useState([])



  const getMe = useCallback(async () => {
    const data = await api("me").then(r => r.json())
    setUser(data)
    setUserSettings(data.user_setting)
    if (!data.errors) setLoggedIn(true)
  }, [])


  const getPosts = useCallback(async () => {
    const posts = await api("posts").then(r => r.json())
    setAllPosts(posts)
  })

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
    getPosts()
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
    setAllPosts((prevPosts) => ({
      posts: prevPosts.posts.map((post) =>
        post.id === postId ? { ...post, comments: [newComment, ...post.comments] } : post
      )
    }));
  };



 






  return (
    <UserContext.Provider value={{ 
        login,
        logout,
        signup,
        loggedIn,
        userSettings,
        setUserSettings,
        user,
        errors,
        setErrors,
        clientValidations,
        setClientValidations,
        allPosts,
        setAllPosts,
        allUsers,
        addNewComment,
        // allLikes,
        // setAllLikes
        relationships,
        setRelationships,

        allUsersPosts, setAllUsersPosts
       }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };