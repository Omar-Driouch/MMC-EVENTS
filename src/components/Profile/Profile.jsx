import React, { useContext, useEffect, useState } from "react";
import "./Profile.scss";
import { useDispatch, useSelector } from "react-redux";
import { GetUserByID, getUsers, getUsersOnly } from "../../features/userSlice";
import { UseContext } from "../hooks/UseContext";



const Profile = () => {
  const { currentUserID } = useContext(UseContext);

const dispatch = useDispatch();
const CurrentUser = useSelector((state) => state.user.userID);

	const [isUpdate, setIsUpdate]=useState(false);
	const handleIsUpdateChange=()=>{
		setIsUpdate(!isUpdate);
	}
  useEffect(() => {
    dispatch(GetUserByID(currentUserID));
    console.log(CurrentUser);
 
  }, [dispatch]);
  return (
    <>
      <div className="profile-container">
        <div className="profile-content">
           <h2>{CurrentUser?.userEmail}</h2> 
          <div className="profile-information">
            <div className="profile-info-content">
              <h4>First Name :</h4>
              <h4>Last Name :</h4>
              <h4>Email :</h4>
              <h4>Password :</h4>
              <h4>Gender :</h4>
              <h4>Phone :</h4>
              <h4>City :</h4>
            </div>
            <div className="profile-info-content">
           {isUpdate ? (
                <input value={"Omar Driouch "} />
              ) : (
                <h4>{CurrentUser?.firstName}</h4>
              )}
              <h4>{CurrentUser?.lastName}</h4>
              <h4>{CurrentUser?.userEmail} </h4>
              <h4>{CurrentUser?.userPassword}</h4>
              <h4>Male </h4>
              <h4>0626880254</h4>
              <h4>Kenitra</h4>
            </div>
          </div>
          <div className="button-conatiner">
            <button onClick={handleIsUpdateChange}>Update Information</button>
          </div>
          <div className="profile-sessions">
            <h2>List of all the sessions that is the user afftectd to </h2>
            <div className="sessionslist">
              <ul className="listofall-session">
                <li>
                  <img
                    src="https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg"
                    alt="Session image"
                  />
                  <div className="content-sessions-h2">
                    <h2>Session date</h2>
                    <h2>Session date</h2>
                  </div>
                  <button>RollBack Now</button>
                </li>
                <li>
                  <img
                    src="https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg"
                    alt="Session image"
                  />
                  <div className="content-sessions-h2">
                    <h2>Session date</h2>
                    <h2>Session date</h2>
                  </div>
                  <button>RollBack Now</button>
                </li>
                <li>
                  <img
                    src="https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg"
                    alt="Session image"
                  />
                  <div className="content-sessions-h2">
                    <h2>Session date</h2>
                    <h2>Session date</h2>
                  </div>
                  <button>RollBack Now</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
