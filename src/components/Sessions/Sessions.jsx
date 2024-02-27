import React, { useEffect, useState } from "react";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import Loader from "../Loader/Loader";
import { getSessionsByID } from "../../features/sessionSlice";
import { getEvents } from "../../features/eventSlice";
import e from "cors";
const Sessions = () => {
  const dispatch = useDispatch();
  const sessions = useSelector((state) => state.session.sessions);
  const sessionsByEvent = useSelector((state) => state.session.sessionsEvent);
  const events = useSelector((state) => state.event.events);
  const status = useSelector((state) => state.session.sessionsStatus);



  const [page, setPage] = useState(0);

  const itemsPerPage = 6;

  useEffect(() => {
    dispatch(getSessionsByID(parseInt(events[0]?.eventID)));
    dispatch(getEvents());
     
   
  
  }, [dispatch]);

  const handleOnChangeEventName = (EventID) => {
    dispatch(getSessionsByID(EventID));
  };

  return (
    <div className="admin-events">
      <div
        className="modal fade"
        id="addSession"
        tabIndex="-1"
        aria-labelledby="addSessionLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addSessionLabel">
                add session
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="add-session-form">
                <div className="field session-title">
                  <label htmlFor="session-title">event title</label>
                  <input type="text" placeholder="session title ..." />
                </div>
                <div className="field session-image">
                  <label htmlFor="session-image">event image</label>
                  <input type="text" placeholder="session image ..." />
                </div>
                <div className="field session-description">
                  <label htmlFor="session-description">
                    session description
                  </label>
                  <input type="text" placeholder="session description ..." />
                </div>
                <div className="field session">
                  <label htmlFor="session">session date</label>
                  <input type="date" placeholder="session date ..." />
                </div>
                <div className="field event-id">
                  <label htmlFor="event">event</label>

                  <select name="eventID" id="eventID">
                    {events.map((event) => (
                      <option value={event.eventID}>{event.title}</option>
                    ))}
                  </select>
                </div>
                <div className="modal-footer" style={{ width: "100%" }}>
                  {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                  <button type="submit" className="btn btn-primary p-3">
                    add session
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="top">
        <div>
          <h1>Sessions</h1>
          <h5>Select Event to manage its Sessions</h5>
          <div className="field event-adresse">
            <select name="eventID" id="eventID"
             onChange={(e)=>handleOnChangeEventName(e.target.value)}
            >
              {events.map((event) => (
                <option key={event.eventID} value={event.eventID}>{event.title}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <button
            className="add-event-btn"
            data-bs-toggle="modal"
            data-bs-target="#addSession"
          >
            <AddCircleOutlineRoundedIcon /> Add new session
          </button>
        </div>
      </div>
      {status === "loading" ? (
        <div className="spinner" style={{ textAlign: "center" }}>
          <Loader />
        </div>
      ) : (
        <div className="bottom">
          <table className="events-table">
            <thead>
              <tr>
                {/* <th>id</th> */}
                <th>session title</th>
                <th>address</th>
                <th>image</th>
                <th>date</th>
                <th>Picture</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {typeof sessionsByEvent === "object" &&
                sessionsByEvent
                  ?.filter((item, index) => {
                    return (
                      (index >= page * itemsPerPage) &
                      (index < (page + 1) * itemsPerPage)
                    );
                  })
                  ?.map((session) => (
                    <tr key={session.sessionID}>
                      <td>{session.title}</td>
                      <td>{session.dateSession?.substring(0, 15)}...</td>
                      <td>{session.description}</td>
                      <td>{session.address}</td>
                      <td>
                        <img src={session.picture} width={50} alt=" " />
                      </td>

                      <td>
                        <button className="edit-btn">
                          <BorderColorRoundedIcon />
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => {
                            handleDelete(session?.id);
                          }}
                        >
                          <DeleteOutlineRoundedIcon />
                        </button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
          <ReactPaginate
            containerClassName={"pagination"}
            pageClassName={"page-item"}
            activeClassName={"active"}
            onPageChange={(event) => setPage(event.selected)}
            pageCount={Math.ceil(
              typeof sessions === "object" && sessions.length / itemsPerPage
            )}
            breakLabel="..."
            previousLabel={<KeyboardArrowLeftRoundedIcon />}
            nextLabel={<KeyboardArrowRightRoundedIcon />}
          />
        </div>
      )}
    </div>
  );
};

export default Sessions;
