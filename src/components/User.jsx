const User = ({ user, deleteUser }) => {
  const handleUserDelete = () => {
    deleteUser(user.id);
  };

  return (
    <>
      <p>User: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>D.O.B: {user.dateOfBirth}</p>
      <button onClick={handleUserDelete}>Delete</button>
      <hr />
    </>
  );
};

export default User;
