import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import PhoneIcon from '@material-ui/icons/Phone';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import "./Profile.css"; // Import the CSS file

const Profile = () => {
  return (
    <>
    <Announcement />
    <Navbar />
    <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileUserImg"
                src="https://www.freeiconspng.com/thumbs/profile-icon-png/am-a-19-year-old-multimedia-artist-student-from-manila--21.png"
              />
            </div>
            <div className="profileInfo">
                <div className="info">
                <PersonIcon className="icon"/>
                <label className="label">Name</label>
                <p className="text">John Doe</p>
                </div>
                <div className="info">
                <EmailIcon className="icon"/>
                <label className="label">Email</label>
                <p className="text">johndoe@gmail.com</p>
                </div>
                <div className="info">
                <PhoneIcon className="icon" />
                <label className="label">Phone</label>
                <p className="text">12345678</p>
                </div>
                <div className="info">
                <AssignmentIndIcon className="icon" />
                <label className="label">NID</label>
                <p className="text">12345678</p>
                </div>
        
            </div>
          </div>
          <div className="profileRightBottom">
          </div>
        </div>
      </div>
    <Footer />
    </>
  );
};

export default Profile;
