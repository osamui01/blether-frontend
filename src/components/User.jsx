const User = ({ user, deleteUser }) => {
  const handleUserDelete = () => {
    deleteUser(user.id);
  };

  return (
    <>
      <p>User: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Date of Birth: {user.dateOfBirth}</p>
      <button onClick={handleUserDelete}>Delete</button>
      <hr />
    </>
  );
};

export default User;
