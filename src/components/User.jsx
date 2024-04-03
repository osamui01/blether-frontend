

const User = ({ user, deleteUser }) => {
  

  return (
    <>
      <p>User: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>D.O.B: {user.dateOfBirth}</p>
      
      <hr />
    </>
  );
};

export default User;
