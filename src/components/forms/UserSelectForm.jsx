const UserSelectForm = () => {
  return (
    <>

  <label htmlFor="user">Select a user </label>
            <select 
                id="user" 
                name="userId"
                defaultValue="select-user"
                //onChange={handleChange}
            >
                <option disabled value="select-user">Choose a user</option>
            </select>


            </>
  );
  
};

export default UserSelectForm;
