import { useState } from "react";

const UserSelectForm = ({ setCurrentUserId, users }) => {
  
  const handleChange = (event) => {
    setCurrentUserId(event.target.value)
  }

  const userOptions = users.map((user) => {
    return <option key={user.id} value={user.id}>{user.name}</option>
  });

  return (
    <>
      <label htmlFor="user">Select a user </label>
      <select
        id="user"
        name="userId"
        defaultValue="select-user"
        onChange={handleChange}
      >
        {userOptions}
      </select>
    </>
  );

};

export default UserSelectForm;