import React, { useEffect, useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';


const EditUserForm = ({users}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    
    const user = useLoaderData();


    const handleFormSubmit = (event) => {
      event.preventDefault();
  
      const newUser = {
        name,
        email,
        dateOfBirth,
      };
  
      setName("");
      setEmail("");
      setDateOfBirth("");
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