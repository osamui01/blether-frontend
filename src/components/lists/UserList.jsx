import User from "../User";


const UserList = ({ users, deleteUser }) => {
  const userComponents = users.map((user) => {
    return <User key={user.id} user={user} deleteUser={deleteUser} />;
  });

  return (
    <>
    <div className="user-grid">
      <h3>List of Users</h3>
      {userComponents}
      </div>
    </>
  );
};

export default UserList;
