import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css"; // Import the CSS file
import EditIcon from '@material-ui/icons/Edit';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import StorageIcon from '@material-ui/icons/Storage';
import StoreIcon from '@material-ui/icons/Store'
import PersonIcon from '@material-ui/icons/Person';
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
        <li className="sidebarListItem">
            <Link to={"/profile"}><PersonIcon className="sidebarIcon" /></Link>
            <span className="sidebarListItemText">Profile</span>
        </li>
          <li className="sidebarListItem">
            <Link to={"/editprofile"}><EditIcon className="sidebarIcon" /></Link>
            <span className="sidebarListItemText">Edit Profile</span>
          </li>
          <li className="sidebarListItem">
            <StorageIcon className="sidebarIcon" />
            <span className="sidebarListItemText">My Products</span>
          </li>
          <li className="sidebarListItem">
            <LocalMallIcon className="sidebarIcon" />
            <span className="sidebarListItemText">My Orders</span>
          </li>
          <li className="sidebarListItem">
            <StoreIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Pending Request</span>
          </li>
          </ul>
      </div>
    </div>
  );
};

export default Sidebar;
