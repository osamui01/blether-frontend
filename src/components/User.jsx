

const User = ({ user, deleteUser }) => {
  

  return (
    <>
      <div className="user-items">
        <p> {user.name}</p>
        <p>Email: {user.email}</p>
        <p>D.O.B: {user.dateOfBirth}</p>

      </div>
    </>
  );
};

export default User;
