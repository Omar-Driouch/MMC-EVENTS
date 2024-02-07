import React, { useEffect } from "react";
import "./Dashboard.scss";
import { useSelector, useDispatch } from "react-redux";
import ConfirmationNumberRoundedIcon from "@mui/icons-material/ConfirmationNumberRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import RecordVoiceOverRoundedIcon from "@mui/icons-material/RecordVoiceOverRounded";
import HandshakeRoundedIcon from "@mui/icons-material/HandshakeRounded";
import { Link } from "react-router-dom";
import { getUsers } from "../../features/userSlice";
import { getEvents } from "../../features/eventSlice";
import { getSpeakers } from "../../features/speakerSlice";
import { getSessions } from "../../features/sessionSlice";
import { getPartners } from "../../features/partnerSlice";
const Dashboard = () => {
  const dispatch = useDispatch();
  const count = {
    users: useSelector((state) => state.user.users?.length),
    events: useSelector((state) => state.event.events?.length),
    speakers: useSelector((state) => state.speaker.speakers?.length),
    sessions: useSelector((state) => state.session.sessions?.length),
    partners: useSelector((state) => state.partner.partners?.length),
  };
  useEffect(() => {
    dispatch(getUsers());
    dispatch(getEvents());
    dispatch(getSpeakers());
    dispatch(getSessions());
    dispatch(getPartners());
  }, [dispatch]);
  return (
    <div className="dashboard">
      <h1>Overview</h1>
      <div className="overview-items">
        <div className="overview-item">
          <div className="item-top">Events</div>
          <div className="item-bottom">
            <div className="count">{count.events}</div>
            <div className="icon">
              <ConfirmationNumberRoundedIcon />
            </div>
          </div>
        </div>
        <div className="overview-item">
          <div className="item-top">Sessions</div>
          <div className="item-bottom">
            <div className="count">{count.sessions}</div>
            <div className="icon">
              <ConfirmationNumberRoundedIcon />
            </div>
          </div>
        </div>
        <div className="overview-item">
          <div className="item-top">Users</div>
          <div className="item-bottom">
            <div className="count">{count.users}</div>
            <div className="icon">
              <PeopleRoundedIcon />
            </div>
          </div>
        </div>
        <div className="overview-item">
          <div className="item-top">Speakers</div>
          <div className="item-bottom">
            <div className="count">{count.speakers}</div>
            <div className="icon">
              <RecordVoiceOverRoundedIcon />
            </div>
          </div>
        </div>

        <div className="overview-item">
          <div className="item-top">Partners</div>
          <div className="item-bottom">
            <div className="count">{count.partners}</div>
            <div className="icon">
              <HandshakeRoundedIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
