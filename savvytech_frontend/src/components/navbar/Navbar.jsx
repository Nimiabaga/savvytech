import "./navbar.scss";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import logoImage from "../../assets/logo.jpg";  // Import your logo image

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);

  const renderUserAvatar = () => {
    return (
      <div className="avatar-container">
        <img
          src="https://th.bing.com/th?q=Person+Icon+Without+Background&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-WW&cc=UG&setlang=en&adlt=moderate&t=1&mw=247"
          alt="User Avatar"
          className="avatar"
        />
        <div className="dropdown">
          <ul>
            <li>Profile</li>
            <li>Settings</li>
            <li>Logout</li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="logo">
          {/* Replace the text logo with an image */}
          <img src={logoImage} alt="Logo" className="logoImage" />
        </div>
        <div className="nav-items">
          <a href="/" className="nav-link">Home</a>
          <a href="/courses" className="nav-link">Courses</a>
          <a href="/about" className="nav-link">About Us</a>
          <a href="/contact" className="nav-link">Contact</a>
        </div>
        <div className="search">
          <input type="text" placeholder="Search courses..." />
        </div>
        <div className="items">
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
          {renderUserAvatar()}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
