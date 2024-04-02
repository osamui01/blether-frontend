import { useState } from "react";

const NewChatroomForm = ({ postChatroom }) => {
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [ageLimit, setAgeLimit] = useState(0);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const newChatroom = {
      name,
      capacity,
      ageLimit,
    };

    postChatroom(newChatroom);
    setName();
    setCapacity();
    setAgeLimit();
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <h4>Create a Chatroom</h4>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Capacity"
          value={capacity}
          onChange={(event) => setCapacity(event.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Age limit"
          value={ageLimit}
          onChange={(event) => setAgeLimit(event.target.value)}
          required
        />

        <input type="submit" value="Create Chatroom" />
      </form>
    </>
  );
};

export default NewChatroomForm;
