import { useState } from "react";
import "../../styles/NewMessageForm.css";

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
      <h3>Add a New Message</h3>
      <div className="new-message">
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Type your message..."
            value={text}
            onChange={(event) => setText(event.target.value)}
            required
          />
  
          <input type="submit" value="Send Message" />
        </form>
        </div>
      </>
    );
  };
  
  export default NewMessageForm;