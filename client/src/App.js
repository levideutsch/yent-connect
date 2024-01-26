// Config imports 
import React, { useContext } from "react";
import { UserContext } from "./context/User";
import { Routes, Route, BrowserRouter } from "react-router-dom"; 

// Component Imports 
import Home from "./Home";
import Navigation from "./Navigation";
import WelcomePage from "./WelcomePage";
import Login from "./Login";
import Signup from "./Signup";
import UserAccount from "./UserAccount";
import LatestPost from "./LatestPost";
// import UserProfile from "./UserProfile"
import Chat from "./Chat";
import TestHomePage from "./TesHomePage";
import ExplorePage from "./ExplorePage";
import NewUserProfile from "./NewUserProfile";



const AppWrapper = ({ children }) => {
  return (
    <div  style={{ backgroundColor: 'white', color: '#FFC107', minHeight: '100vh' }}>
      {children}
    </div>
  );
};

function App() {
  const { loggedIn } = useContext(UserContext);

  if (!loggedIn) {
    return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/*" element={<WelcomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    );
  } else {
    return (
      <BrowserRouter>
        <AppWrapper>
        <Navigation />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/test-home" element={<TestHomePage />} />
          <Route exact path="/explore" element={<ExplorePage />} />
          <Route exact path="/account" element={<UserAccount />} />
          {/* <Route exact path="/latest-post" element={<LatestPost />} /> */}
          <Route exact path="/user/:userId/chat/:chatId" element={<Chat />} />
          <Route exact path="/new-user-profile/:userId" element={<NewUserProfile />} />
        </Routes>
        </AppWrapper>
      </BrowserRouter>
    );
  }
}

export default App;






























































