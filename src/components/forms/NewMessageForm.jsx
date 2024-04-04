import { useState } from "react";

const NewMessageForm = ({ postMessage, currentUserId, currentChatroomId }) => {
    const [text, setText] = useState("");
  
    const handleFormSubmit = (event) => {
      event.preventDefault();
  
      const newMessage = {
        content: text,
        userId: currentUserId,
        chatroomId: currentChatroomId
        };
  
      postMessage(newMessage);
      setText("");
    };
  
    return (
      <>
        <form onSubmit={handleFormSubmit}>
          <h4>Add a New Message</h4>
  
          <input
            type="text"
            placeholder="Type your message"
            value={text}
            onChange={(event) => setText(event.target.value)}
            required
          />
  
          <input type="submit" value="Send Message" />
        </form>
      </>
    );
  };
  
  export default NewMessageForm;