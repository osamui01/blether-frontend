import { Link, Outlet } from "react-router-dom";
import "../styles/lists/Navigation.css"

const Navigation = ( {setCurrentUserId} ) => {

const handleSignOut = (event) => {
  setCurrentUserId(null);
}

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/messages">Messages</Link>
          </li>

          <li>
            <Link to="/users">Users</Link>
          </li>

          <li>
            <Link to="/chatrooms">Chatrooms</Link>
          </li>

          <li>
          <Link to="/login" onClick={handleSignOut}>Sign Out</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Navigation;
