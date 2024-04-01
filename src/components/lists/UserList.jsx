import User from "../User";

const UserList = ({ users, deleteUser }) => {
  const userComponents = users.map((user) => {
    return <User key={user.id} user={user} deleteUser={deleteUser} />;
  });

  return (
    <>
      <h3>List of Users</h3>
      {userComponents}
    </>
  );
};

export default UserList;
