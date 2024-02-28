import React, { useContext, useEffect, useRef, useState } from "react";
import "./Header.scss";
import mmcLogo from "../../assets/mmcLogo.svg";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

import { UseContext } from "../hooks/UseContext";
import { useDispatch, useSelector } from "react-redux";
import { GetUserByID } from "../../features/userSlice";


const Header = () => {
  const dispatch  = useDispatch();
  const [user,setUser] = useState({});
  const User = useSelector((state) => state.user.UserID);



  const navigateTo = useNavigate();
  const { isAuth,currentUser, userRole, setIsAuthenticatedToggle } =
  useContext(UseContext);
  const headerTopRef = useRef(null);
  const [showAccount, setShowAccount] = useState(false);
  const handleLogoutFucntion = ()=>{
    localStorage.setItem("isLoggedIn", false);
    setIsAuthenticatedToggle(false, "User");
    navigateTo("/");
  }


  const handleGoToProfile = ()=>{
    navigateTo("/profile");
  }

  

  
  useEffect(() => {
    
    const userID = localStorage.getItem("currentUser");
    console.log("userID",userID);
    dispatch(GetUserByID(parseInt(userID))).then((result)=>{
        if(result.meta.requestStatus !== "rejected")
        {
          setUser(result.payload);
           console.log("Header",User);
        }
       
    });


    const handleScroll = () => {
      if (window.scrollY > 100) {
        headerTopRef.current.style.boxShadow =
          "rgba(0, 0, 0, 0.1) 0px 4px 12px";
      } else {
        headerTopRef.current.style.boxShadow = "none";
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    
   
  }, []);
  const navigate = useNavigate();
  const handleRedirectToLogin = ()=>{
    navigate("/login");
    setShowAccount(false);
  }
  console.log("Header",User);
  return (
    <header className="header" ref={headerTopRef}>
      <div className="container-header">
        <div className="header-top">
          <Link to="/" className="logo">
            <img src={mmcLogo} width={80} alt="app-logo" />
          </Link>
          <div className="menu">
            <ul className="nav-menu">
              <li className="menu-item">
                <NavLink className="menu-link" to="/">
                  Home
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink className="menu-link" to="/events">
                  Events
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink className="menu-link" to="/speakers">
                  Speakers
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink className="menu-link" to="/about">
                  About
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="header-left">
            <div className="header-search-box">
              <input type="search" placeholder="search for Event ..." />
              <div className="header-search-icon">
                <SearchRoundedIcon />
              </div>
            </div>
            <div className="account-box">
              <button
                className="btn-profile"
                onClick={() => {
                  setShowAccount(!showAccount);
                }}
              >
                <PersonOutlineIcon/>
             Profile
             
              </button>
              {showAccount && (
                <div className="auth-box">
                  
                  {isAuth ? (<> <button className="btn login-btn" onClick={handleLogoutFucntion} >Logout</button>
                  <button className="btn login-btn" onClick={handleGoToProfile} >Profile</button></>) : <>
                  <button className="btn login-btn" onClick={()=>{handleRedirectToLogin()}}>login</button>
                  <Link className="btn register-btn" to="/register">register</Link>
                  
                  </>}
                  
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
