import { useState } from "react";

const NewUserForm = ({ postUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      name,
      email,
      dateOfBirth,
    };

    postUser(newUser);
    setName("");
    setEmail("");
    setDateOfBirth("");
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <h4>Add New User</h4>

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

        <input type="submit" value="Add User" />
      </form>
    </>
  );
};

export default NewUserForm;
