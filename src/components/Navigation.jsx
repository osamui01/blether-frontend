import { Link, Outlet } from "react-router-dom";
const Navigation = () => {
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
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Navigation;
