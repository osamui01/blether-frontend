import React, { useEffect, useState } from 'react';
import { useNavigate, useLoaderData, useParams } from 'react-router-dom';


const EditUserForm = ({updateUser}) => {
    const user = useLoaderData();
    const navigate = useNavigate();

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [dateOfBirth, setDateOfBirth] = useState(user.dateOfBirth);
    


    const handleFormSubmit = (event) => {
      event.preventDefault();
  
      const updatedUser = {
        id: user.id,
        name,
        email,
        dateOfBirth,
      };
      updateUser(updatedUser);
      setName("");
      setEmail("");
      setDateOfBirth("");
      navigate("/users");
    };


    return (
        <form onSubmit={handleFormSubmit}>
            <h4>Edit user: {user.name} </h4>

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

            <input type="submit" value="Edit User" />
        </form>
    );
}

export default EditUserForm;