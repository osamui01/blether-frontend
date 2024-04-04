import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const EditUserForm = ({ getCurrentUser,updateUser, deleteUser}) => {
    const user = getCurrentUser();
    const navigate = useNavigate();

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [dateOfBirth, setDateOfBirth] = useState(user.dateOfBirth);
    
    const handleUserDelete = () => {
        deleteUser(user.id);
        navigate("/login");
      };


    const handleFormSubmit = (event) => {
      event.preventDefault();
  
      const updatedUser = {
        id: user.id,
        name,
        email,
        dateOfBirth,
      };
      updateUser(updatedUser);
    
    };


    return (
    <>
        <h4>Edit user: </h4>
            <div>
                <form onSubmit={handleFormSubmit}>

                    <h5>Current Username: {user.name}</h5>
                    <h5>Current Email: {user.email}</h5>
                    <h5>Current DateOfBirth: {user.dateOfBirth}</h5>
                    
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        required
                    />

                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />

                    <input
                        type="date"
                        placeholder="Date of Birth"
                        value={dateOfBirth}
                        onChange={(event) => setDateOfBirth(event.target.value)}
                        required
                    // Must be in "1980-03-06" format - add to form validation
                    />
                    
                    <button onClick={handleUserDelete}>Delete</button>
                    <input type="submit" value="Edit User" />
                </form>
            </div>
    </>
    );
}

export default EditUserForm;