import { useState } from "react";

const UserSelectForm = ({setCurrentId, users}) => {

  const handleChange = (event) => {
    setCurrentUserId(event.target.value)
  }

  const userOptions = users.map((user) => { 
    return <option key={user.id} value={user.id}> {user.name} </option>
  })

  return (
    <>
     
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

            </>
  );
  
};

export default UserSelectForm;
