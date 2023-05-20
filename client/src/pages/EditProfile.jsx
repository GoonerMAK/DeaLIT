import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import "./EditProfile.css"; // Import the CSS file

const EditProfile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [nid, setNid] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [updated, setUpdated] = useState(false);

  const handleUpdate = (e) => {
    e.preventDefault();
    setUpdated(true);
  };

  return (
    <>
      <Announcement />
      <Navbar />
      <div className="edit-profile-page">
        <Sidebar />
        <div className="edit-profile-container">
          <h1>Edit Profile</h1>
          <form onSubmit={handleUpdate}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>NID</label>
              <input
                type="text"
                value={nid}
                onChange={(e) => setNid(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Update</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EditProfile;
