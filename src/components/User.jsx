

const User = ({ user, deleteUser }) => {
  

  return (
    <>
      <div className="user-items">
        <p> {user.name}</p>
        <p>Email: {user.email}</p>
        <p>D.O.B: {user.dateOfBirth}</p>
        <Link to={`/users/${user.id}/edit`}>Edit</Link>
        <button onClick={handleUserDelete}>Delete</button>
        <Outlet />
      </div>
    </>
  );
};

export default User;
