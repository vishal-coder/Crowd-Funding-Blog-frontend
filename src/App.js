import "./App.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import CreatePost from "./components/CreatePost.js";
import Dashboard from "./components/Dashboard";
import ForgotPassword from "./components/ForgotPassword.js";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Posts from "./components/Posts";
import Register from "./components/Register";
import ResetPassword from "./components/ResetPassword";
import Single from "./components/Single";
import UserView from "./components/UserView";
import VerifyEmail from "./components/VerifyEmail";
import VerifyToken from "./components/VerifyToken";
import NotFound from "./components/NotFound.js";
import { setpostList } from "./features/postSlice";
import { getAllPost } from "./services/postService";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const response = await getAllPost();
      dispatch(setpostList(response.posts));
    }
    fetchData();
  }, []);
  return (
    <div className="App">
      <ToastContainer theme="colored" />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/singlePost/:Id" element={<Single />} />
        <Route path="/createPost" element={<CreatePost />} />
        <Route path="forgotpassword" element={<ForgotPassword />} />
        <Route path="/verifyEmail/:token" element={<VerifyEmail />} />
        <Route path="/verifyToken" element={<VerifyToken />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/userView" element={<UserView />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/:category" element={<Posts />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate replace to="/404" />} />
      </Routes>
    </div>
  );
}

export default App;
