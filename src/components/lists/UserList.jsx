import User from "../User";
import "../../styles/lists/UserList.css";

const UserList = ({ users, deleteUser }) => {
  const userComponents = users.map((user) => {
    return (
      <User 
        className="user"
        key={user.id} 
        user={user} 
        deleteUser={deleteUser} />
    );
  });

  return (
    <>
    <h3>List of Users</h3>
    <div className="user-grid">
      {userComponents}
      </div>
    </>
  );
};

export default UserList;
