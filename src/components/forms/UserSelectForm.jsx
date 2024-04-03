import { useNavigate } from "react-router-dom";
import "../../styles/UserSelectForm.css";

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
    <h4 >Select a User</h4>
    <div className="select-user">
     <form onSubmit={handleLogin}>
            <select 
                id="user" 
                name="userId"
                defaultValue="select-user"
                onChange={handleChange}
                
            >
                <option disabled value="select-user">Choose a user</option>
                {userOptions}
            </select>

            <input type="submit" value="Log in"/>
      </form>
      </div>
            </>
  );

};

export default UserSelectForm;