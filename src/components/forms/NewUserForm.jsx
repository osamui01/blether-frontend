import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/NewUserForm.css";

const NewUserForm = ({ postUser, setCurrentUserId }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const newUser = {
      name,
      email,
      dateOfBirth,
    };
    const savedUser = await postUser(newUser);
    setName("");
    setEmail("");
    setDateOfBirth("");
    setCurrentUserId(savedUser.id)
    navigate(`/chatrooms`);
  };

  return (
    <>
    <h4>Add New User</h4>
      <div className="new-user-form">
        <form onSubmit={handleFormSubmit}>
        
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

          <input type="submit" value="Sign Up" />
        </form>
      </div>
    </>
  );
};

export default NewUserForm;
