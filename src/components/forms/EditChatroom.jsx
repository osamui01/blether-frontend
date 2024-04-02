import React, { useState } from 'react';
import { useNavigate, useLoaderData} from 'react-router-dom';


const EditChatroomForm = ({updateChatroom}) => {
    const chatroom = useLoaderData();
    const navigate = useNavigate();

    const [chatroomName, setChatroomName] = useState(chatroom.name);
    const [capacity, setCapacity] = useState(chatroom.capacity);
    const [ageLimit, setAgeLimit] = useState(chatroom.ageLimit);
    


    const handleFormSubmit = (event) => {
      event.preventDefault();
  
      const updatedChatroom = {
        id: chatroom.id,
        chatroomName,
        capacity,
        ageLimit,

      };
      updateChatroom(updatedChatroom);
      setChatroomName("");
      setCapacity("");
      setAgeLimit("");
      navigate("/chatrooms");
    };


    return (
        <form onSubmit={handleFormSubmit}>
            <h4>Edit Chatrooms: {chatroom.name} </h4>

            <input
                type="text"
                placeholder="Name"
                value={chatroom}
                onChange={(event) => setChatroomName(event.target.value)}
                required
            />

            <input
                type="text"
                placeholder="Capacity"
                value={capacity}
                onChange={(event) => setCapacity(event.target.value)}
                required
            />

            <input
                type="text"
                placeholder="Age Limit"
                value={ageLimit}
                onChange={(event) => setAgeLimit(event.target.value)}
                required
           
            />

            <input type="submit" value="Edit Chatrooms" />
        </form>
    );
}

export default EditChatroomForm;