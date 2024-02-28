import React, { useContext, useEffect, useState } from "react";
import "./LoginForm.css";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import vector from "../../assets/vector.svg";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import { auth } from "../../features/firebaseAuth";
import { UseContext } from "../hooks/UseContext";
import { useDispatch, useSelector } from "react-redux";
import { Login, getUsers } from "../../features/userSlice";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const UserExist = useSelector((state) => state.user.UserExist);
  const usersStatus = useSelector((state) => state.user.usersStatus);
  const usersError = useSelector((state) => state.user.usersError);
  const [loggedIn,setLoggedIn]=useState(false);

  const { setIsAuthenticatedToggle, handleSetCurrentUser } =
    useContext(UseContext);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setUserPassword(event.target.value);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await simulateAsyncOperation();
       dispatch(Login({ username, userPassword })).then((result)=>{
      
      if(result.payload !=="")
       setLoggedIn(true);
      console.log("this is result ",result.payload);

     });

    } catch (error) {
      console.error("Error occurred:", error);
    }
  };
  


  function simulateAsyncOperation() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const result = Math.random() < 0.5;
        resolve(result);
      }, 3000); 
    });
  }


  const handleRedirect = () => {


    if (loggedIn === true) {
       
      setIsAuthenticatedToggle(true, UserExist.UserStatus);
      handleSetCurrentUser(UserExist);  
     
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("currentUser", UserExist.userID);
      navigateTo("/");
      setUserPassword("");
      setUsername("");
      setLoggedIn(false);
    }
     

  }

  useEffect(() => {
    
     
      if(loggedIn)
      {

        handleRedirect();
      }
      
    
    
  
    
  }, [dispatch, UserExist, loggedIn])
  return (
    <section className="login-section">
      <div className="left">
        <img src={vector} alt="#" />
      </div>
      <div className="right">
        <div className="form-container">
          <h1>Sign in</h1>
          <form action="">
            <div className="field form-email">
              <label htmlFor="email">email</label>
              <div className="emailInput">
                <input
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                  placeholder="email"
                />
                <div className="emailIcon">
                  <EmailOutlinedIcon />
                </div>
              </div>
            </div>
            <div className="field form-password">
              <label htmlFor="password">password</label>
              <div className="passwordInput">
                <input
                  type="password"
                  value={userPassword}
                  onChange={handlePasswordChange}
                  placeholder="password"
                />
                <div className="passwordIcon">
                  <VpnKeyOutlinedIcon />
                </div>
              </div>
            </div>
            <button className="btn create-account-btn" onClick={handleSubmit}>
              sign in
            </button>
            <p>
              Don't have account ?<Link to="/register">Register</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
