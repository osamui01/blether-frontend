import { useNavigate } from "react-router-dom";

const UserSelectForm = ({setCurrentUserId, users}) => {

  const navigate = useNavigate();

  const handleChange = (event) => {
    setCurrentUserId(event.target.value)
  }

  const userOptions = users.map((user) => { 
    return <option key={user.id} value={user.id}> {user.name} </option>
  })
 
  const handleLogin = (event) => {
    event.preventDefault();
    navigate(`/chatrooms`);

  }

  return (
    <>
     <form onSubmit={handleLogin}>
        <label htmlFor="user">Select a user </label>
            <select 
                id="user" 
                name="userId"
                defaultValue="select-user"
                onChange={handleChange}
            >
                <option disabled value="select-user">Choose a user</option>
                {userOptions}
            </select>

            <input type="submit" value="log-in"/>
      </form>
            </>
  );

};

export default UserSelectForm;