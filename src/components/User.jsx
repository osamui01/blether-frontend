import { Link, Outlet } from "react-router-dom";

const User = ({ user, deleteUser }) => {
  const handleUserDelete = () => {
    deleteUser(user.id);
  };

  return (
    <>
      <p>User: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>D.O.B: {user.dateOfBirth}</p>
      <Link to={`/users/${user.id}/edit`}>Edit</Link>
      <button onClick={handleUserDelete}>Delete</button>
      <Outlet />
      <hr />
    </>
  );
};

export default User;
